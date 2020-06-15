import { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/IRgb";
import { Particle } from "./Particle";
import { Point, QuadTree, Rectangle, Utils } from "../Utils";
import { RecursivePartial } from "../Types/RecursivePartial";
import { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { InteractionManager } from "./Particle/InteractionManager";

/**
 * Particles manager
 */
export class Particles {
    public get count(): number {
        return this.array.length;
    }

    public array: Particle[];
    public quadTree: QuadTree;
    //public spatialGrid: SpatialGrid;
    public pushing?: boolean;
    public linksColor?: IRgb | string;
    public linksColors: { [key: string]: IRgb | string | undefined };
    public grabLineColor?: IRgb | string;

    private interactionManager: InteractionManager;

    constructor(private readonly container: Container) {
        this.array = [];
        this.interactionManager = new InteractionManager(container);
        //this.spatialGrid = new SpatialGrid(this.container.canvas.size);
        const canvasSize = this.container.canvas.size;
        this.linksColors = {};

        this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
    }

    /* --------- tsParticles functions - particles ----------- */
    public init(): void {
        const container = this.container;
        const options = container.options;
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
                const notInfected = this.array.filter((p) => p.infectionStage === undefined);
                const infected = Utils.itemFromArray(notInfected);

                infected.startInfection(0);
            }
        }

        this.interactionManager.init();

        container.noise.init();
    }

    public redraw(): void {
        this.clear();
        this.init();
        this.draw(0);
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

    public update(delta: number): void {
        const container = this.container;
        const particlesToDelete = [];

        container.noise.update();

        for (const particle of this.array) {
            particle.bubble.inRange = false;

            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            for (const [, plugin] of container.plugins) {
                if (particle.destroyed) {
                    break;
                }

                if (plugin.particleUpdate) {
                    plugin.particleUpdate(particle, delta);
                }
            }

            if (!particle.destroyed) {
                particle.update(delta);
            }

            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }

            //container.particles.spatialGrid.insert(particle);

            this.quadTree.insert(new Point(particle.getPosition(), particle));
        }

        for (const particle of particlesToDelete) {
            this.remove(particle);
        }

        this.interactionManager.interact(delta);
    }

    public draw(delta: number): void {
        const container = this.container;

        /* clear canvas */
        container.canvas.clear();

        const canvasSize = this.container.canvas.size;

        this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);

        /* update each particles param */
        //this.spatialGrid.init(this.container.canvas.size);
        this.update(delta);
        //this.spatialGrid.setGrid(this.array, this.container.canvas.size);

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
    public push(nb: number, mousePosition?: IMouseData): void {
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

        let pos: ICoordinates | undefined;

        if (mousePosition) {
            pos = mousePosition.position ?? { x: 0, y: 0 };
        }

        for (let i = 0; i < nb; i++) {
            this.addParticle(pos);
        }

        if (!options.particles.move.enable) {
            this.container.play();
        }

        this.pushing = false;
    }

    public addParticle(position?: ICoordinates, overrideOptions?: RecursivePartial<IParticles>): Particle {
        const particle = new Particle(this.container, position, overrideOptions);

        this.array.push(particle);

        return particle;
    }

    public removeQuantity(quantity: number): void {
        const options = this.container.options;

        this.removeAt(0, quantity);

        if (!options.particles.move.enable) {
            this.container.play();
        }
    }
}
