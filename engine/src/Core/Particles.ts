import {
  countOffset,
  defaultDensityFactor,
  minCount,
  minLimit,
  spatialHashGridCellSize,
  squareExp,
} from "./Utils/Constants.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import { LimitMode } from "../Enums/Modes/LimitMode.js";
import type { Options } from "../Options/Classes/Options.js";
import { Particle } from "./Particle.js";
import { type ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { SpatialHashGrid } from "./Utils/SpatialHashGrid.js";
import { getLogger } from "../Utils/LogUtils.js";

const empty = 0,
  groupIncrement = 1,
  defaultZLayers = 100,
  defaultPixelRatio = 1;

/**
 * Particles manager object
 */
export class Particles {
  grid = new SpatialHashGrid(spatialHashGridCellSize);

  readonly particleCheckPositionPlugins: IContainerPlugin[] = [];
  readonly particleCreatedPlugins: IContainerPlugin[] = [];
  readonly particleDestroyedPlugins: IContainerPlugin[] = [];
  readonly particlePositionPlugins: IContainerPlugin[] = [];

  private _actualOptions?: Options;
  private _canvasSize?: Readonly<IDimension>;
  private _count: number;
  private _dispatchEventCallback?: (type: string, data?: unknown) => void;
  private _drawParticleCallback?: (particle: Particle, delta: IDelta) => void;
  private _effectDrawers?: Map<string, IEffectDrawer>;
  private readonly _groupCounts = new Map<string, number>();
  private readonly _groupLimits = new Map<string, number>();
  private _head?: Particle;
  private _initRetinaCallback?: (particle: Particle) => void;
  private _limit;
  private _loadParticlesOptions?: (source?: RecursivePartial<IParticlesOptions>) => ParticlesOptions;
  private _nextId;
  private readonly _particleResetPlugins: IContainerPlugin[] = [];
  private readonly _particleUpdatePlugins: IContainerPlugin[] = [];
  private _pixelRatio = defaultPixelRatio;
  private _plugins: IContainerPlugin[] = [];
  private _poolHead?: Particle;
  private readonly _postParticleUpdatePlugins: IContainerPlugin[] = [];
  private readonly _postUpdatePlugins: IContainerPlugin[] = [];
  private _redrawCallback?: (delta: IDelta) => void;
  private _resizeFactor?: IDimension;
  private _shapeDrawers?: Map<string, IShapeDrawer>;
  private _sortedZKeys: number[] = [];
  private _tail?: Particle;
  private readonly _updatePlugins: IContainerPlugin[] = [];
  private _updaters?: IParticleUpdater[];
  private _zLayers = defaultZLayers;
  private readonly _zLayersData = new Map<number, Set<Particle>>();

  constructor() {
    this._nextId = 0;
    this._count = 0;
    this._limit = 0;
  }

  get count(): number {
    return this._count;
  }

  *[Symbol.iterator](): Generator<Particle, void, unknown> {
    let current = this._head;

    while (current) {
      yield current;

      current = current.next;
    }
  }

  addParticle(
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
    initializer?: (particle: Particle) => boolean,
  ): Particle | undefined {
    const loadParticlesOptions = this._loadParticlesOptions,
      actualOptions = this._actualOptions;

    if (!loadParticlesOptions || !actualOptions) {
      return;
    }

    const canvasSize = this._canvasSize;

    if (!canvasSize) {
      return;
    }

    const limitMode = actualOptions.particles.number.limit.mode,
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
      let particle: Particle;

      if (this._poolHead) {
        particle = this._poolHead;
        this._poolHead = particle.next;
        particle.next = undefined;
        particle.prev = undefined;
      } else {
        particle = new Particle();
      }

      const particlesOptions = loadParticlesOptions(this._actualOptions?.particles);

      particle.init({
        canvasSize,
        dispatchEvent: (type, data) => {
          this._dispatchEventCallback?.(type, data);
        },
        effectDrawers: this._effectDrawers ?? new Map<string, IEffectDrawer>(),
        group,
        id: this._nextId,
        initRetina: () => {
          this._initRetinaCallback?.(particle);
        },
        onDestroyCallback: () => {
          if (particle.prev) {
            particle.prev.next = particle.next;
          } else {
            this._head = particle.next;
          }

          if (particle.next) {
            particle.next.prev = particle.prev;
          } else {
            this._tail = particle.prev;
          }

          if (particle.group !== undefined) {
            const c = this._groupCounts.get(particle.group) ?? groupIncrement;

            this._groupCounts.set(particle.group, c - groupIncrement);
          }

          this._removeFromZLayer(particle);

          this._count--;

          this._dispatchEventCallback?.(EventType.particleRemoved, {
            particle: particle,
          });

          this._addToPool(particle);
        },
        overrideOptions,
        particleCheckPositionPlugins: this.particleCheckPositionPlugins,
        particleCreatedPlugins: this.particleCreatedPlugins,
        particleDestroyedPlugins: this.particleDestroyedPlugins,
        particlePositionPlugins: this.particlePositionPlugins,
        particlesOptions,
        position,
        pixelRatio: this._pixelRatio,
        shapeDrawers: this._shapeDrawers ?? new Map<string, IShapeDrawer>(),
        updaters: this._updaters ?? [],
        zLayers: this._zLayers,
      });

      let canAdd = true;

      if (initializer) {
        canAdd = initializer(particle);
      }

      if (!canAdd) {
        this._addToPool(particle);
        return;
      }

      this._pushActive(particle);
      this._addToZLayer(particle);

      this._nextId++;

      this._dispatchEventCallback?.(EventType.particleAdded, {
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
    this._head = undefined;
    this._tail = undefined;
    this._count = 0;
    this._zLayersData.clear();
    this._sortedZKeys = [];
  }

  destroy(): void {
    this.clear();
    this._poolHead = undefined;
    this.particleDestroyedPlugins.length = 0;
    this.particleCreatedPlugins.length = 0;
    this.particlePositionPlugins.length = 0;
    this.particleCheckPositionPlugins.length = 0;
    this._particleResetPlugins.length = 0;
    this._particleUpdatePlugins.length = 0;
    this._postUpdatePlugins.length = 0;
    this._postParticleUpdatePlugins.length = 0;
    this._updatePlugins.length = 0;
  }

  drawParticles(delta: IDelta): void {
    const drawParticleCallback = this._drawParticleCallback;

    if (!drawParticleCallback) {
      return;
    }

    for (const z of this._sortedZKeys) {
      const layer = this._zLayersData.get(z);
      if (layer) {
        for (const particle of layer) {
          drawParticleCallback(particle, delta);
        }
      }
    }
  }

  /* --------- tsParticles functions - particles ----------- */
  async init(): Promise<void> {
    const options = this._actualOptions;

    if (!options) {
      return;
    }

    this.particleDestroyedPlugins.length = 0;
    this.particleCreatedPlugins.length = 0;
    this.particlePositionPlugins.length = 0;
    this.particleCheckPositionPlugins.length = 0;
    this._updatePlugins.length = 0;
    this._particleUpdatePlugins.length = 0;
    this._postUpdatePlugins.length = 0;
    this._particleResetPlugins.length = 0;
    this._postParticleUpdatePlugins.length = 0;

    this.grid = new SpatialHashGrid(spatialHashGridCellSize * this._pixelRatio);

    for (const plugin of this._plugins) {
      if (plugin.redrawInit) {
        await plugin.redrawInit();
      }

      if (plugin.particleCreated) {
        this.particleCreatedPlugins.push(plugin);
      }

      if (plugin.particleDestroyed) {
        this.particleDestroyedPlugins.push(plugin);
      }

      if (plugin.particlePosition) {
        this.particlePositionPlugins.push(plugin);
      }

      if (plugin.checkParticlePosition) {
        this.particleCheckPositionPlugins.push(plugin);
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

    this._effectDrawers ??= new Map<string, IEffectDrawer>();
    this._shapeDrawers ??= new Map<string, IShapeDrawer>();

    for (const drawer of this._effectDrawers.values()) {
      await drawer.init?.();
    }

    for (const drawer of this._shapeDrawers.values()) {
      await drawer.init?.();
    }

    let handled = false;

    for (const plugin of this._plugins) {
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

  async redraw(pixelRatio: number): Promise<void> {
    this.clear();
    await this.init();

    this.setDensity(pixelRatio);
    this._redrawCallback?.({ value: 0, factor: 0 });
  }

  remove(particle: Particle, group?: string, override?: boolean): void {
    if (group && particle.group !== group) {
      return;
    }

    this._removeNode(particle, override);
  }

  removeQuantity(quantity: number, group?: string, override?: boolean): void {
    let current = this._head,
      deleted = 0;

    while (current && deleted < quantity) {
      const next = current.next;

      if (!group || current.group === group) {
        this._removeNode(current, override);

        deleted++;
      }

      current = next;
    }
  }

  setActualOptions(options: Options): void {
    this._actualOptions = options;
  }

  setCanvasSize(size: IDimension): void {
    this._canvasSize = size;
  }

  setDensity(pixelRatio: number): void {
    const loadParticlesOptions = this._loadParticlesOptions;

    if (!loadParticlesOptions) {
      return;
    }

    const options = this._actualOptions;

    if (!options) {
      return;
    }

    const groups = options.particles.groups;

    let pluginsCount = 0;

    for (const plugin of this._plugins) {
      if (plugin.particlesDensityCount) {
        pluginsCount += plugin.particlesDensityCount();
      }
    }

    for (const group in groups) {
      const groupData = groups[group];

      if (!groupData) {
        continue;
      }

      const groupDataOptions = loadParticlesOptions(groupData);

      this._applyDensity(groupDataOptions, pixelRatio, pluginsCount, group);
    }

    this._applyDensity(options.particles, pixelRatio, pluginsCount);
  }

  setDispatchEventCallback(cb: (type: string, data?: unknown) => void): void {
    this._dispatchEventCallback = cb;
  }

  setDrawParticleCallback(callback: (particle: Particle, delta: IDelta) => void): void {
    this._drawParticleCallback = callback;
  }

  setEffectDrawers(drawers: Map<string, IEffectDrawer>): void {
    this._effectDrawers = drawers;
  }

  setInitRetinaCallback(cb: (particle: Particle) => void): void {
    this._initRetinaCallback = cb;
  }

  setLoadParticlesOptions(fn: (source?: RecursivePartial<IParticlesOptions>) => ParticlesOptions): void {
    this._loadParticlesOptions = fn;
  }

  setPixelRatio(ratio: number): void {
    this._pixelRatio = ratio;
  }

  setPlugins(plugins: IContainerPlugin[]): void {
    this._plugins = plugins; // reference diretta, stessa reference che ha Container
  }

  setRedrawCallback(callback: (delta: IDelta) => void): void {
    this._redrawCallback = callback;
  }

  setResizeFactor(factor: IDimension): void {
    this._resizeFactor = factor;
  }

  setShapeDrawers(drawers: Map<string, IShapeDrawer>): void {
    this._shapeDrawers = drawers;
  }

  setUpdaters(updaters: IParticleUpdater[]): void {
    this._updaters = updaters;
  }

  setZLayers(zLayers: number): void {
    this._zLayers = zLayers;
  }

  update(delta: IDelta): void {
    this.grid.clear();

    for (const plugin of this._updatePlugins) {
      plugin.update?.(delta);
    }

    const resizeFactor = this._resizeFactor;
    let current = this._head;

    while (current) {
      const next = current.next; // Referenza sicura al prossimo prima di eventuali modifiche

      if (resizeFactor && !current.ignoresResizeRatio) {
        current.position.x *= resizeFactor.width;
        current.position.y *= resizeFactor.height;
        current.initialPosition.x *= resizeFactor.width;
        current.initialPosition.y *= resizeFactor.height;
      }

      current.ignoresResizeRatio = false;

      for (const plugin of this._particleResetPlugins) {
        plugin.particleReset?.(current);
      }

      for (const plugin of this._particleUpdatePlugins) {
        if (current.destroyed) {
          break;
        }

        plugin.particleUpdate?.(current, delta);
      }

      if (current.destroyed) {
        this._removeNode(current);
      } else {
        this._updateZLayer(current);

        this.grid.insert(current);
      }

      current = next;
    }

    for (const plugin of this._postUpdatePlugins) {
      plugin.postUpdate?.(delta);
    }

    this._updaters ??= [];

    for (const particle of this) {
      for (const updater of this._updaters) {
        updater.update(particle, delta);
      }

      if (!particle.destroyed && !particle.spawning) {
        for (const plugin of this._postParticleUpdatePlugins) {
          plugin.postParticleUpdate?.(particle, delta);
        }
      }
    }

    delete this._resizeFactor;
  }

  private readonly _addToPool = (...particles: Particle[]): void => {
    for (const p of particles) {
      p.next = this._poolHead;
      p.prev = undefined;

      this._poolHead = p;
    }
  };

  /**
   * @param particle -
   */
  private _addToZLayer(particle: Particle): void {
    const z = Math.floor(particle.position.z);

    let layer = this._zLayersData.get(z);

    if (!layer) {
      layer = new Set<Particle>();

      this._zLayersData.set(z, layer);
      this._sortedZKeys.push(z);
      this._sortedZKeys.sort((a, b) => b - a); // Ordine decrescente per il rendering
    }

    layer.add(particle);

    particle.currentZIndex = z;
  }

  private readonly _applyDensity = (
    options: ParticlesOptions,
    pixelRatio: number,
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

    const densityFactor = this._initDensityFactor(numberOptions.density, pixelRatio),
      optParticlesNumber = numberOptions.value,
      optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
      particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + pluginsCount,
      particlesCount = group === undefined ? this.count : (this._groupCounts.get(group) ?? empty);

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

  private readonly _initDensityFactor: (densityOptions: IParticlesDensity, pixelRatio: number) => number = (
    densityOptions,
    pixelRatio,
  ) => {
    if (!densityOptions.enable) {
      return defaultDensityFactor;
    }

    const canvasSize = this._canvasSize;

    if (!canvasSize) {
      return defaultDensityFactor;
    }

    return (
      (canvasSize.width * canvasSize.height) / (densityOptions.height * densityOptions.width * pixelRatio ** squareExp)
    );
  };

  /**
   * @param particle -
   */
  private _pushActive(particle: Particle): void {
    if (this._tail) {
      particle.prev = this._tail;

      this._tail.next = particle;
      this._tail = particle;
    } else {
      this._head = particle;
      this._tail = particle;
    }

    this._count++;

    if (particle.group !== undefined) {
      this._groupCounts.set(particle.group, (this._groupCounts.get(particle.group) ?? empty) + groupIncrement);
    }
  }

  /**
   * @param particle -
   */
  private _removeFromZLayer(particle: Particle): void {
    const layer = this._zLayersData.get(particle.currentZIndex);

    if (!layer) {
      return;
    }

    layer.delete(particle);

    if (layer.size === empty) {
      this._zLayersData.delete(particle.currentZIndex);
      this._sortedZKeys = this._sortedZKeys.filter(z => z !== particle.currentZIndex);
    }
  }

  /**
   * @param particle -
   * @param override -
   */
  private _removeNode(particle: Particle, override?: boolean): void {
    particle.destroy(override);
  }

  /**
   * @param particle -
   */
  private _updateZLayer(particle: Particle): void {
    const z = Math.floor(particle.position.z);

    if (z === particle.currentZIndex) {
      return;
    }

    this._removeFromZLayer(particle);
    this._addToZLayer(particle);
  }
}
