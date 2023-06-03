import type { ClickMode } from "../Enums/Modes/ClickMode";
import type { Container } from "./Container";
import type { Engine } from "../engine";
import { EventType } from "../Enums/Types/EventType";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IDelta } from "./Interfaces/IDelta";
import type { IDimension } from "./Interfaces/IDimension";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import { InteractionManager } from "./Utils/InteractionManager";
import { Particle } from "./Particle";
import { Point } from "./Utils/Point";
import { QuadTree } from "./Utils/QuadTree";
import { Rectangle } from "./Utils/Rectangle";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { SizeMode } from "../Enums/Modes/SizeMode";
import { calcPositionFromSize } from "../Utils/NumberUtils";
import { errorPrefix } from "./Utils/Constants";

const qTreeCapacity = 4;

const qTreeRectangle = (canvasSize: IDimension): Rectangle => {
    return new Rectangle(
        -canvasSize.width / 4,
        -canvasSize.height / 4,
        (canvasSize.width * 3) / 2,
        (canvasSize.height * 3) / 2
    );
};

/**
 * Particles manager object
 */
export class Particles {
    lastZIndex;
    limit;
    movers;
    needsSort;

    pool: Particle[];

    pushing?: boolean;

    /**
     * The quad tree used to search particles withing ranges
     */
    quadTree;

    updaters;

    /**
     * All the particles used in canvas
     */
    private _array: Particle[];

    private readonly _container: Container;
    private readonly _engine;

    private readonly _interactionManager;
    private _nextId;

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
        this.pool = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this._interactionManager = new InteractionManager(this._engine, this._container);

        const canvasSize = this._container.canvas.size;

