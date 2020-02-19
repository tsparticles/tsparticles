"use strict";

import {Container} from "./Container";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {IMouseData} from "../Interfaces/IMouseData";
import {IRgb} from "../Interfaces/IRgb";
import {Particle} from "./Particle";

export class Particles {
    public array: Particle[];
    public pushing?: boolean;
    public lineLinkedColor?: IRgb | null;

    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
        this.array = [];
    }

    /* --------- tsParticles functions - particles ----------- */
    public init(): void {
        const container = this.container;
        const options = container.options;

        for (let i = this.array.length; i < options.particles.number.value; i++) {
            const p = new Particle(container);

            this.array.push(p);
        }
    }

    public update(delta: number): void {
        const container = this.container;
        const options = container.options;
        const arrLength = this.array.length;

        for (let i = 0; i < arrLength; i++) {
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

            p.update(delta);

            /* interaction auto between particles */
            if (options.particles.line_linked.enable || options.particles.move.attract.enable) {
                for (let j = i + 1; j < arrLength; j++) {
                    const p2 = this.array[j];

                    p.interact(p2);
                }
            }
        }
    }

    public draw(delta: number): void {
        const container = this.container;

        /* clear canvas */
        container.canvas.clear();

        /* update each particles param */
        this.update(delta);

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

        let pos: ICoordinates | undefined;

        if (mousePosition) {
            pos = mousePosition.position || {x: 0, y: 0};
        }

        for (let i = 0; i < nb; i++) {
            const p = new Particle(container, pos);

            this.array.push(p);
        }

        if (!options.particles.move.enable) {
            this.draw(0);
        }

        this.pushing = false;
    }

    public remove(nb: number): void {
        const container = this.container;
        const options = container.options;

        this.array.splice(0, nb);

        if (!options.particles.move.enable) {
            this.draw(0);
        }
    }
}
