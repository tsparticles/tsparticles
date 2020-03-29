import { Container } from "./Container";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IMouseData } from "../Interfaces/IMouseData";
import type { IRgb } from "../Interfaces/IRgb";
import { Particle } from "./Particle";
import { PolygonMaskType } from "../Enums/PolygonMaskType";
import { PolygonMaskInlineArrangement } from "../Enums/PolygonMaskInlineArrangement";

/**
 * Particles manager
 */
export class Particles {
    public get count(): number {
        return this.array.length;
    }

    public array: Particle[];
    public pushing?: boolean;
    public lineLinkedColor?: IRgb | string | null;

    private readonly container: Container;
    private interactionsEnabled: boolean;

    constructor(container: Container) {
        this.container = container;
        this.array = [];
        this.interactionsEnabled = false;
    }

    /* --------- tsParticles functions - particles ----------- */
    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline &&
            options.polygon.inline.arrangement === PolygonMaskInlineArrangement.onePerPoint) {
            container.polygon.drawPointsOnPolygonPath();
        } else {
            for (let i = this.array.length; i < options.particles.number.value; i++) {
                this.addParticle(new Particle(container));
            }
        }

        this.interactionsEnabled = options.particles.lineLinked.enable ||
            options.particles.move.attract.enable ||
            options.particles.move.collisions;
    }

    public removeAt(index: number, quantity?: number): void {
        if (index >= 0 && index <= this.count) {
            this.array.splice(index, quantity ?? 1);
        }
    }

    public remove(particle: Particle): void {
        this.removeAt(this.array.indexOf(particle));
    }

    public update(delta: number): void {
        for (let i = 0; i < this.array.length; i++) {
            /* the particle */
            const p = this.array[i];

            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            p.update(i, delta);

            /* interaction auto between particles */
            if (this.interactionsEnabled) {
                for (let j = i + 1; j < this.array.length; j++) {
                    const p2 = this.array[j];

                    p.interact(p2);
                }
            }
        }
    }

    public draw(delta: number): void {
        const container = this.container;
        const options = container.options;

        /* clear canvas */
        container.canvas.clear();

        /* update each particles param */
        this.update(delta);

        /* draw polygon shape in debug mode */
        if (options.polygon.enable && options.polygon.draw.enable) {
            container.polygon.drawPolygon();
        }

        /* draw each particle */
        for (const p of this.array) {
            p.draw();
        }
    }

    public clear(): void {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    public push(nb: number, mousePosition?: IMouseData): void {
        const container = this.container;
        const options = container.options;

        this.pushing = true;

        if (options.particles.number.limit > 0) {
            if ((this.array.length + nb) > options.particles.number.limit) {
                this.removeQuantity((this.array.length + nb) - options.particles.number.limit);
            }
        }

        let pos: ICoordinates | undefined;

        if (mousePosition) {
            pos = mousePosition.position || { x: 0, y: 0 };
        }

        for (let i = 0; i < nb; i++) {
            this.addParticle(new Particle(container, pos));
        }

        if (!options.particles.move.enable) {
            this.container.play();
        }

        this.pushing = false;
    }

    public addParticle(particle: Particle): void {
        this.array.push(particle);
    }

    public removeQuantity(quantity: number): void {
        const container = this.container;
        const options = container.options;

        this.removeAt(0, quantity);

        if (!options.particles.move.enable) {
            this.container.play();
        }
    }
}
