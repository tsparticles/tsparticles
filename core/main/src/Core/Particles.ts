import type { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/Colors";
import { Particle } from "./Particle";
import { Point, QuadTree, Rectangle, Utils } from "../Utils";
import type { RecursivePartial } from "../Types";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { InteractionManager } from "./Particle/InteractionManager";
import type { IDelta } from "./Interfaces/IDelta";
import type { IParticle } from "./Interfaces/IParticle";

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

        container.noise.init();
    }

    public redraw(): void {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }

    public removeAt(index: number, quantity?: number): void {
        if (index >= 0 && index <= this.count) {
            for (const particle of this.array.splice(index, quantity ?? 1)) {
                particle.destroy();
            }
        }
    }

    public remove(particle: Particle): void {
        this.removeAt(this.array.indexOf(particle));
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
    public push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticles>): void {
        const container = this.container;
        const options = container.options;
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

        if (!options.particles.move.enable) {
            this.container.play();
        }

        this.pushing = false;
    }

    public addParticle(position?: ICoordinates, overrideOptions?: RecursivePartial<IParticles>): Particle | undefined {
        try {
            const particle = new Particle(this.nextId, this.container, position, overrideOptions);

            this.array.push(particle);

            this.nextId++;

            return particle;
        } catch {
            console.warn("error adding particle");

            return;
        }
    }

    public removeQuantity(quantity: number): void {
        const options = this.container.options;

        this.removeAt(0, quantity);

        if (!options.particles.move.enable) {
            this.container.play();
        }
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
}
