import {
  countOffset,
  defaultDensityFactor,
  defaultRemoveQuantity,
  deleteCount,
  double,
  minCount,
  minIndex,
  minLimit,
  one,
  spatialHashGridCellSize,
  squareExp,
} from "../Utils/Constants.js";
import type { Container } from "../Container/Container.js";
import { EventType } from "../../Enums/Types/EventType.js";
import type { IContainerPlugin } from "../Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import type { IParticlesDensity } from "../../Options/Interfaces/Particles/Number/IParticlesDensity.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import { LimitMode } from "../../Enums/Modes/LimitMode.js";
import { Particle } from "./Particle.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "../Engine/PluginManager.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { SpatialHashGrid } from "./SpatialHashGrid.js";
import { loadParticlesOptions } from "../../Utils/ParticlesOptionsLoader.js";
import { toEnumValue } from "../../Utils/TypeUtils.js";

/**
 * Normalizes iteration counts without changing positive fractional-count behavior.
 * @param value - the requested particle quantity
 * @returns a finite, safe count or zero for invalid quantities
 */
function getParticleCount(value: number): number {
  const count = Number.isFinite(value) ? Math.ceil(value) : minCount;

  return Number.isSafeInteger(count) && count > minCount ? count : minCount;
}

/**
 * Particles manager object
 */
export class ParticlesManager {
  /** Check particle position plugins */
  checkParticlePositionPlugins: IContainerPlugin[];

