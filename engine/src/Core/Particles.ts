import type { Container } from "./Container";
import { Particle } from "./Particle";
import {
    getRangeValue,
    itemFromArray,
    Plugins,
    Point,
    QuadTree,
    randomInRange,
    Rectangle,
    setRangeValue,
} from "../Utils";
import type { RecursivePartial } from "../Types";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { InteractionManager } from "./InteractionManager";
import type { IDensity } from "../Options/Interfaces/Particles/Number/IDensity";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import type { ICoordinates, IDelta, IMouseData, IParticle, IRgb } from "./Interfaces";
import { Mover } from "./Particle/Mover";
import { IParticlesFrequencies } from "./Interfaces/IParticlesFrequencies";
import { ClickMode } from "../Enums";

/**
 * Particles manager object
 * @category Core
 */
export class Particles {
    get count(): number {
        return this.array.length;
    }

    /**
     * The quad tree used to search particles withing ranges
     */
    quadTree;
    linksColors;
    limit;
    needsSort;
    lastZIndex;

    /**
     * All the particles used in canvas
     */
    array: Particle[];
    zArray: Particle[];

    pushing?: boolean;
    linksColor?: IRgb | string;
    grabLineColor?: IRgb | string;

    readonly updaters;

    private interactionManager;
    private nextId;
    private readonly freqs: IParticlesFrequencies;
    private readonly mover;

    constructor(private readonly container: Container) {
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.mover = new Mover(container);
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.freqs = {
            links: new Map<string, number>(),
            triangles: new Map<string, number>(),
        };
        this.interactionManager = new InteractionManager(container);

        const canvasSize = this.container.canvas.size;

        this.linksColors = new Map<string, IRgb | string | undefined>();
        this.quadTree = new QuadTree(
            new Rectangle(
                -canvasSize.width / 4,
                -canvasSize.height / 4,
                (canvasSize.width * 3) / 2,
                (canvasSize.height * 3) / 2
            ),
            4
        );

        this.updaters = Plugins.getUpdaters(container);
    }

    /* --------- tsParticles functions - particles ----------- */
    init(): void {
        const container = this.container;
        const options = container.actualOptions;

        this.lastZIndex = 0;
        this.needsSort = false;
        this.freqs.links = new Map<string, number>();
        this.freqs.triangles = new Map<string, number>();

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

        container.pathGenerator.init(container);
    }

    redraw(): void {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }

    removeAt(index: number, quantity = 1, group?: string, override?: boolean): void {
        if (!(index >= 0 && index <= this.count)) {
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

            deleted++;
        }
    }

    remove(particle: Particle, group?: string, override?: boolean): void {
        this.removeAt(this.array.indexOf(particle), undefined, group, override);
    }

    update(delta: IDelta): void {
        const container = this.container;
        const particlesToDelete = [];

        container.pathGenerator.update();

        for (const [, plugin] of container.plugins) {
            if (plugin.update !== undefined) {
                plugin.update(delta);
            }
        }

        for (const particle of this.array) {
            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            const resizeFactor = container.canvas.resizeFactor;

            if (resizeFactor) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
            }

            particle.bubble.inRange = false;

            for (const [, plugin] of this.container.plugins) {
                if (particle.destroyed) {
                    break;
                }

                if (plugin.particleUpdate) {
                    plugin.particleUpdate(particle, delta);
                }
            }

            this.mover.move(particle, delta);

            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }

