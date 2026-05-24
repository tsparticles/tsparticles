import {
  countOffset,
  defaultDensityFactor,
  defaultRemoveQuantity,
  deleteCount,
  double,
  empty,
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
  private _array: Particle[];
  private readonly _container: Container;
  private readonly _groupLimits: Map<string, number>;
  private _limit;
  private _nextId;
  private readonly _particleBuckets: Map<number, number>;
  private _particleResetPlugins: IContainerPlugin[];
  private _particleUpdatePlugins: IContainerPlugin[];
  private readonly _pluginManager;
  private readonly _pool: Particle[];
  private _postParticleUpdatePlugins: IContainerPlugin[];
  private _postUpdatePlugins: IContainerPlugin[];
  private _resizeFactor?: IDimension;
  private _updatePlugins: IContainerPlugin[];
  private _zBuckets: Particle[][];

  /**
   *
   * @param pluginManager -
   * @param container -
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = new Map<string, number>();
    this._particleBuckets = new Map<number, number>();
    this._zBuckets = this._createBuckets(this._container.zLayers);
    this.grid = new SpatialHashGrid(spatialHashGridCellSize);
    this.checkParticlePositionPlugins = [];
    this._particleResetPlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._postParticleUpdatePlugins = [];
    this._updatePlugins = [];
  }

  /**
   * Gets the number of particles
   * @returns the count of particles
   */
  get count(): number {
    return this._array.length;
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
    const limitMode = this._container.actualOptions.particles.number.limit.mode,
      limit = group === undefined ? this._limit : (this._groupLimits.get(group) ?? this._limit),
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
      const particle = this._pool.pop() ?? new Particle(this._pluginManager, this._container);

      particle.init(this._nextId, position, overrideOptions, group);

      let canAdd = true;

      if (initializer) {
        canAdd = initializer(particle);
      }

      if (!canAdd) {
        this._pool.push(particle);

        return;
      }

      this._array.push(particle);
      this._insertParticleIntoBucket(particle);

      this._nextId++;

      this._container.dispatchEvent(EventType.particleAdded, {
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
    this._array = [];
    this._particleBuckets.clear();
    this._resetBuckets(this._container.zLayers);
  }

  /** Destroys the particles manager */
  destroy(): void {
    this._array = [];
    this._pool.length = 0;
    this._particleBuckets.clear();
    this._zBuckets = [];
    this.checkParticlePositionPlugins = [];
    this._particleResetPlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._postParticleUpdatePlugins = [];
    this._updatePlugins = [];
  }

  /**
   * Draws all particles
   * @param delta -
   */
  drawParticles(delta: IDelta): void {
    for (let i = this._zBuckets.length - one; i >= minIndex; i--) {
      const bucket = this._zBuckets[i];

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
    return this._array.filter(condition);
  }

  /**
   * Finds a particle with a condition
   * @param condition -
   * @returns the particle found
   */
  find(condition: (particle: Particle) => boolean): Particle | undefined {
    return this._array.find(condition);
  }

  /**
   * Gets a particle by index
   * @param index -
   * @returns the particle at the index
   */
  get(index: number): Particle | undefined {
    return this._array[index];
  }

  /**
   * Initializes the particles manager
   * @returns the promise for the init
   */
  async init(): Promise<void> {
    const container = this._container,
      options = container.actualOptions;

    this.checkParticlePositionPlugins = [];
    this._updatePlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._particleResetPlugins = [];
    this._postParticleUpdatePlugins = [];
    this._particleBuckets.clear();
    this._resetBuckets(container.zLayers);

    this.grid = new SpatialHashGrid(spatialHashGridCellSize * container.retina.pixelRatio);

    for (const plugin of container.plugins) {
      if (plugin.redrawInit) {
        await plugin.redrawInit();
      }

      if (plugin.checkParticlePosition) {
        this.checkParticlePositionPlugins.push(plugin);
      }

      if (plugin.update) {
        this._updatePlugins.push(plugin);
      }

      if (plugin.particleUpdate) {
        this._particleUpdatePlugins.push(plugin);
      }

      if (plugin.postUpdate) {
        this._postUpdatePlugins.push(plugin);
      }

      if (plugin.particleReset) {
        this._particleResetPlugins.push(plugin);
      }

      if (plugin.postParticleUpdate) {
        this._postParticleUpdatePlugins.push(plugin);
      }
    }

    await this._container.initDrawersAndUpdaters();

    for (const drawer of this._container.effectDrawers.values()) {
      await drawer.init?.(container);
    }

    for (const drawer of this._container.shapeDrawers.values()) {
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

    this._container.canvas.render.drawParticles({ value: 0, factor: 0 });
  }

  /**
   * Removes a particle
   * @param particle -
   * @param group -
   * @param override -
   */
  remove(particle: Particle, group?: string, override?: boolean): void {
    this.removeAt(this._array.indexOf(particle), undefined, group, override);
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
      if (this._removeParticle(i, group, override)) {
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
    const options = this._container.actualOptions,
      groups = options.particles.groups;

    let pluginsCount = 0;

    for (const plugin of this._container.plugins) {
      if (plugin.particlesDensityCount) {
        pluginsCount += plugin.particlesDensityCount();
      }
    }

    for (const group in groups) {
      const groupData = groups[group];

      if (!groupData) {
        continue;
      }

      const groupDataOptions = loadParticlesOptions(this._pluginManager, this._container, groupData);

      this._applyDensity(groupDataOptions, pluginsCount, group);
    }

    this._applyDensity(options.particles, pluginsCount);
  }

  /**
   * Sets the resize factor
   * @param factor -
   */
  setResizeFactor(factor: IDimension): void {
    this._resizeFactor = factor;
  }

  /**
   * Updates all particles
   * @param delta -
   */
  update(delta: IDelta): void {
    this.grid.clear();

    for (const plugin of this._updatePlugins) {
      plugin.update?.(delta);
    }

    const particlesToDelete = this._updateParticlesPhase1(delta);

    for (const plugin of this._postUpdatePlugins) {
      plugin.postUpdate?.(delta);
    }

    this._updateParticlesPhase2(delta, particlesToDelete);

    if (particlesToDelete.size) {
      for (const particle of particlesToDelete) {
        this.remove(particle);
      }
    }

    delete this._resizeFactor;
  }

  private readonly _addToPool = (...particles: Particle[]): void => {
    this._pool.push(...particles);
  };

  private readonly _applyDensity = (
    options: ParticlesOptions,
    pluginsCount: number,
    group?: string,
    groupOptions?: ParticlesOptions,
  ): void => {
    const numberOptions = options.number;

    if (!numberOptions.density.enable) {
      if (group === undefined) {
        this._limit = numberOptions.limit.value;
      } else if (groupOptions?.number.limit.value ?? numberOptions.limit.value) {
        this._groupLimits.set(group, groupOptions?.number.limit.value ?? numberOptions.limit.value);
      }

      return;
    }

    const densityFactor = this._initDensityFactor(numberOptions.density),
      optParticlesNumber = numberOptions.value,
      optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
      particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + pluginsCount,
      particlesCount = Math.min(this.count, this.filter(t => t.group === group).length);

    if (group === undefined) {
      this._limit = numberOptions.limit.value * densityFactor;
    } else {
      this._groupLimits.set(group, numberOptions.limit.value * densityFactor);
    }

    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  };

  private readonly _createBuckets = (zLayers: number): Particle[][] => {
    const bucketCount = Math.max(Math.floor(zLayers), one);

    return Array.from({ length: bucketCount }, () => []);
  };

  private readonly _getBucketIndex = (zIndex: number): number => {
    const maxBucketIndex = this._zBuckets.length - one;

    if (maxBucketIndex <= minIndex) {
      return minIndex;
    }

    return Math.min(Math.max(Math.floor(zIndex), minIndex), maxBucketIndex);
  };

  private readonly _getParticleInsertIndex = (bucket: Particle[], particleId: number): number => {
    let start = minIndex,
      end = bucket.length;

    while (start < end) {
      const middle = Math.floor((start + end) / double),
        middleParticle = bucket[middle];

      if (!middleParticle) {
        end = middle;

        continue;
      }

      if (middleParticle.id < particleId) {
        start = middle + one;
      } else {
        end = middle;
      }
    }

    return start;
  };

  private readonly _initDensityFactor: (densityOptions: IParticlesDensity) => number = densityOptions => {
    const container = this._container;

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
  };

  private readonly _insertParticleIntoBucket = (particle: Particle): void => {
    const bucketIndex = this._getBucketIndex(particle.position.z),
      bucket = this._zBuckets[bucketIndex];

    if (!bucket) {
      return;
    }

    bucket.splice(this._getParticleInsertIndex(bucket, particle.id), empty, particle);
    this._particleBuckets.set(particle.id, bucketIndex);
  };

  private readonly _removeParticle = (index: number, group?: string, override?: boolean): boolean => {
    const particle = this._array[index];

    if (!particle) {
      return false;
    }

    if (particle.group !== group) {
      return false;
    }

    this._array.splice(index, deleteCount);
    this._removeParticleFromBucket(particle);

    particle.destroy(override);

    this._container.dispatchEvent(EventType.particleRemoved, {
      particle,
    });

    this._addToPool(particle);

    return true;
  };

  private readonly _removeParticleFromBucket = (particle: Particle): void => {
    const bucketIndex = this._particleBuckets.get(particle.id) ?? this._getBucketIndex(particle.position.z),
      bucket = this._zBuckets[bucketIndex];

    if (!bucket) {
      this._particleBuckets.delete(particle.id);

      return;
    }

    const particleIndex = this._getParticleInsertIndex(bucket, particle.id);

    if (bucket[particleIndex]?.id !== particle.id) {
      this._particleBuckets.delete(particle.id);

      return;
    }

    bucket.splice(particleIndex, deleteCount);
    this._particleBuckets.delete(particle.id);
  };

  private readonly _resetBuckets = (zLayers: number): void => {
    const bucketCount = Math.max(Math.floor(zLayers), one);

    if (this._zBuckets.length !== bucketCount) {
      this._zBuckets = this._createBuckets(bucketCount);

      return;
    }

    for (const bucket of this._zBuckets) {
      bucket.length = minIndex;
    }
  };

  private readonly _updateParticleBucket = (particle: Particle): void => {
    const newBucketIndex = this._getBucketIndex(particle.position.z),
      currentBucketIndex = this._particleBuckets.get(particle.id);

    if (currentBucketIndex === undefined) {
      this._insertParticleIntoBucket(particle);

      return;
    }

    if (currentBucketIndex === newBucketIndex) {
      return;
    }

    const currentBucket = this._zBuckets[currentBucketIndex];

    if (currentBucket) {
      const particleIndex = this._getParticleInsertIndex(currentBucket, particle.id);

      if (currentBucket[particleIndex]?.id === particle.id) {
        currentBucket.splice(particleIndex, deleteCount);
      }
    }

    const newBucket = this._zBuckets[newBucketIndex];

    if (!newBucket) {
      this._particleBuckets.set(particle.id, newBucketIndex);

      return;
    }

    newBucket.splice(this._getParticleInsertIndex(newBucket, particle.id), empty, particle);
    this._particleBuckets.set(particle.id, newBucketIndex);
  };

  private readonly _updateParticlesPhase1 = (delta: IDelta): Set<Particle> => {
    const particlesToDelete = new Set<Particle>(),
      resizeFactor = this._resizeFactor;

    for (const particle of this._array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }

      particle.ignoresResizeRatio = false;

      for (const plugin of this._particleResetPlugins) {
        plugin.particleReset?.(particle);
      }

      for (const plugin of this._particleUpdatePlugins) {
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
  };

  private readonly _updateParticlesPhase2 = (delta: IDelta, particlesToDelete: Set<Particle>): void => {
    for (const particle of this._array) {
      if (particle.destroyed) {
        particlesToDelete.add(particle);

        continue;
      }

      for (const updater of this._container.particleUpdaters) {
        updater.update(particle, delta);
      }

      if (!particle.spawning) {
        for (const plugin of this._postParticleUpdatePlugins) {
          plugin.postParticleUpdate?.(particle, delta);
        }
      }

      this._updateParticleBucket(particle);
    }
  };
}
