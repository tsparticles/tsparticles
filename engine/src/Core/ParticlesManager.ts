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
} from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { LimitMode } from "../Enums/Modes/LimitMode.js";
import { Particle } from "./Particle.js";
import { type ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { SpatialHashGrid } from "./Utils/SpatialHashGrid.js";
import { getLogger } from "../Utils/LogUtils.js";
import { loadParticlesOptions } from "../Utils/OptionsUtils.js";

/**
 * Particles manager object
 */
export class ParticlesManager {
  /** Check particle position plugins */
  checkParticlePositionPlugins: IContainerPlugin[];

  /** The spatial hash grid */
  grid;

  /**
   * All the particles used in canvas
   */
  #array: Particle[];
  readonly #container: Container;
  readonly #groupLimits: Map<string, number>;
  #limit;
  #nextId;
  readonly #particleBuckets: Map<number, number>;
  #particleResetPlugins: IContainerPlugin[];
  #particleUpdatePlugins: IContainerPlugin[];
  readonly #pluginManager;
  readonly #pool: Particle[];
  #postParticleUpdatePlugins: IContainerPlugin[];
  #postUpdatePlugins: IContainerPlugin[];
  #resizeFactor?: IDimension;
  #updatePlugins: IContainerPlugin[];
  #zBuckets: Particle[][];

  /**
   *
   * @param pluginManager -
   * @param container -
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#nextId = 0;
    this.#array = [];
    this.#pool = [];
    this.#limit = 0;
    this.#groupLimits = new Map<string, number>();
    this.#particleBuckets = new Map<number, number>();
    this.#zBuckets = this.#createBuckets(this.#container.zLayers);
    this.grid = new SpatialHashGrid(spatialHashGridCellSize);
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

  /**
   * Adds a particle to the manager
   * @param position -
   * @param overrideOptions -
   * @param group -
   * @param initializer -
   * @returns the particle added
   */
  addParticle(
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
    initializer?: (particle: Particle) => boolean,
  ): Particle | undefined {
    const limitMode = this.#container.actualOptions.particles.number.limit.mode,
      limit = group === undefined ? this.#limit : (this.#groupLimits.get(group) ?? this.#limit),
      currentCount = this.count;

    if (limit > minLimit) {
      switch (limitMode) {
        case LimitMode.delete: {
          const countToRemove = currentCount + countOffset - limit;

          if (countToRemove > minCount) {
            this.removeQuantity(countToRemove);
          }

          break;
        }
        case LimitMode.wait:
          if (currentCount >= limit) {
            return;
          }

          break;
        default:
          // no-op
          break;
      }
    }

    try {
      const particle = this.#pool.pop() ?? new Particle(this.#pluginManager, this.#container);

      particle.init(this.#nextId, position, overrideOptions, group);

      let canAdd = true;

      if (initializer) {
        canAdd = initializer(particle);
      }

      if (!canAdd) {
        this.#pool.push(particle);

        return;
      }

      this.#array.push(particle);
      this.#insertParticleIntoBucket(particle);

      this.#nextId++;

      this.#container.dispatchEvent(EventType.particleAdded, {
        particle,
      });

      return particle;
    } catch (e: unknown) {
      getLogger().warning(`error adding particle: ${e as string}`);
    }

    return undefined;
  }

  /**
   * Removes all particles from the array
   */
  clear(): void {
    this.#array = [];
    this.#particleBuckets.clear();
    this.#resetBuckets(this.#container.zLayers);
  }

  /** Destroys the particles manager */
  destroy(): void {
    this.#array = [];
    this.#pool.length = 0;
    this.#particleBuckets.clear();
    this.#zBuckets = [];
    this.checkParticlePositionPlugins = [];
    this.#particleResetPlugins = [];
    this.#particleUpdatePlugins = [];
    this.#postUpdatePlugins = [];
    this.#postParticleUpdatePlugins = [];
    this.#updatePlugins = [];
  }

  /**
   * Draws all particles
   * @param delta -
   */
  drawParticles(delta: IDelta): void {
    for (let i = this.#zBuckets.length - one; i >= minIndex; i--) {
      const bucket = this.#zBuckets[i];

      if (!bucket) {
        continue;
      }

      for (const particle of bucket) {
        particle.draw(delta);
      }
    }
  }

  /**
   * Filters particles with a condition
   * @param condition -
   * @returns the array of the particles filtered
   */
  filter(condition: (particle: Particle) => boolean): Particle[] {
    return this.#array.filter(condition);
  }

  /**
   * Finds a particle with a condition
   * @param condition -
   * @returns the particle found
   */
  find(condition: (particle: Particle) => boolean): Particle | undefined {
    return this.#array.find(condition);
  }

  /**
   * Gets a particle by index
   * @param index -
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
    const container = this.#container,
      options = container.actualOptions;

    this.checkParticlePositionPlugins = [];
    this.#updatePlugins = [];
    this.#particleUpdatePlugins = [];
    this.#postUpdatePlugins = [];
    this.#particleResetPlugins = [];
    this.#postParticleUpdatePlugins = [];
    this.#particleBuckets.clear();
    this.#resetBuckets(container.zLayers);

    this.grid = new SpatialHashGrid(spatialHashGridCellSize * container.retina.pixelRatio);

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

    await this.#container.initDrawersAndUpdaters();

    for (const drawer of this.#container.effectDrawers.values()) {
      await drawer.init?.(container);
    }

    for (const drawer of this.#container.shapeDrawers.values()) {
      await drawer.init?.(container);
    }

    let handled = false;

    for (const plugin of container.plugins) {
      handled = plugin.particlesInitialization?.() ?? handled;

      if (handled) {
        break;
      }
    }

    if (!handled) {
      const particlesOptions = options.particles,
        groups = particlesOptions.groups;

      for (const group in groups) {
        const groupOptions = groups[group];

        if (!groupOptions) {
          continue;
        }

        for (let i = this.count, j = 0; j < groupOptions.number.value && i < particlesOptions.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }

      for (let i = this.count; i < particlesOptions.number.value; i++) {
        this.addParticle();
      }
    }
  }

  /**
   * Adds particles to the manager
   * @param nb -
   * @param position -
   * @param overrideOptions -
   * @param group -
   */
  push(
    nb: number,
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
  ): void {
    for (let i = 0; i < nb; i++) {
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
   * @param particle -
   * @param group -
   * @param override -
   */
  remove(particle: Particle, group?: string, override?: boolean): void {
    this.removeAt(this.#array.indexOf(particle), undefined, group, override);
  }

  /**
   * Removes particles at a specific index
   * @param index -
   * @param quantity -
   * @param group -
   * @param override -
   */
  removeAt(index: number, quantity = defaultRemoveQuantity, group?: string, override?: boolean): void {
    if (index < minIndex || index > this.count) {
      return;
    }

    let deleted = 0;

    for (let i = index; deleted < quantity && i < this.count; i++) {
      if (this.#removeParticle(i, group, override)) {
        i--;
        deleted++;
      }
    }
  }

  /**
   * Removes a quantity of particles
   * @param quantity -
   * @param group -
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
   * @param factor -
   */
  setResizeFactor(factor: IDimension): void {
    this.#resizeFactor = factor;
  }

  /**
   * Updates all particles
   * @param delta -
   */
  update(delta: IDelta): void {
    this.grid.clear();

    for (const plugin of this.#updatePlugins) {
      plugin.update?.(delta);
    }

    const particlesToDelete = this.#updateParticlesPhase1(delta);

    for (const plugin of this.#postUpdatePlugins) {
      plugin.postUpdate?.(delta);
    }

    this.#updateParticlesPhase2(delta, particlesToDelete);

    if (particlesToDelete.size) {
      for (const particle of particlesToDelete) {
        this.remove(particle);
      }
    }

    this.#resizeFactor = undefined;
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
      if (group === undefined) {
        this.#limit = numberOptions.limit.value;
      } else if (groupOptions?.number.limit.value ?? numberOptions.limit.value) {
        this.#groupLimits.set(group, groupOptions?.number.limit.value ?? numberOptions.limit.value);
      }

      return;
    }

    const densityFactor = this.#initDensityFactor(numberOptions.density),
      optParticlesNumber = numberOptions.value,
      optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
      particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + pluginsCount,
      particlesCount = Math.min(this.count, this.filter(t => t.group === group).length);

    if (group === undefined) {
      this.#limit = numberOptions.limit.value * densityFactor;
    } else {
      this.#groupLimits.set(group, numberOptions.limit.value * densityFactor);
    }

    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  }

  #createBuckets(zLayers: number): Particle[][] {
    const bucketCount = Math.max(Math.floor(zLayers), one);

    return Array.from({ length: bucketCount }, () => []);
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

    if (!canvasSize.width || !canvasSize.height) {
      return defaultDensityFactor;
    }

    return (
      (canvasSize.width * canvasSize.height) / (densityOptions.height * densityOptions.width * pxRatio ** squareExp)
    );
  }

  #insertParticleIntoBucket(particle: Particle): void {
    const bucketIndex = this.#getBucketIndex(particle.position.z),
      bucket = this.#zBuckets[bucketIndex];

    if (!bucket) {
      return;
    }

    bucket.push(particle);
    this.#particleBuckets.set(particle.id, bucketIndex);
  }

  #removeParticle(index: number, group?: string, override?: boolean): boolean {
    const particle = this.#array[index];

    if (!particle) {
      return false;
    }

    if (particle.group !== group) {
      return false;
    }

    this.#array.splice(index, deleteCount);
    this.#removeParticleFromBucket(particle);

    particle.destroy(override);

    this.#container.dispatchEvent(EventType.particleRemoved, {
      particle,
    });

    this.#addToPool(particle);

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

    newBucket.push(particle);

    if (newBucket.length >= double) {
      const prev = newBucket[newBucket.length - double];

      if (prev && particle.id < prev.id) {
        newBucket.sort((a, b) => a.id - b.id);
      }
    }

    this.#particleBuckets.set(particle.id, newBucketIndex);
  }

  #updateParticlesPhase1(delta: IDelta): Set<Particle> {
    const particlesToDelete = new Set<Particle>(),
      resizeFactor = this.#resizeFactor;

    for (const particle of this.#array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }

      particle.ignoresResizeRatio = false;

      for (const plugin of this.#particleResetPlugins) {
        plugin.particleReset?.(particle);
      }

      for (const plugin of this.#particleUpdatePlugins) {
        if (particle.destroyed) {
          break;
        }

        plugin.particleUpdate?.(particle, delta);
      }

      if (particle.destroyed) {
        particlesToDelete.add(particle);

        continue;
      }

      this.grid.insert(particle);
    }

    return particlesToDelete;
  }

  #updateParticlesPhase2(delta: IDelta, particlesToDelete: Set<Particle>): void {
    for (const particle of this.#array) {
      if (particle.destroyed) {
        particlesToDelete.add(particle);

        continue;
      }

      for (const updater of this.#container.particleUpdaters) {
        updater.update(particle, delta);
      }

      if (!particle.spawning) {
        for (const plugin of this.#postParticleUpdatePlugins) {
          plugin.postParticleUpdate?.(particle, delta);
        }
      }

      this.#updateParticleBucket(particle);
    }
  }
}