        this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);

        this.movers = this._engine.plugins.getMovers(this._container, true);
        this.updaters = this._engine.plugins.getUpdaters(this._container, true);
    }

    get count(): number {
        return this._array.length;
    }

    addManualParticles(): void {
        const container = this._container,
            options = container.actualOptions;

        for (const particle of options.manualParticles) {
            this.addParticle(
                particle.position
                    ? particle.position.mode === SizeMode.precise
                        ? particle.position
                        : calcPositionFromSize({
                              size: container.canvas.size,
                              position: particle.position,
                          })
                    : undefined,
                particle.options
            );
        }
    }

    addParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
        initializer?: (particle: Particle) => boolean
    ): Particle | undefined {
        const container = this._container,
            options = container.actualOptions,
            limit = options.particles.number.limit;

        if (limit > 0) {
            const countToRemove = this.count + 1 - limit;

            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
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
    }

    destroy(): void {
        this._array = [];
        this._zArray = [];
        this.movers = [];
        this.updaters = [];
    }

    async draw(delta: IDelta): Promise<void> {
        const container = this._container,
            canvasSize = this._container.canvas.size;

        this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);

        /* clear canvas */
        container.canvas.clear();

        /* update each particles param */
        await this.update(delta);

        if (this.needsSort) {
            this._zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
            this.lastZIndex = this._zArray[this._zArray.length - 1].position.z;
            this.needsSort = false;
        }

        /* draw polygon shape in debug mode */
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }

        /*container.canvas.draw((ctx) => {
            this.quadTree.draw(ctx);
        });*/

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

    handleClickMode(mode: ClickMode | string): void {
        this._interactionManager.handleClickMode(mode);
    }

    /* --------- tsParticles functions - particles ----------- */
    init(): void {
        const container = this._container,
            options = container.actualOptions;

        this.lastZIndex = 0;
        this.needsSort = false;

        let handled = false;

        this.updaters = this._engine.plugins.getUpdaters(container, true);
        this._interactionManager.init();

        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }

            if (handled) {
                break;
            }
        }

        this._interactionManager.init();

        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.init(container);
        }

        this.addManualParticles();

        if (!handled) {
            for (const group in options.particles.groups) {
                const groupOptions = options.particles.groups[group];

                for (
                    let i = this.count, j = 0;
                    j < groupOptions.number?.value && i < options.particles.number.value;
                    i++, j++
                ) {
                    this.addParticle(undefined, groupOptions, group);
                }
            }

            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }
    }

    push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticlesOptions>, group?: string): void {
        this.pushing = true;

        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions, group);
        }

        this.pushing = false;
    }

    async redraw(): Promise<void> {
        this.clear();
        this.init();

        await this.draw({ value: 0, factor: 0 });
    }

    remove(particle: Particle, group?: string, override?: boolean): void {
        this.removeAt(this._array.indexOf(particle), undefined, group, override);
    }

    removeAt(index: number, quantity = 1, group?: string, override?: boolean): void {
        if (index < 0 || index > this.count) {
            return;
        }

        let deleted = 0;

        for (let i = index; deleted < quantity && i < this.count; i++) {
            const particle = this._array[i];

            if (!particle || particle.group !== group) {
                continue;
            }

            particle.destroy(override);

            this._array.splice(i--, 1);
            const zIdx = this._zArray.indexOf(particle);
            this._zArray.splice(zIdx, 1);
            this.pool.push(particle);

            deleted++;

            this._engine.dispatchEvent(EventType.particleRemoved, {
                container: this._container,
                data: {
                    particle,
                },
            });
        }
    }

    removeQuantity(quantity: number, group?: string): void {
        this.removeAt(0, quantity, group);
    }

    setDensity(): void {
        const options = this._container.actualOptions,
            groups = options.particles.groups;

        for (const group in groups) {
            this._applyDensity(groups[group], 0, group);
        }

        this._applyDensity(options.particles, options.manualParticles.length);
    }

    async update(delta: IDelta): Promise<void> {
        const container = this._container,
            particlesToDelete = new Set<Particle>();

        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.update();
        }

        for (const [, plugin] of container.plugins) {
            plugin.update && plugin.update(delta);
        }

        for (const particle of this._array) {
            const resizeFactor = container.canvas.resizeFactor;

            if (resizeFactor && !particle.ignoresResizeRatio) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
                particle.initialPosition.x *= resizeFactor.width;
                particle.initialPosition.y *= resizeFactor.height;
            }

            particle.ignoresResizeRatio = false;

            await this._interactionManager.reset(particle);

            for (const [, plugin] of this._container.plugins) {
                if (particle.destroyed) {
                    break;
                }

                if (plugin.particleUpdate) {
                    plugin.particleUpdate(particle, delta);
                }
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

        this._array = this._array.filter((t) => !particlesToDelete.has(t));

        await this._interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of this._array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }

            if (!particle.destroyed && !particle.spawning) {
                await this._interactionManager.particlesInteract(particle, delta);
            }
        }

        delete container.canvas.resizeFactor;
    }

    private readonly _applyDensity: (options: IParticlesOptions, manualCount: number, group?: string) => void = (
        options,
        manualCount,
        group
    ) => {
        if (!options.number.density?.enable) {
            return;
        }

        const numberOptions = options.number,
            densityFactor = this._initDensityFactor(numberOptions.density),
            optParticlesNumber = numberOptions.value,
            optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber,
            particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
            particlesCount = Math.min(this.count, this._array.filter((t) => t.group === group).length);

        this.limit = numberOptions.limit * densityFactor;

        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        } else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber, group);
        }
    };

    private readonly _initDensityFactor: (densityOptions: IParticlesDensity) => number = (densityOptions) => {
        const container = this._container;

        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }

        const canvas = container.canvas.element,
            pxRatio = container.retina.pixelRatio;

        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    };

    private readonly _pushParticle: (
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
        initializer?: (particle: Particle) => boolean
    ) => Particle | undefined = (position, overrideOptions, group, initializer) => {
        try {
            let particle = this.pool.pop();

            if (particle) {
                particle.init(this._nextId, position, overrideOptions, group);
            } else {
                particle = new Particle(this._engine, this._nextId, this._container, position, overrideOptions, group);
            }

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
        } catch (e) {
            console.warn(`${errorPrefix} adding particle: ${e}`);

            return;
        }
    };
}
