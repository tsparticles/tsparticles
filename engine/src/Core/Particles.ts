import { getLogger, getPosition } from "../Utils/Utils.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { ICoordinates } from "./Interfaces/ICoordinates.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IMouseData } from "./Interfaces/IMouseData.js";
import type { IParticleMover } from "./Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { InteractionManager } from "./Utils/InteractionManager.js";
import { LimitMode } from "../Enums/Modes/LimitMode.js";
import { Particle } from "./Particle.js";
import { Point } from "./Utils/Point.js";
import { QuadTree } from "./Utils/QuadTree.js";
import { Rectangle } from "./Utils/Ranges.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { errorPrefix } from "./Utils/Constants.js";

const qTreeCapacity = 4,
    squareExp = 2,
    defaultRemoveQuantity = 1;

const qTreeRectangle = (canvasSize: IDimension): Rectangle => {
    const { height, width } = canvasSize,
        posOffset = -0.25,
        sizeFactor = 1.5;

    return new Rectangle(posOffset * width, posOffset * height, sizeFactor * width, sizeFactor * height);
};

/**
 * Particles manager object
 */
export class Particles {
    movers: IParticleMover[];

    /**
     * The quad tree used to search particles withing ranges
     */
    quadTree;

    updaters: IParticleUpdater[];

    /**
     * All the particles used in canvas
     */
    private _array: Particle[];
    private readonly _container: Container;
    private readonly _engine;
    private readonly _groupLimits: Map<string, number>;
    private readonly _interactionManager;
    private _lastZIndex;
    private _limit;
    private _needsSort;
    private _nextId;
    private _pluginsInitialized;
    private readonly _pool: Particle[];
    private _resizeFactor?: IDimension;
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
        this._lastZIndex = 0;
        this._interactionManager = new InteractionManager(engine, container);
        this._pluginsInitialized = false;

        const canvasSize = container.canvas.size;