            this.quadTree.insert(new Point(particle.getPosition(), particle));
        }

        for (const particle of particlesToDelete) {
            this.remove(particle);
        }

        this.interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of container.particles.array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }

            if (!particle.destroyed && !particle.spawning) {
                this.interactionManager.particlesInteract(particle, delta);
            }
        }

        delete container.canvas.resizeFactor;
    }

    draw(delta: IDelta): void {
        const container = this.container;

        /* clear canvas */
        container.canvas.clear();

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

        /* update each particles param */
        this.update(delta);

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

    /**
     * Removes all particles from the array
     */
    clear(): void {
        this.array = [];
        this.zArray = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticles>, group?: string): void {
        this.pushing = true;

        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions, group);
        }

        this.pushing = false;
    }

    addParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        group?: string
    ): Particle | undefined {
        const container = this.container;
        const options = container.actualOptions;
        const limit = options.particles.number.limit * container.density;

        if (limit > 0) {
            const countToRemove = this.count + 1 - limit;

            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }

        return this.pushParticle(position, overrideOptions, group);
    }

    addSplitParticle(parent: Particle): Particle | undefined {
        const splitOptions = parent.options.destroy.split;
        const options = new ParticlesOptions();

        options.load(parent.options);

        const factor = getRangeValue(splitOptions.factor.value);

        options.color.load({
            value: {
                hsl: parent.getFillColor(),
            },
        });

        if (typeof options.size.value === "number") {
            options.size.value /= factor;
        } else {
            options.size.value.min /= factor;
            options.size.value.max /= factor;
        }

        options.load(splitOptions.particles);

        const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0;

        const position = {
            x: parent.position.x + randomInRange(offset),
            y: parent.position.y + randomInRange(offset),
        };

        return this.pushParticle(position, options, parent.group, (particle) => {
            if (particle.size.value < 0.5) {
                return false;
            }

            particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
            particle.splitCount = parent.splitCount + 1;
            particle.unbreakable = true;

            setTimeout(() => {
                particle.unbreakable = false;
            }, 500);

            return true;
        });
    }

    removeQuantity(quantity: number, group?: string): void {
        this.removeAt(0, quantity, group);
    }

    getLinkFrequency(p1: IParticle, p2: IParticle): number {
        const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;

        let res = this.freqs.links.get(key);

        if (res === undefined) {
            res = Math.random();

            this.freqs.links.set(key, res);
        }

        return res;
    }

    getTriangleFrequency(p1: IParticle, p2: IParticle, p3: IParticle): number {
        let [id1, id2, id3] = [p1.id, p2.id, p3.id];

        if (id1 > id2) {
            [id2, id1] = [id1, id2];
        }

        if (id2 > id3) {
            [id3, id2] = [id2, id3];
        }

        if (id1 > id3) {
            [id3, id1] = [id1, id3];
        }

        const key = `${id1}_${id2}_${id3}`;

        let res = this.freqs.triangles.get(key);

        if (res === undefined) {
            res = Math.random();

            this.freqs.triangles.set(key, res);
        }

        return res;
    }

    addManualParticles(): void {
        const container = this.container;
        const options = container.actualOptions;

        for (const particle of options.manualParticles) {
            const pos = particle.position
                ? {
                      x: (particle.position.x * container.canvas.size.width) / 100,
                      y: (particle.position.y * container.canvas.size.height) / 100,
                  }
                : undefined;

            this.addParticle(pos, particle.options);
        }
    }

    setDensity(): void {
        const options = this.container.actualOptions;

        for (const group in options.particles.groups) {
            this.applyDensity(options.particles.groups[group], 0, group);
        }

        this.applyDensity(options.particles, options.manualParticles.length);
    }

    handleClickMode(mode: ClickMode | string) {
        this.interactionManager.handleClickMode(mode);
    }

    private applyDensity(options: IParticles, manualCount: number, group?: string) {
        if (!options.number.density?.enable) {
            return;
        }

        const numberOptions = options.number;
        const densityFactor = this.initDensityFactor(numberOptions.density);
        const optParticlesNumber = numberOptions.value;
        const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
        const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount;
        const particlesCount = Math.min(this.count, this.array.filter((t) => t.group === group).length);

        this.limit = numberOptions.limit * densityFactor;

        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        } else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber, group);
        }
    }

    private initDensityFactor(densityOptions: IDensity): number {
        const container = this.container;

        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }

        const canvas = container.canvas.element;
        const pxRatio = container.retina.pixelRatio;

        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    }

    private pushParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        group?: string,
        initializer?: (particle: Particle) => boolean
    ): Particle | undefined {
        try {
            const particle = new Particle(this.nextId, this.container, position, overrideOptions, group);

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

            return particle;
        } catch (e) {
            console.warn(`error adding particle: ${e}`);

            return;
        }
    }
}
