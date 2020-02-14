"use strict";

import { Particle } from "./particle";
import { Utils } from "../utils/utils";
import { Container } from "./container";
import { OutMode, HoverMode, ClickMode } from "../utils/enums";
import { IMouseData, IRgb } from "../utils/interfaces";

export class Particles {
    private container: Container;
    public array: Particle[];
    public pushing?: boolean;
    public line_linked_color?: IRgb | null;

    constructor(container: Container) {
        this.container = container;
        this.array = [];
    }

    /* --------- tsParticles functions - particles ----------- */
    public create() {
        let container = this.container;
        let options = container.options;

        for (let i = 0; i < options.particles.number.value; i++) {
            const p = new Particle(container, options.particles.color, options.particles.opacity.value);

            this.array.push(p);
        }
    }

    public update(delta: number) {
        let container = this.container;
        let options = container.options;
        const arrLength = this.array.length;

        for (let i = 0; i < arrLength; i++) {
            /* the particle */
            let p = this.array[i];
            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            /* move the particle */
            p.move(delta);

            /* parallax */
            p.moveParallax();

            /* change opacity status */
            p.updateOpacity();

            /* change size */
            p.updateSize();

            /* change particle position if it is out of canvas */
            p.fixOutOfCanvasPosition();

            /* out of canvas modes */
            p.updateOutMode();

            /* events */
            if (Utils.isInArray(HoverMode.grab, options.interactivity.events.onhover.mode)) {
                p.grab();
            }

            if (Utils.isInArray(HoverMode.bubble, options.interactivity.events.onhover.mode) || Utils.isInArray(ClickMode.bubble, options.interactivity.events.onclick.mode)) {
                p.bubble();
            }

            if (Utils.isInArray(HoverMode.repulse, options.interactivity.events.onhover.mode) || Utils.isInArray(ClickMode.repulse, options.interactivity.events.onclick.mode)) {
                p.repulse();
            }

            /* interaction auto between particles */
            if (options.particles.line_linked.enable || options.particles.move.attract.enable) {
                for (let j = i + 1; j < arrLength; j++) {
                    let p2 = this.array[j];

                    /* link particles */
                    if (options.particles.line_linked.enable) {
                        p.link(p2);
                    }

                    /* attract particles */
                    if (options.particles.move.attract.enable) {
                        p.attract(p2);
                    }

                    /* bounce particles */
                    if (options.particles.move.bounce) {
                        p.bounce(p2);
                    }
                }
            }
        }
    }

    public draw(delta: number) {
        let container = this.container;

        /* clear canvas */
        if (container.canvas.ctx)
            container.canvas.ctx.clearRect(0, 0, container.canvas.w, container.canvas.h);

        /* update each particles param */
        container.particles.update(delta);

        /* draw each particle */
        for (const p of this.array) {
            p.draw();
        }
    }

    public empty() {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    public push(nb: number, pos?: IMouseData) {
        const container = this.container;
        const options = container.options;

        this.pushing = true;

        for (let i = 0; i < nb; i++) {
            const p = new Particle(container, options.particles.color, options.particles.opacity.value, {
                x: pos && pos.pos_x ? pos.pos_x : Math.random() * container.canvas.w,
                y: pos && pos.pos_y ? pos.pos_y : Math.random() * container.canvas.h
            });

            this.array.push(p);
        }

        if (!options.particles.move.enable) {
            this.draw(0);
        }

        this.pushing = false;
    }

    public remove(nb: number) {
        const container = this.container;
        const options = container.options;

        this.array.splice(0, nb);

        if (!options.particles.move.enable) {
            this.draw(0);
        }
    }

    public async refresh() {
        let container = this.container;

        /* init all */
        if (container.checkAnimFrame)
            container.cancelAnimation(container.checkAnimFrame);

        if (container.drawAnimFrame)
            container.cancelAnimation(container.drawAnimFrame);

        container.svg.source = undefined;
        container.svg.count = 0;
        container.img.obj = undefined;

        this.empty();

        container.canvas.clear();

        delete container.particles.line_linked_color;

        /* restart */
        await container.start();
    }
}