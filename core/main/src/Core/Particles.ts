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

        this.interactionManager.init();

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

        for (let i = index; deleted < quantity && index < this.count; i++) {
            const particle = this.array[i];

            if (particle.group !== group) {
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

        // Repulse
        for (const p1 of this.array) {
            if (!p1.repulse.enabled) {
                continue;
            }
            const pos1 = p1.getPosition();

            const query = container.particles.quadTree.queryCircle(pos1, p1.repulse.distance * 2);

            for (const p2 of query) {
                if (p1 === p2 || p2.destroyed) {
                    continue;
                }

                const pos2 = p2.getPosition();
                const D = NumberUtils.getDistance(pos1, pos2);
                const d = D - p2.getRadius();
                const repulseDistanceFactor = ((p1.repulse.distance - d) / D) * p1.repulse.factor;

                if (D - p2.getRadius() < p1.repulse.distance) {
                    p2.moveXY((pos2.x - pos1.x) * repulseDistanceFactor, (pos2.y - pos1.y) * repulseDistanceFactor);
                }
            }
        }

        this.interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of this.container.particles.array) {
            particle.update(delta);

            if (!particle.destroyed && !particle.spawning) {
                this.interactionManager.particlesInteract(particle, delta);
            }
        }
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
        try {
            const particle = new Particle(this.nextId, this.container, position, overrideOptions, group);

            this.array.push(particle);
            this.array.sort((a, b) => a.zIndexFactor - b.zIndexFactor);

            this.nextId++;

            return particle;
        } catch {
            console.warn("error adding particle");

            return;
        }
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

    /**
     * Aligns particles number to the specified density in the current canvas size
     */
    public setDensity(): void {
        const options = this.container.options;

        this.applyDensity(options.particles);

        for (const group in options.particles.groups) {
            this.applyDensity(options.particles.groups[group], group);
        }
    }

    private applyDensity(options: IParticles, group?: string) {
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

        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio * pxRatio * densityOptions.area);
    }
}