  /**
   * All the particles used in canvas
   */
  #array: Particle[];
  readonly #container: Container;
  #drawDepth = 0;
  readonly #drawSnapshots: {
    ids: number[];
    particles: (Particle | undefined)[];
  }[] = [];

  /** The spatial hash grid */
  #grid;
  readonly #groupLimits: Map<string, { limit: number; mode: LimitMode }>;
  /** Active phase cursors, adjusted when preceding entries leave the collection. */
  readonly #iterationIndexes: number[] = [];
  #limit;
  #nextId;
  readonly #particleBuckets: Map<number, number>;
  #particleResetPlugins: IContainerPlugin[];
  #particleUpdatePlugins: IContainerPlugin[];
  readonly #pluginManager;
  readonly #pool: Particle[];
  #postParticleUpdatePlugins: IContainerPlugin[];
  #postUpdatePlugins: IContainerPlugin[];
  /** Keep the queued identity even when the same object is recycled by a callback. */
  readonly #removals = new Map<number, Particle>();
  #removalVersion = 0;
  #resizeFactor?: IDimension;
  #updatePlugins: IContainerPlugin[];
  #updating = false;
  #zBuckets: Particle[][];

  /**
   *
   * @param pluginManager - The plugin manager
   * @param container - The container to handle
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#nextId = 0;
    this.#array = [];
    this.#pool = [];
    this.#limit = 0;
    this.#groupLimits = new Map<string, { limit: number; mode: LimitMode }>();
    this.#particleBuckets = new Map<number, number>();
    this.#zBuckets = this.#createBuckets(this.#container.zLayers);
    this.#grid = new SpatialHashGrid(spatialHashGridCellSize);
    this.checkParticlePositionPlugins = [];
    this.#particleResetPlugins = [];
    this.#particleUpdatePlugins = [];
    this.#postUpdatePlugins = [];
    this.#postParticleUpdatePlugins = [];
    this.#updatePlugins = [];
  }

  /**
   * Gets the number of particles
   * @returns the count of particles
   */
  get count(): number {
    return this.#array.length;
  }

  get grid(): SpatialHashGrid {
    return this.#grid;
  }

  /**
   * Adds a particle to the manager
   * @param position - The position
   * @param overrideOptions - The overrideOptions
   * @param group - The group
   * @param initializer - The initializer
   * @returns the particle added
   */
  addParticle(
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
    initializer?: (particle: Particle) => boolean,
  ): Particle | undefined {
    if (this.#checkAndApplyLimits(group, this.count)) {
      return;
    }

    // Initialization and initializer hooks can add particles before this one commits.
    const id = this.#nextId++;

    let added = false;

    try {
      const particle = this.#pool.pop() ?? new Particle(this.#pluginManager, this.#container);

      try {
        particle.init(id, position, overrideOptions, group);
      } catch (error: unknown) {
        this.#destroyAndPoolAfterError(particle, error);
      }

      let canAdd = true;

      if (initializer) {
        try {
          canAdd = initializer(particle);
        } catch (error: unknown) {
          this.#destroyAndPoolAfterError(particle, error);
        }
      }

      if (!canAdd || this.#checkAndApplyLimits(particle.group, this.count)) {
        this.#destroyAndPool(particle);

        return;
      }

      this.#array.push(particle);
      added = true;
      this.#insertParticleIntoBucket(particle);

      try {
        this.#container.dispatchEvent(EventType.particleAdded, {
          particle,
        });
      } catch (error: unknown) {
        this.#container.engine.getLogger().warning(`error dispatching particleAdded: ${error as string}`);
      }

      return particle;
    } catch (e: unknown) {
      this.#container.engine.getLogger().warning(`error adding particle: ${e as string}`);
    } finally {
      if (!added && this.#nextId === id + one) {
        this.#nextId = id;
      }
    }

    return undefined;
  }

  /** Destroys and pools all active particles without dispatching particleRemoved. */
  clear(): void {
    const particles = this.#array;

    this.#array = [];
    this.#removalVersion++;
    this.#particleBuckets.clear();
    this.#resetBuckets(this.#container.zLayers);
    this.#grid.clear(true);

    let cleanupError: unknown,
      hasCleanupError = false;

    for (const particle of particles) {
      try {
        this.#destroyAndPool(particle);
      } catch (error: unknown) {
        if (!hasCleanupError) {
          cleanupError = error;
          hasCleanupError = true;
        }
      }
    }

    if (hasCleanupError) {
      this.#container.engine.getLogger().warning(`error clearing particles: ${cleanupError as string}`);
    }
  }

  /** Destroys the particles manager */
  destroy(): void {
    this.clear();
    this.#pool.length = 0;
    this.#particleBuckets.clear();
    this.#zBuckets = [];
    this.#drawSnapshots.length = 0;
    this.checkParticlePositionPlugins = [];
    this.#particleResetPlugins = [];
    this.#particleUpdatePlugins = [];
    this.#postUpdatePlugins = [];
    this.#postParticleUpdatePlugins = [];
    this.#updatePlugins = [];
  }

  /**
   * Draws all particles
   * @param delta - The delta time
   */
  drawParticles(delta: IDelta): void {
    const depth = this.#drawDepth++,
      snapshot = this.#drawSnapshots[depth] ?? { ids: [], particles: [] },
      particles = this.#array,
      removalVersion = this.#removalVersion;
    let count = minCount;

    this.#drawSnapshots[depth] = snapshot;

    try {
      // Freeze membership and order, not particle state, before calling drawers.
      for (let i = this.#zBuckets.length - one; i >= minIndex; i--) {
        const bucket = this.#zBuckets[i];

        if (!bucket) {
          continue;
        }

        for (const particle of bucket) {
          snapshot.particles[count] = particle;
          snapshot.ids[count++] = particle.id;
        }
      }

      for (let i = minIndex; i < count && particles === this.#array; i++) {
        const particle = snapshot.particles[i];

        if (
          particle &&
          (this.#removalVersion === removalVersion ||
            (particle.id === snapshot.ids[i] && this.#particleBuckets.has(particle.id)))
        ) {
          particle.draw(delta);
        }
      }
    } finally {
      // Keep capacity for the next frame without retaining particle references.
      snapshot.particles.fill(undefined, minIndex, count);
      this.#drawDepth = depth;
    }
  }

  /**
   * Filters particles with a condition
   * @param condition - The condition
   * @returns the array of the particles filtered
   */
  filter(condition: (particle: Particle) => boolean): Particle[] {
    return this.#array.filter(condition);
  }

  /**
   * Finds a particle with a condition
   * @param condition - The condition
   * @returns the particle found
   */
  find(condition: (particle: Particle) => boolean): Particle | undefined {
    return this.#array.find(condition);
  }

  /**
   * Gets a particle by index
   * @param index - The index
   * @returns the particle at the index
   */
  get(index: number): Particle | undefined {
    return this.#array[index];
  }

  /**
   * Initializes the particles manager
   * @returns the promise for the init
   */
  async init(): Promise<void> {
    const container = this.#container;

    this.checkParticlePositionPlugins = [];
    this.#updatePlugins = [];
    this.#particleUpdatePlugins = [];
    this.#postUpdatePlugins = [];
    this.#particleResetPlugins = [];
    this.#postParticleUpdatePlugins = [];
    this.#particleBuckets.clear();
    this.#resetBuckets(container.zLayers);

    this.#grid = new SpatialHashGrid(spatialHashGridCellSize * container.retina.pixelRatio);

    this.#applyLimits(container.actualOptions.particles);

    const particlesOptions = container.actualOptions.particles,
      groups = particlesOptions.groups;

    for (const group in groups) {
      const groupData = groups[group];

      if (groupData) {
        this.#applyLimits(loadParticlesOptions(this.#pluginManager, this.#container, groupData), group, groupData);
      }
    }

    await this.#initPlugins();
  }

  /**
   * Adds particles to the manager
   * @param nb - The nb
   * @param position - The position
   * @param overrideOptions - The overrideOptions
   * @param group - The group
   */
  push(
    nb: number,
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
  ): void {
    const quantity = getParticleCount(nb);

    for (let i = 0; i < quantity; i++) {
      this.addParticle(position, overrideOptions, group);
    }
  }

  /** Redraws all particles */
  async redraw(): Promise<void> {
    this.clear();
    await this.init();

    this.#container.canvas.render.drawParticles({ value: 0, factor: 0 });
  }

  /**
   * Removes a particle
   * @param particle - The particle to process
   * @param group - The group
   * @param override - The override
   */
  remove(particle: Particle, group?: string, override?: boolean): void {
    this.removeAt(this.#array.indexOf(particle), undefined, group, override);
  }

  /**
   * Removes particles at a specific index
   * @param index - The index
   * @param quantity - The quantity
   * @param group - The group
   * @param override - The override
   * @param matchGroup - Whether to filter the removal by the group (defaults to true)
   */
  removeAt(
    index: number,
    quantity = defaultRemoveQuantity,
    group?: string,
    override?: boolean,
    matchGroup = true,
  ): void {
    if (!Number.isSafeInteger(index) || index < minIndex || index > this.count) {
      return;
    }

    const quantityToRemove = Math.min(Math.ceil(quantity), this.count),
      particles = this.#array,
      depth = this.#iterationIndexes.length;

    let deleted = 0;

    this.#iterationIndexes.push(index);

    try {
      for (
        let i = index;
        deleted < quantityToRemove && i < particles.length && particles === this.#array;
        i = (this.#iterationIndexes[depth] ?? i) + one
      ) {
        this.#iterationIndexes[depth] = i;

        if (this.#removeParticle(i, group, override, matchGroup)) {
          deleted++;
        }
      }
    } finally {
      this.#iterationIndexes.pop();
    }
  }

  /**
   * Removes a quantity of particles
   * @param quantity - The quantity
   * @param group - The group
   */
  removeQuantity(quantity: number, group?: string): void {
    this.removeAt(minIndex, quantity, group);
  }

  /** Sets the particle density */
  setDensity(): void {
    const options = this.#container.actualOptions,
      groups = options.particles.groups;

    let pluginsCount = 0;

    for (const plugin of this.#container.plugins) {
      if (plugin.particlesDensityCount) {
        pluginsCount += plugin.particlesDensityCount();
      }
    }

    for (const group in groups) {
      const groupData = groups[group];

      if (!groupData) {
        continue;
      }

      const groupDataOptions = loadParticlesOptions(this.#pluginManager, this.#container, groupData);

      this.#applyDensity(groupDataOptions, pluginsCount, group);
    }

    this.#applyDensity(options.particles, pluginsCount);
  }

  /**
   * Sets the resize factor
   * @param factor - The factor
   */
  setResizeFactor(factor: IDimension): void {
    this.#resizeFactor = factor;
  }

  /**
   * Updates all particles
   * @param delta - The delta time
   */
  update(delta: IDelta): void {
    const wasUpdating = this.#updating,
      particlesToDelete = wasUpdating ? new Map<number, Particle>() : this.#removals;

    this.#updating = true;

    try {
      this.#grid.clear();

      for (const plugin of this.#updatePlugins) {
        plugin.update?.(delta);
      }

      this.#updateParticlesPhase1(delta, particlesToDelete);

      for (const plugin of this.#postUpdatePlugins) {
        plugin.postUpdate?.(delta);
      }

      this.#updateParticlesPhase2(delta, particlesToDelete);

      if (particlesToDelete.size) {
        for (const [id, particle] of particlesToDelete) {
          if (particle.id === id) {
            this.remove(particle, particle.group);
          }
        }
      }

      this.#resizeFactor = undefined;
    } finally {
      if (particlesToDelete.size) {
        particlesToDelete.clear();
      }
      this.#updating = wasUpdating;
    }
  }

  #addToPool(...particles: Particle[]): void {
    this.#pool.push(...particles);
  }

  #applyDensity(
    options: ParticlesOptions,
    pluginsCount: number,
    group?: string,
    groupOptions?: ParticlesOptions,
  ): void {
    const numberOptions = options.number;

    if (!numberOptions.density.enable) {
      this.#applyLimits(options, group, groupOptions);

      return;
    }

    const densityFactor = this.#initDensityFactor(numberOptions.density),
      optParticlesNumber =
        Number.isFinite(numberOptions.value) && numberOptions.value > minCount ? numberOptions.value : minCount,
      optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
      particlesNumber = Math.round(Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + pluginsCount),
      particlesCount = this.#countGroup(group);

    if (group === undefined) {
      this.#limit = numberOptions.limit.value * densityFactor;
    } else {
      this.#groupLimits.set(group, {
        limit: numberOptions.limit.value * densityFactor,
        mode: toEnumValue(LimitMode, numberOptions.limit.mode, LimitMode.delete),
      });
    }

    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  }

  /**
   * Records the particle limits (unscaled) for the given options, so additions
   * are bounded even on the initial load before the density is applied.
   * @param options - The options to apply
   * @param group - The group
   * @param groupOptions - The raw group options
   */
  #applyLimits(options: ParticlesOptions, group?: string, groupOptions?: RecursivePartial<IParticlesOptions>): void {
    if (group === undefined) {
      this.#limit = options.number.limit.value;

      const groups = this.#container.actualOptions.particles.groups;

      for (const existingGroup of this.#groupLimits.keys()) {
        if (!(existingGroup in groups)) {
          this.#groupLimits.delete(existingGroup);
        }
      }
    } else {
      const limitValue = groupOptions?.number?.limit?.value ?? options.number.limit.value;

      if (limitValue > minLimit) {
        this.#groupLimits.set(group, {
          limit: limitValue,
          mode: toEnumValue(
            LimitMode,
            groupOptions?.number?.limit?.mode ?? options.number.limit.mode,
            LimitMode.delete,
          ),
        });
      } else {
        this.#groupLimits.delete(group);
      }
    }
  }

  /**
   * Applies the global and the group-specific particle limits before an addition.
   * Each wait limit short-circuits (the addition is rejected) before any removal
   * runs, then each applicable delete limit trims its own scope. Group limits keep
   * their own mode instead of inheriting the global mode.
   * @param group - The group the particle is added to
   * @param currentCount - The current total particle count
   * @returns true when the addition must be rejected
   */
  #checkAndApplyLimits(group: string | undefined, currentCount: number): boolean {
    const globalLimit = this.#limit,
      globalMode = this.#container.actualOptions.particles.number.limit.mode;

    let removed = false;

    if (globalLimit > minLimit && globalMode === LimitMode.wait && currentCount >= globalLimit) {
      return true;
    }

    const groupLimitEntry = group === undefined ? undefined : this.#groupLimits.get(group);

    if (groupLimitEntry && groupLimitEntry.limit > minLimit && groupLimitEntry.mode === LimitMode.wait) {
      const groupCount = this.#countGroup(group);

      if (groupCount >= groupLimitEntry.limit) {
        return true;
      }
    }

    if (groupLimitEntry && groupLimitEntry.limit > minLimit && groupLimitEntry.mode === LimitMode.delete) {
      const groupCountToRemove = this.#countGroup(group) + countOffset - groupLimitEntry.limit;

      if (groupCountToRemove > minCount) {
        this.removeQuantity(groupCountToRemove, group);
        removed = true;
      }
    }

    if (globalLimit > minLimit && globalMode === LimitMode.delete) {
      const globalCountToRemove = this.count + countOffset - globalLimit;

      if (globalCountToRemove > minCount) {
        this.#removeAny(globalCountToRemove);
        removed = true;
      }
    }

    // Removal listeners can fill a released slot; do not evict indefinitely.
    return (
      removed &&
      ((globalLimit > minLimit && this.count >= globalLimit) ||
        (groupLimitEntry !== undefined &&
          groupLimitEntry.limit > minLimit &&
          this.#countGroup(group) >= groupLimitEntry.limit))
    );
  }

  #countGroup(group: string | undefined): number {
    let count = 0;

    for (const particle of this.#array) {
      if (particle.group === group) {
        count++;
      }
    }

    return count;
  }

  #createBuckets(zLayers: number): Particle[][] {
    const bucketCount = Math.max(Math.floor(zLayers), one);

    return Array.from({ length: bucketCount }, () => []);
  }

  #destroyAndPool(particle: Particle): void {
    // Initialization rejection or clear can follow an already completed destroy.
    particle.unbreakable = false;

    try {
      particle.destroy();
    } finally {
      this.#pool.push(particle);
    }
  }

  #destroyAndPoolAfterError(particle: Particle, error: unknown): never {
    try {
      this.#destroyAndPool(particle);
    } catch (cleanupError: unknown) {
      this.#container.engine.getLogger().warning(`error cleaning up failed particle: ${cleanupError as string}`);
    }

    throw error;
  }

  #getBucketIndex(zIndex: number): number {
    const maxBucketIndex = this.#zBuckets.length - one;

    if (maxBucketIndex <= minIndex) {
      return minIndex;
    }

    return Math.min(Math.max(Math.floor(zIndex), minIndex), maxBucketIndex);
  }

  #initDensityFactor(densityOptions: IParticlesDensity): number {
    const container = this.#container;

    if (!densityOptions.enable) {
      return defaultDensityFactor;
    }

    // Read from canvas.size (retina-corrected dimensions) so this works with both
    // HTMLCanvasElement and OffscreenCanvas render targets without relying on
    // canvas.domElement (which may be neutered / absent in future Worker paths).
    const canvasSize = container.canvas.size,
      pxRatio = container.retina.pixelRatio;

    if (
      !Number.isFinite(canvasSize.width) ||
      !Number.isFinite(canvasSize.height) ||
      canvasSize.width <= 0 ||
      canvasSize.height <= 0 ||
      !Number.isFinite(densityOptions.width) ||
      !Number.isFinite(densityOptions.height) ||
      densityOptions.width <= 0 ||
      densityOptions.height <= 0 ||
      !Number.isFinite(pxRatio) ||
      pxRatio <= 0
    ) {
      return defaultDensityFactor;
    }

    const densityFactor =
      (canvasSize.width * canvasSize.height) / (densityOptions.height * densityOptions.width * pxRatio ** squareExp);

    return Number.isFinite(densityFactor) && densityFactor >= 0 ? densityFactor : defaultDensityFactor;
  }

  async #initDrawersAndUpdaters(): Promise<void> {
    const container = this.#container;

    await container.initDrawersAndUpdaters();
    container.canvas.render.initUpdaters();

    for (const drawer of container.effectDrawers.values()) {
      await drawer.init?.(container);
    }

    for (const drawer of container.shapeDrawers.values()) {
      await drawer.init?.(container);
    }
  }

  async #initPlugins(): Promise<void> {
    await this.#initPluginsArrays();
    await this.#initDrawersAndUpdaters();

    let handled = false;

    const container = this.#container;

    for (const plugin of container.plugins) {
      handled = plugin.particlesInitialization?.() ?? handled;

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    const particlesOptions = container.actualOptions.particles,
      particlesNumber = getParticleCount(particlesOptions.number.value),
      groups = particlesOptions.groups;

    for (const group in groups) {
      const groupOptions = groups[group];

      if (!groupOptions) {
        continue;
      }

      const groupCount = getParticleCount(groupOptions.number.value);

      for (let i = this.count, j = 0; j < groupCount && i < particlesNumber; i++, j++) {
        this.addParticle(undefined, groupOptions, group);
      }
    }

    for (let i = this.count; i < particlesNumber; i++) {
      this.addParticle();
    }
  }

  async #initPluginsArrays(): Promise<void> {
    const container = this.#container;

    for (const plugin of container.plugins) {
      if (plugin.redrawInit) {
        await plugin.redrawInit();
      }

      if (plugin.checkParticlePosition) {
        this.checkParticlePositionPlugins.push(plugin);
      }

      if (plugin.update) {
        this.#updatePlugins.push(plugin);
      }

      if (plugin.particleUpdate) {
        this.#particleUpdatePlugins.push(plugin);
      }

      if (plugin.postUpdate) {
        this.#postUpdatePlugins.push(plugin);
      }

      if (plugin.particleReset) {
        this.#particleResetPlugins.push(plugin);
      }

      if (plugin.postParticleUpdate) {
        this.#postParticleUpdatePlugins.push(plugin);
      }
    }
  }

  #insertById(bucket: Particle[], particle: Particle): void {
    const last = bucket[bucket.length - one];

    if (last && particle.id < last.id) {
      let low = minIndex,
        high = bucket.length;

      while (low < high) {
        const middle = Math.floor((low + high) / double),
          current = bucket[middle];

        if (current && current.id <= particle.id) {
          low = middle + one;
        } else {
          high = middle;
        }
      }

      bucket.splice(low, minCount, particle);
    } else {
      bucket.push(particle);
    }
  }

  #insertParticleIntoBucket(particle: Particle): void {
    const bucketIndex = this.#getBucketIndex(particle.position.z),
      bucket = this.#zBuckets[bucketIndex];

    if (!bucket) {
      return;
    }

    this.#insertById(bucket, particle);

    this.#particleBuckets.set(particle.id, bucketIndex);
  }

  #isParticleActive(particle: Particle, id: number, removalVersion: number): boolean {
    return this.#removalVersion === removalVersion || (particle.id === id && this.#array.includes(particle));
  }

  /**
   * Removes a quantity of particles regardless of their group, starting from the oldest
   * @param quantity - The quantity
   */
  #removeAny(quantity: number): void {
    this.removeAt(minIndex, quantity, undefined, undefined, false);
  }

  #removeParticle(index: number, group?: string, override?: boolean, matchGroup = true): boolean {
    const particle = this.#array[index];

    if (!particle) {
      return false;
    }

    if (matchGroup && particle.group !== group) {
      return false;
    }

    this.#array.splice(index, deleteCount);
    this.#removalVersion++;

    for (let depth = minIndex; depth < this.#iterationIndexes.length; depth++) {
      const currentIndex = this.#iterationIndexes[depth];

      if (currentIndex !== undefined && index <= currentIndex) {
        this.#iterationIndexes[depth] = currentIndex - one;
      }
    }

    this.#removeParticleFromBucket(particle);
    this.#grid.remove(particle);

    let removalError: unknown,
      hasRemovalError = false;

    // Explicit collection removal must dispose collision-immune particles too.
    particle.unbreakable = false;

    try {
      particle.destroy(override);
    } catch (error: unknown) {
      removalError = error;
      hasRemovalError = true;
    }

    try {
      this.#container.dispatchEvent(EventType.particleRemoved, {
        particle,
      });
    } catch (error: unknown) {
      if (!hasRemovalError) {
        removalError = error;
        hasRemovalError = true;
      }
    }

    this.#addToPool(particle);

    if (hasRemovalError) {
      throw removalError;
    }

    return true;
  }

  #removeParticleFromBucket(particle: Particle): void {
    const bucketIndex = this.#particleBuckets.get(particle.id) ?? this.#getBucketIndex(particle.position.z),
      bucket = this.#zBuckets[bucketIndex];

    if (!bucket) {
      this.#particleBuckets.delete(particle.id);

      return;
    }

    const idx = bucket.findIndex(p => p.id === particle.id);

    if (idx >= minIndex) {
      bucket.splice(idx, deleteCount);
    }

    this.#particleBuckets.delete(particle.id);
  }

  #resetBuckets(zLayers: number): void {
    const bucketCount = Math.max(Math.floor(zLayers), one);

    if (this.#zBuckets.length !== bucketCount) {
      this.#zBuckets = this.#createBuckets(bucketCount);

      return;
    }

    for (const bucket of this.#zBuckets) {
      bucket.length = minIndex;
    }
  }

  #updateParticleBucket(particle: Particle): void {
    const newBucketIndex = this.#getBucketIndex(particle.position.z),
      currentBucketIndex = this.#particleBuckets.get(particle.id);

    if (currentBucketIndex === undefined) {
      this.#insertParticleIntoBucket(particle);

      return;
    }

    if (currentBucketIndex === newBucketIndex) {
      return;
    }

    const currentBucket = this.#zBuckets[currentBucketIndex];

    if (currentBucket) {
      const idx = currentBucket.findIndex(p => p.id === particle.id);

      if (idx >= minIndex) {
        currentBucket.splice(idx, deleteCount);
      }
    }

    const newBucket = this.#zBuckets[newBucketIndex];

    if (!newBucket) {
      this.#particleBuckets.set(particle.id, newBucketIndex);

      return;
    }

    this.#insertById(newBucket, particle);

    this.#particleBuckets.set(particle.id, newBucketIndex);
  }

  #updateParticlesPhase1(delta: IDelta, particlesToDelete: Map<number, Particle>): void {
    const resizeFactor = this.#resizeFactor,
      particles = this.#array,
      depth = this.#iterationIndexes.length;

    this.#iterationIndexes.push(minIndex);

    try {
      for (
        let index = minIndex;
        index < particles.length && particles === this.#array;
        index = (this.#iterationIndexes[depth] ?? index) + one
      ) {
        this.#iterationIndexes[depth] = index;

        const particle = particles[index];

        if (!particle) {
          continue;
        }

        const id = particle.id,
          removalVersion = this.#removalVersion;

        if (resizeFactor && !particle.ignoresResizeRatio) {
          particle.position.x *= resizeFactor.width;
          particle.position.y *= resizeFactor.height;
          particle.initialPosition.x *= resizeFactor.width;
          particle.initialPosition.y *= resizeFactor.height;
        }

        particle.ignoresResizeRatio = false;

        for (const plugin of this.#particleResetPlugins) {
          if (!this.#isParticleActive(particle, id, removalVersion)) {
            break;
          }

          plugin.particleReset?.(particle);
        }

        if (!this.#isParticleActive(particle, id, removalVersion)) {
          continue;
        }

        for (const plugin of this.#particleUpdatePlugins) {
          if (particle.destroyed || !this.#isParticleActive(particle, id, removalVersion)) {
            break;
          }

          plugin.particleUpdate?.(particle, delta);
        }

        if (!this.#isParticleActive(particle, id, removalVersion)) {
          continue;
        }

        if (particle.destroyed) {
          particlesToDelete.set(id, particle);

          continue;
        }

        this.#grid.insert(particle);
      }
    } finally {
      this.#iterationIndexes.pop();
    }
  }

  #updateParticlesPhase2(delta: IDelta, particlesToDelete: Map<number, Particle>): void {
    const particles = this.#array,
      depth = this.#iterationIndexes.length;

    this.#iterationIndexes.push(minIndex);

    try {
      for (
        let index = minIndex;
        index < particles.length && particles === this.#array;
        index = (this.#iterationIndexes[depth] ?? index) + one
      ) {
        this.#iterationIndexes[depth] = index;

        const particle = particles[index];

        if (!particle) {
          continue;
        }

        const id = particle.id,
          removalVersion = this.#removalVersion;

        if (particle.destroyed) {
          particlesToDelete.set(id, particle);

          continue;
        }

        for (const updater of this.#container.particleUpdaters) {
          if (!this.#isParticleActive(particle, id, removalVersion)) {
            break;
          }

          updater.update(particle, delta);
        }

        if (!this.#isParticleActive(particle, id, removalVersion)) {
          continue;
        }

        if (!particle.spawning) {
          for (const plugin of this.#postParticleUpdatePlugins) {
            if (!this.#isParticleActive(particle, id, removalVersion)) {
              break;
            }

            plugin.postParticleUpdate?.(particle, delta);
          }
        }

        if (this.#isParticleActive(particle, id, removalVersion)) {
          this.#updateParticleBucket(particle);
        }
      }
    } finally {
      this.#iterationIndexes.pop();
    }
  }
}
