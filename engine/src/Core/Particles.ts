import {
  countOffset,
  defaultDensityFactor,
  defaultRemoveQuantity,
  deleteCount,
  lengthOffset,
  minCount,
  minIndex,
  minLimit,
  /* posOffset,
  qTreeCapacity,
  sizeFactor, */
  spatialHashGridCellSize,
  squareExp,
} from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator.js";
import type { IParticleMover } from "./Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import { LimitMode } from "../Enums/Modes/LimitMode.js";
import { Particle } from "./Particle.js";
import { type ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { SpatialHashGrid } from "./Utils/SpatialHashGrid.js";
import { getLogger } from "../Utils/LogUtils.js";
import { loadParticlesOptions } from "../Utils/OptionsUtils.js";

/**
 * Particles manager object
 */
export class Particles {
  availablePathGenerators: Map<string, IMovePathGenerator>;

  checkParticlePositionPlugins: IContainerPlugin[];

  effectDrawers: Map<string, IEffectDrawer>;

  grid;

  movers: IParticleMover[];

  pathGenerators: Map<string, IMovePathGenerator>;

  shapeDrawers: Map<string, IShapeDrawer>;

  updaters: IParticleUpdater[];

  /**
   * All the particles used in canvas
   */
  private _array: Particle[];
  private readonly _container: Container;
  private readonly _engine;
  private readonly _groupLimits: Map<string, number>;
  private _limit;
  private _maxZIndex;
  private _minZIndex;
  private _needsSort;
  private _nextId;
  private _particleResetPlugins: IContainerPlugin[];
  private _particleUpdatePlugins: IContainerPlugin[];
  private readonly _pool: Particle[];
  private _postParticleUpdatePlugins: IContainerPlugin[];
  private _postUpdatePlugins: IContainerPlugin[];
  private _resizeFactor?: IDimension;
  private _updatePlugins: IContainerPlugin[];
  private _zArray: Particle[];

  /**
   *
   * @param engine -
   * @param container -
   */
  constructor(engine: Engine, container: Container) {
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = new Map<string, number>();
    this._needsSort = false;
    this._minZIndex = 0;
    this._maxZIndex = 0;
    this.grid = new SpatialHashGrid(spatialHashGridCellSize);
    this.effectDrawers = new Map();
    this.movers = [];
    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
    this.shapeDrawers = new Map();
    this.updaters = [];
    this.checkParticlePositionPlugins = [];
    this._particleResetPlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._postParticleUpdatePlugins = [];
    this._updatePlugins = [];
  }

  get count(): number {
    return this._array.length;
  }

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
      const particle = this._pool.pop() ?? new Particle(this._engine, this._container);

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
      this._zArray.push(particle);

      this._nextId++;

      this._engine.dispatchEvent(EventType.particleAdded, {
        container: this._container,
        data: {
          particle,
        },
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
    this._zArray = [];
  }

  destroy(): void {
    const container = this._container;

    for (const [, effectDrawer] of this.effectDrawers) {
      effectDrawer.destroy?.(container);
    }

    for (const [, shapeDrawer] of this.shapeDrawers) {
      shapeDrawer.destroy?.(container);
    }

    this._array = [];
    this._pool.length = 0;
    this._zArray = [];
    this.effectDrawers = new Map();
    this.movers = [];
    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
    this.shapeDrawers = new Map();
    this.updaters = [];
    this.checkParticlePositionPlugins = [];
    this._particleResetPlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._postParticleUpdatePlugins = [];
    this._updatePlugins = [];
  }

  drawParticles(delta: IDelta): void {
    for (const particle of this._zArray) {
      particle.draw(delta);
    }
  }

  filter(condition: (particle: Particle) => boolean): Particle[] {
    return this._array.filter(condition);
  }

  find(condition: (particle: Particle) => boolean): Particle | undefined {
    return this._array.find(condition);
  }

  get(index: number): Particle | undefined {
    return this._array[index];
  }

  /* --------- tsParticles functions - particles ----------- */
  async init(): Promise<void> {
    const container = this._container,
      options = container.actualOptions;

    this._minZIndex = 0;
    this._maxZIndex = 0;
    this._needsSort = false;
    this.checkParticlePositionPlugins = [];
    this._updatePlugins = [];
    this._particleUpdatePlugins = [];
    this._postUpdatePlugins = [];
    this._particleResetPlugins = [];
    this._postParticleUpdatePlugins = [];

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

    await this.initPlugins();

    for (const drawer of this.effectDrawers.values()) {
      await drawer.init?.(container);
    }

    for (const drawer of this.shapeDrawers.values()) {
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

  async initPlugins(): Promise<void> {
    const container = this._container;

    this.effectDrawers = await this._engine.getEffectDrawers(container, true);
    this.movers = await this._engine.getMovers(container, true);
    this.availablePathGenerators = await this._engine.getPathGenerators(container, true);
    this.pathGenerators = new Map();
    this.shapeDrawers = await this._engine.getShapeDrawers(container, true);
    this.updaters = await this._engine.getUpdaters(container, true);

    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.init();
    }
  }

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

  async redraw(): Promise<void> {
    this.clear();
    await this.init();

    this._container.canvas.drawParticles({ value: 0, factor: 0 });
  }

  remove(particle: Particle, group?: string, override?: boolean): void {
    this.removeAt(this._array.indexOf(particle), undefined, group, override);
  }

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

  removeQuantity(quantity: number, group?: string): void {
    this.removeAt(minIndex, quantity, group);
  }

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

      const groupDataOptions = loadParticlesOptions(this._engine, this._container, groupData);

      this._applyDensity(groupDataOptions, pluginsCount, group);
    }

    this._applyDensity(options.particles, pluginsCount);
  }

  setLastZIndex(zIndex: number): void {
    this._needsSort ||= zIndex >= this._maxZIndex || (zIndex > this._minZIndex && zIndex < this._maxZIndex);
  }

  setResizeFactor(factor: IDimension): void {
    this._resizeFactor = factor;
  }

  update(delta: IDelta): void {
    const particlesToDelete = new Set<Particle>();

    this.grid.clear();

    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.update();
    }

    for (const plugin of this._updatePlugins) {
      plugin.update?.(delta);
    }

    const resizeFactor = this._resizeFactor;

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

      for (const mover of this.movers) {
        if (mover.isEnabled(particle)) {
          mover.move(particle, delta);
        }
      }

      if (particle.destroyed) {
        particlesToDelete.add(particle);

        continue;
      }

      this.grid.insert(particle);
    }

    if (particlesToDelete.size) {
      const checkDelete = (p: Particle): boolean => !particlesToDelete.has(p);

      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);

      for (const particle of particlesToDelete) {
        this._engine.dispatchEvent(EventType.particleRemoved, {
          container: this._container,
          data: {
            particle,
          },
        });
      }

      this._addToPool(...particlesToDelete);
    }

    for (const plugin of this._postUpdatePlugins) {
      plugin.postUpdate?.(delta);
    }

    // this loop is required to be done after mouse interactions
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }

      if (!particle.destroyed && !particle.spawning) {
        for (const plugin of this._postParticleUpdatePlugins) {
          plugin.postParticleUpdate?.(particle, delta);
        }
      }
    }

    delete this._resizeFactor;

    if (this._needsSort) {
      const zArray = this._zArray;

      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);

      const firstItem = zArray[minIndex],
        lastItem = zArray[zArray.length - lengthOffset];

      if (!firstItem || !lastItem) {
        return;
      }

      this._maxZIndex = firstItem.position.z;
      this._minZIndex = lastItem.position.z;
      this._needsSort = false;
    }
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

  private readonly _initDensityFactor: (densityOptions: IParticlesDensity) => number = densityOptions => {
    const container = this._container;

    if (!container.canvas.element || !densityOptions.enable) {
      return defaultDensityFactor;
    }

    const canvas = container.canvas.element,
      pxRatio = container.retina.pixelRatio;

    return (canvas.width * canvas.height) / (densityOptions.height * densityOptions.width * pxRatio ** squareExp);
  };

  private readonly _removeParticle = (index: number, group?: string, override?: boolean): boolean => {
    const particle = this._array[index];

    if (!particle) {
      return false;
    }

    if (particle.group !== group) {
      return false;
    }

    const zIdx = this._zArray.indexOf(particle);

    this._array.splice(index, deleteCount);
    this._zArray.splice(zIdx, deleteCount);

    particle.destroy(override);

    this._engine.dispatchEvent(EventType.particleRemoved, {
      container: this._container,
      data: {
        particle,
      },
    });

    this._addToPool(particle);

    return true;
  };
}