        this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);

        this.movers = [];
        this.updaters = [];
    }

    get count(): number {
        return this._array.length;
    }

    addManualParticles(): void {
        const container = this._container,
            options = container.actualOptions;

        for (const particle of options.manualParticles) {
            this.addParticle(
                particle.position ? getPosition(particle.position, container.canvas.size) : undefined,
                particle.options,
            );
        }
    }

    addParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
        initializer?: (particle: Particle) => boolean,
    ): Particle | undefined {
        const limitOptions = this._container.actualOptions.particles.number.limit,
            limit = group === undefined ? this._limit : this._groupLimits.get(group) ?? this._limit,
            currentCount = this.count,
            minLimit = 0;

        if (limit > minLimit) {
            if (limitOptions.mode === LimitMode.delete) {
                const countOffset = 1,
                    minCount = 0,
                    countToRemove = currentCount + countOffset - limit;

                if (countToRemove > minCount) {
                    this.removeQuantity(countToRemove);
                }
            } else if (limitOptions.mode === LimitMode.wait) {
                if (currentCount >= limit) {
                    return;
                }
            }
        }

        return this._pushParticle(position, overrideOptions, group, initializer);
    }

    /**
     * Removes all particles from the array
     */
    clear(): void {
        this._array = [];
        this._zArray = [];
        this._pluginsInitialized = false;
    }

    destroy(): void {
        this._array = [];
        this._zArray = [];
        this.movers = [];
        this.updaters = [];
    }

    draw(delta: IDelta): void {
        const container = this._container,
            canvas = container.canvas;

        /* clear canvas */
        canvas.clear();

        /* update each particle before drawing */
        this.update(delta);

        /* draw polygon shape in debug mode */
        for (const [, plugin] of container.plugins) {
            canvas.drawPlugin(plugin, delta);
        }

        /* container.canvas.draw((ctx) => {
            this.quadTree.draw(ctx);
        }); */

        /* draw each particle */
        for (const p of this._zArray) {
            p.draw(delta);
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

    handleClickMode(mode: string): void {
        this._interactionManager.handleClickMode(mode);
    }

    /* --------- tsParticles functions - particles ----------- */
    async init(): Promise<void> {
        const container = this._container,
            options = container.actualOptions;

        this._lastZIndex = 0;
        this._needsSort = false;

        await this.initPlugins();

        let handled = false;

        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }

            if (handled) {
                break;
            }
        }

        this.addManualParticles();

        if (!handled) {
            const particlesOptions = options.particles,
                groups = particlesOptions.groups;

            for (const group in groups) {
                const groupOptions = groups[group];

                for (
                    let i = this.count, j = 0;
                    j < groupOptions.number?.value && i < particlesOptions.number.value;
                    i++, j++
                ) {
                    this.addParticle(undefined, groupOptions, group);
                }
            }

            for (let i = this.count; i < particlesOptions.number.value; i++) {
                this.addParticle();
            }
        }
    }

    async initPlugins(): Promise<void> {
        if (this._pluginsInitialized) {
            return;
        }

        const container = this._container;

        this.movers = await this._engine.getMovers(container, true);
        this.updaters = await this._engine.getUpdaters(container, true);
        await this._interactionManager.init();

        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.init(container);
        }
    }

    push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticlesOptions>, group?: string): void {
        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions, group);
        }
    }

    async redraw(): Promise<void> {
        this.clear();
        await this.init();

        this.draw({ value: 0, factor: 0 });
    }

    remove(particle: Particle, group?: string, override?: boolean): void {
        this.removeAt(this._array.indexOf(particle), undefined, group, override);
    }

    removeAt(index: number, quantity = defaultRemoveQuantity, group?: string, override?: boolean): void {
        const minIndex = 0;

        if (index < minIndex || index > this.count) {
            return;
        }

        let deleted = 0;

        for (let i = index; deleted < quantity && i < this.count; i++) {
            if (this._removeParticle(i--, group, override)) {
                deleted++;
            }
        }
    }

    removeQuantity(quantity: number, group?: string): void {
        const defaultIndex = 0;

        this.removeAt(defaultIndex, quantity, group);
    }

    setDensity(): void {
        const options = this._container.actualOptions,
            groups = options.particles.groups,
            manualCount = 0;

        for (const group in groups) {
            this._applyDensity(groups[group], manualCount, group);
        }

        this._applyDensity(options.particles, options.manualParticles.length);
    }

    setLastZIndex(zIndex: number): void {
        this._lastZIndex = zIndex;
        this._needsSort = this._needsSort || this._lastZIndex < zIndex;
    }

    setResizeFactor(factor: IDimension): void {
        this._resizeFactor = factor;
    }

    update(delta: IDelta): void {
        const container = this._container,
            particlesToDelete = new Set<Particle>();

        this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);

        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.update();
        }

        for (const [, plugin] of container.plugins) {
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

            this._interactionManager.reset(particle);

            for (const [, plugin] of this._container.plugins) {
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

            this.quadTree.insert(new Point(particle.getPosition(), particle));
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

        this._interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of this._array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }

            if (!particle.destroyed && !particle.spawning) {
                this._interactionManager.particlesInteract(particle, delta);
            }
        }

        delete this._resizeFactor;

        if (this._needsSort) {
            const zArray = this._zArray;

            zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);

            const lengthOffset = 1;

            this._lastZIndex = zArray[zArray.length - lengthOffset].position.z;
            this._needsSort = false;
        }
    }

    private readonly _addToPool: (...particles: Particle[]) => void = (...particles) => {
        for (const particle of particles) {
            this._pool.push(particle);
        }
    };

    private readonly _applyDensity = (options: IParticlesOptions, manualCount: number, group?: string): void => {
        const numberOptions = options.number;

        if (!options.number.density?.enable) {
            if (group === undefined) {
                this._limit = numberOptions.limit.value;
            } else if (numberOptions.limit) {
                this._groupLimits.set(group, numberOptions.limit.value);
            }

            return;
        }

        const densityFactor = this._initDensityFactor(numberOptions.density),
            optParticlesNumber = numberOptions.value,
            minLimit = 0,
            optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
            particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
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
        const container = this._container,
            defaultFactor = 1;

        if (!container.canvas.element || !densityOptions.enable) {
            return defaultFactor;
        }

        const canvas = container.canvas.element,
            pxRatio = container.retina.pixelRatio;

        return (canvas.width * canvas.height) / (densityOptions.height * densityOptions.width * pxRatio ** squareExp);
    };

    private readonly _pushParticle = (
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
        initializer?: (particle: Particle) => boolean,
    ): Particle | undefined => {
        try {
            let particle = this._pool.pop();

            if (!particle) {
                particle = new Particle(this._engine, this._container);
            }

            particle.init(this._nextId, position, overrideOptions, group);

            let canAdd = true;

            if (initializer) {
                canAdd = initializer(particle);
            }

            if (!canAdd) {
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
            getLogger().warning(`${errorPrefix} adding particle: ${e as string}`);
        }
    };

    private readonly _removeParticle: (index: number, group?: string, override?: boolean) => boolean = (
        index,
        group,
        override,
    ) => {
        const particle = this._array[index];

        if (!particle || particle.group !== group) {
            return false;
        }

        const zIdx = this._zArray.indexOf(particle),
            deleteCount = 1;

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
