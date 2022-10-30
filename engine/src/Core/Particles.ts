import type { ClickMode } from "../Enums/Modes/ClickMode";
import type { Container } from "./Container";
import type { Engine } from "../engine";
import { EventType } from "../Enums/Types/EventType";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IDelta } from "./Interfaces/IDelta";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IParticlesDensity } from "../Options/Interfaces/Particles/Number/IParticlesDensity";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import { InteractionManager } from "./Utils/InteractionManager";
import { Particle } from "./Particle";
import { Point } from "./Utils/Point";
import { QuadTree } from "./Utils/QuadTree";
import { Rectangle } from "./Utils/Rectangle";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { calcPositionFromSize } from "../Utils/NumberUtils";

/**
 * Particles manager object
 * @category Core
 */
export class Particles {
    /**
     * All the particles used in canvas
     */
    array: Particle[];

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

    zArray: Particle[];

    private readonly _engine;

    private readonly interactionManager;
    private nextId;

    constructor(engine: Engine, private readonly container: Container) {
        this._engine = engine;
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.pool = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.interactionManager = new InteractionManager(this._engine, container);

        const canvasSize = this.container.canvas.size;

        this.quadTree = new QuadTree(
            new Rectangle(
                -canvasSize.width / 4,
                -canvasSize.height / 4,
                (canvasSize.width * 3) / 2,
                (canvasSize.height * 3) / 2
            ),
            4
        );

        this.movers = this._engine.plugins.getMovers(container, true);
        this.updaters = this._engine.plugins.getUpdaters(container, true);
    }

    get count(): number {
        return this.array.length;
    }

    addManualParticles(): void {
        const container = this.container,
            options = container.actualOptions;

        for (const particle of options.manualParticles) {
            this.addParticle(
                calcPositionFromSize({
                    size: container.canvas.size,
                    position: particle.position,
                }),
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
        const container = this.container,
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
        this.array = [];
        this.zArray = [];
    }

    destroy(): void {
        this.array = [];
        this.zArray = [];
        this.movers = [];
        this.updaters = [];
    }

    async draw(delta: IDelta): Promise<void> {
        const container = this.container,
            canvasSize = this.container.canvas.size;

        this.quadTree = new QuadTree(
            new Rectangle(
                -canvasSize.width / 4,
                -canvasSize.height / 4,
                (canvasSize.width * 3) / 2,
                (canvasSize.height * 3) / 2
            ),
            4
        );

        /* clear canvas */
        container.canvas.clear();

        /* update each particles param */
        await this.update(delta);

        if (this.needsSort) {
            this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
            this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
            this.needsSort = false;
        }

        /* draw polygon shape in debug mode */
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }

        /*if (container.canvas.context) {
            this.quadTree.draw(container.canvas.context);
        }*/

        /* draw each particle */
        for (const p of this.zArray) {
            p.draw(delta);
        }
    }

    handleClickMode(mode: ClickMode | string): void {
        this.interactionManager.handleClickMode(mode);
    }

    /* --------- tsParticles functions - particles ----------- */
    init(): void {
        const container = this.container,
            options = container.actualOptions;

        this.lastZIndex = 0;
        this.needsSort = false;

        let handled = false;

        this.updaters = this._engine.plugins.getUpdaters(container, true);
        this.interactionManager.init();

        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }

            if (handled) {
                break;
            }
        }

        this.interactionManager.init();

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
        this.removeAt(this.array.indexOf(particle), undefined, group, override);
    }

    removeAt(index: number, quantity = 1, group?: string, override?: boolean): void {
        if (index < 0 || index > this.count) {
            return;
        }

        let deleted = 0;

        for (let i = index; deleted < quantity && i < this.count; i++) {
            const particle = this.array[i];

            if (!particle || particle.group !== group) {
                continue;
            }

            particle.destroy(override);

            this.array.splice(i--, 1);
            const zIdx = this.zArray.indexOf(particle);
            this.zArray.splice(zIdx, 1);
            this.pool.push(particle);

            deleted++;

            this._engine.dispatchEvent(EventType.particleRemoved, {
                container: this.container,
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
        const options = this.container.actualOptions;

        for (const group in options.particles.groups) {
            this._applyDensity(options.particles.groups[group], 0, group);
        }

        this._applyDensity(options.particles, options.manualParticles.length);
    }

    async update(delta: IDelta): Promise<void> {
        const container = this.container,
            particlesToDelete = [];

        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.update();
        }

        for (const [, plugin] of container.plugins) {
            plugin.update?.(delta);
        }

        for (const particle of this.array) {
            const resizeFactor = container.canvas.resizeFactor;

            if (resizeFactor && !particle.ignoresResizeRatio) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
                particle.initialPosition.x *= resizeFactor.width;
                particle.initialPosition.y *= resizeFactor.height;
            }

            particle.ignoresResizeRatio = false;

            await this.interactionManager.reset(particle);

            for (const [, plugin] of this.container.plugins) {
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
                particlesToDelete.push(particle);

                continue;
            }

            this.quadTree.insert(new Point(particle.getPosition(), particle));
        }

        for (const particle of particlesToDelete) {
            this.remove(particle);
        }

        await this.interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of this.array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }

            if (!particle.destroyed && !particle.spawning) {
                await this.interactionManager.particlesInteract(particle, delta);
            }
        }

        delete container.canvas.resizeFactor;
    }

    private _applyDensity(options: IParticlesOptions, manualCount: number, group?: string): void {
        if (!options.number.density?.enable) {
            return;
        }

        const numberOptions = options.number,
            densityFactor = this._initDensityFactor(numberOptions.density),
            optParticlesNumber = numberOptions.value,
            optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber,
            particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
            particlesCount = Math.min(this.count, this.array.filter((t) => t.group === group).length);

        this.limit = numberOptions.limit * densityFactor;

        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        } else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber, group);
        }
    }

    private _initDensityFactor(densityOptions: IParticlesDensity): number {
        const container = this.container;

        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }

        const canvas = container.canvas.element,
            pxRatio = container.retina.pixelRatio;

        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    }

    private _pushParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
        initializer?: (particle: Particle) => boolean
    ): Particle | undefined {
        try {
            let particle = this.pool.pop();

            if (particle) {
                particle.init(this.nextId, position, overrideOptions, group);
            } else {
                particle = new Particle(this._engine, this.nextId, this.container, position, overrideOptions, group);
            }

            let canAdd = true;

            if (initializer) {
                canAdd = initializer(particle);
            }

            if (!canAdd) {
                return;
            }

            this.array.push(particle);
            this.zArray.push(particle);

            this.nextId++;

            this._engine.dispatchEvent(EventType.particleAdded, {
                container: this.container,
                data: {
                    particle,
                },
            });

            return particle;
        } catch (e) {
            console.warn(`error adding particle: ${e}`);

            return;
        }
    }
}
