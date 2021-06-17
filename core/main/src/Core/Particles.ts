import type { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/Colors";
import { Particle } from "./Particle";
import { NumberUtils, Point, QuadTree, Rectangle, Utils } from "../Utils";
import type { RecursivePartial } from "../Types";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { InteractionManager } from "./Particle/InteractionManager";
import type { IDelta } from "./Interfaces/IDelta";
import type { IParticle } from "./Interfaces/IParticle";
import { IDensity } from "../Options/Interfaces/Particles/Number/IDensity";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";

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

    /**
     * All the particles used in canvas
     */
    array: Particle[];

    pushing?: boolean;
    linksColor?: IRgb | string;
    grabLineColor?: IRgb | string;

    private interactionManager;
    private nextId;
    private linksFreq;
    private trianglesFreq;

    constructor(private readonly container: Container) {
        this.nextId = 0;
        this.array = [];
        this.limit = 0;
        this.linksFreq = new Map<string, number>();
        this.trianglesFreq = new Map<string, number>();
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
    }

    /* --------- tsParticles functions - particles ----------- */
    init(): void {
        const container = this.container;
        const options = container.actualOptions;

        this.linksFreq = new Map<string, number>();
        this.trianglesFreq = new Map<string, number>();

        let handled = false;

        for (const particle of options.manualParticles) {
            const pos = particle.position
                ? {
                      x: (particle.position.x * container.canvas.size.width) / 100,
                      y: (particle.position.y * container.canvas.size.height) / 100,
                  }
                : undefined;

            this.addParticle(pos, particle.options);
        }

        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }

            if (handled) {
                break;
            }
        }

        if (!handled) {
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }

        if (options.infection.enable) {
            for (let i = 0; i < options.infection.infections; i++) {
                const notInfected = this.array.filter((p) => p.infecter.infectionStage === undefined);
                const infected = Utils.itemFromArray(notInfected);

                infected.infecter.startInfection(0);
            }
        }

        this.interactionManager.init();

        container.pathGenerator.init();
    }

    redraw(): void {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }

    removeAt(index: number, quantity?: number, override?: boolean): void {
        if (index >= 0 && index <= this.count) {
            for (const particle of this.array.splice(index, quantity ?? 1)) {
                particle.destroy(override);
            }
        }
    }

    remove(particle: Particle, override?: boolean): void {
        this.removeAt(this.array.indexOf(particle), undefined, override);
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

            const resizeFactor = this.container.canvas.resizeFactor;

            if (resizeFactor) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
            }

            particle.move(delta);

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
        for (const particle of this.container.particles.array) {
            particle.update(delta);

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

        /* draw polygon shape in debug mode */
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }

        /*if (container.canvas.context) {
            this.quadTree.draw(container.canvas.context);
        }*/

        /* draw each particle */
        for (const p of this.array) {
            p.draw(delta);
        }
    }

    /**
     * Removes all particles from the array
     */
    clear(): void {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticles>): void {
        const container = this.container;
        const options = container.actualOptions;
        const limit = options.particles.number.limit * container.density;

        this.pushing = true;

        if (limit > 0) {
            const countToRemove = this.count + nb - limit;

            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }

        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions);
        }

        this.pushing = false;
    }

    addParticle(position?: ICoordinates, overrideOptions?: RecursivePartial<IParticles>): Particle | undefined {
        return this.pushParticle(position, overrideOptions);
    }

    addSplitParticle(parent: Particle): Particle | undefined {
        const splitOptions = parent.options.destroy.split;
        const options = new ParticlesOptions();

        options.load(parent.options);

        const factor = NumberUtils.getRangeValue(splitOptions.factor.value);

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

        const offset = splitOptions.sizeOffset ? NumberUtils.setRangeValue(-parent.size.value, parent.size.value) : 0;

        const position = {
            x: parent.position.x + NumberUtils.randomInRange(offset),
            y: parent.position.y + NumberUtils.randomInRange(offset),
        };

        return this.pushParticle(position, options, (particle) => {
            if (particle.size.value < 0.5) {
                return false;
            }

            particle.velocity.length = NumberUtils.randomInRange(
                NumberUtils.setRangeValue(parent.velocity.length, particle.velocity.length)
            );
            particle.splitCount = parent.splitCount + 1;
            particle.unbreakable = true;

            setTimeout(() => {
                particle.unbreakable = false;
            }, 500);

            return true;
        });
    }

    removeQuantity(quantity: number): void {
        this.removeAt(0, quantity);
    }

    getLinkFrequency(p1: IParticle, p2: IParticle): number {
        const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;

        let res = this.linksFreq.get(key);

        if (res === undefined) {
            res = Math.random();

            this.linksFreq.set(key, res);
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

        let res = this.trianglesFreq.get(key);

        if (res === undefined) {
            res = Math.random();

            this.trianglesFreq.set(key, res);
        }

        return res;
    }

    setDensity(): void {
        this.applyDensity(this.container.actualOptions.particles);
    }

    private applyDensity(options: IParticles) {
        if (!options.number.density?.enable) {
            return;
        }

        const numberOptions = options.number;
        const densityFactor = this.initDensityFactor(numberOptions.density);
        const optParticlesNumber = numberOptions.value;
        const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
        const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor;
        const particlesCount = this.count;

        this.limit = numberOptions.limit * densityFactor;

        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options);
        } else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber);
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
        initializer?: (particle: Particle) => boolean
    ): Particle | undefined {
        try {
            const particle = new Particle(this.nextId, this.container, position, overrideOptions);

            let canAdd = true;

            if (initializer) {
                canAdd = initializer(particle);
            }

            if (!canAdd) {
                return;
            }

            this.array.push(particle);

            this.nextId++;

            return particle;
        } catch (e) {
            console.warn(`error adding particle: ${e}`);

            return;
        }
    }
}
