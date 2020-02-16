"use strict";

import { Constants } from "../utils/constants";
import { Container } from "./container";
import { ICoordinates } from "../utils/interfaces";

export class Canvas {
    public el: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D | null;
    public w: number;
    public h: number;
    public tagId: string;
    public pxratio: number

    private readonly container: Container;

    constructor(container: Container, tagId: string) {
        const canvasEl = document.querySelector(`#${tagId} > .${Constants.canvasClass}`) as HTMLCanvasElement;

        this.container = container;
        this.el = canvasEl;
        this.w = canvasEl.offsetWidth;
        this.h = canvasEl.offsetHeight;
        this.tagId = tagId;
        this.pxratio = 1;
        this.ctx = this.el.getContext("2d");
    }

    /* ---------- tsParticles functions - canvas ------------ */
    public init(): void {
        // TODO: Moved in the constructor, check if it"s fine there
        // this.ctx = this.el.getContext("2d");
    }

    public size(): void {
        const container = this.container;
        const options = container.options;

        this.el.width = this.w;
        this.el.height = this.h;

        if (options.interactivity.events.resize) {
            window.addEventListener("resize", () => {
                this.w = this.el.offsetWidth;
                this.h = this.el.offsetHeight;

                /* resize canvas */
                if (container.retina.isRetina) {
                    this.w *= this.pxratio;
                    this.h *= this.pxratio;
                }

                this.el.width = this.w;
                this.el.height = this.h;

                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    container.particles.empty();
                    container.particles.create();
                    container.particles.draw(0);
                    // TODO: seems double code, check if it works without it
                    // container.densityAutoParticles();
                }

                /* density particles enabled */
                container.densityAutoParticles();
            });
        }
    }

    public paint(): void {
        if (this.ctx) {
            this.ctx.fillRect(0, 0, this.w, this.h);
        }
    }

    public clear(): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.w, this.h);
        }
    }
}
