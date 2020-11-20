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
import type { IDensity } from "../Options/Interfaces/Particles/Number/IDensity";
import { Particles as ParticlesOptions } from "../Options/Classes/Particles/Particles";

/**
 * Particles manager object
 * @category Core
 */
export class Particles {
    public get count(): number {
        return this.array.length;
    }

    /**
     * The quad tree used to search particles withing ranges
     */
    public quadTree;
    public linksColors;
    public limit;

    /**
     * All the particles used in canvas
     */
    public array: Particle[];

    public pushing?: boolean;
    public linksColor?: IRgb | string;
    public grabLineColor?: IRgb | string;

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
    public init(): void {
        const container = this.container;
        const options = container.options;

        this.linksFreq = new Map<string, number>();
        this.trianglesFreq = new Map<string, number>();

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

        if (options.infection.enable) {
            for (let i = 0; i < options.infection.infections; i++) {
                const notInfected = this.array.filter((p) => p.infecter.infectionStage === undefined);
                const infected = Utils.itemFromArray(notInfected);

                infected.infecter.startInfection(0);
            }
        }

        container.noise.init();
    }

    public redraw(): void {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }

    public removeAt(index: number, quantity = 1, group?: string): void {
        if (!(index >= 0 && index <= this.count)) {
            return;
        }

        let deleted = 0;

        for (let i = index; deleted < quantity && i < this.count; i++) {
            const particle = this.array[i];

            if (!particle || particle.group !== group) {
                continue;
            }

            particle.destroy();

            this.array.splice(i--, 1);

            deleted++;
        }
    }

    public remove(particle: Particle, group?: string): void {
        this.removeAt(this.array.indexOf(particle), undefined, group);
    }

    public update(delta: IDelta): void {
        const container = this.container;
        const particlesToDelete = [];

        container.noise.update();

        for (const particle of this.array) {
            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

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

    public draw(delta: IDelta): void {
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

        this.array.sort((a, b) => b.position.z - a.position.z || a.id - b.id);

        /* draw each particle */
        for (const p of this.array) {
            p.draw(delta);
        }
    }

    /**
     * Removes all particles from the array
     */
    public clear(): void {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    public push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticles>, group?: string): void {
        this.pushing = true;

        if (this.limit > 0) {
            const countToRemove = this.count + nb - this.limit;

            if (countToRemove > 0) {
                this.removeQuantity(countToRemove, group);
            }
        }

        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions, group);
        }

        this.pushing = false;
    }

    public addParticle(
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        group?: string
    ): Particle | undefined {
        return this.pushParticle(position, overrideOptions, group);
    }

    public addSplitParticle(parent: Particle): Particle | undefined {
        const splitOptions = parent.options.destroy.split;
        const options = new ParticlesOptions();

        options.load(parent.options);

        const factor = NumberUtils.getValue(splitOptions.factor);

        options.color.load({
            value: {
                hsl: parent.color.value,
            },
        });

        options.size.value /= factor;
        options.size.random.minimumValue /= factor;
        options.size.animation.minimumValue /= factor;

        options.load(splitOptions.particles);

        const offset = parent.size.value;

        const position = {
            x: parent.position.x + NumberUtils.randomInRange(-offset, offset),
            y: parent.position.y + NumberUtils.randomInRange(-offset, offset),
        };

        return this.pushParticle(position, options, parent.group, (particle) => {
            if (particle.size.value < 0.5) {
                return false;
            }

            particle.splitCount = parent.splitCount + 1;
            particle.unbreaking = true;

            setTimeout(() => {
                particle.unbreaking = false;
            }, 500);

            return true;
        });
    }

    public removeQuantity(quantity: number, group?: string): void {
        this.removeAt(0, quantity, group);
    }

    public getLinkFrequency(p1: IParticle, p2: IParticle): number {
        const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;

        let res = this.linksFreq.get(key);

        if (res === undefined) {
            res = Math.random();

            this.linksFreq.set(key, res);
        }

        return res;
    }

    public getTriangleFrequency(p1: IParticle, p2: IParticle, p3: IParticle): number {
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

    public addManualParticles(): void {
        const container = this.container;
        const options = container.options;

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

    /**
     * Aligns particles number to the specified density in the current canvas size
     */
    public setDensity(): void {
        const options = this.container.options;

        for (const group in options.particles.groups) {
            this.applyDensity(options.particles.groups[group], 0, group);
        }

        this.applyDensity(options.particles, options.manualParticles.length);
    }

    private applyDensity(options: IParticles, manualCount: number, group?: string) {
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

        if (!container.canvas.element || !densityOptions?.enable) {
            return 1;
        }

        const canvas = container.canvas.element;
        const pxRatio = container.retina.pixelRatio;

        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio * pxRatio * densityOptions.area);
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

            this.nextId++;

            return particle;
        } catch (e) {
            console.warn(`error adding particle: ${e}`);

            return;
        }
    }
}
