"use strict";

import {Constants} from "./Utils/Constants";
import {Container} from "./Container";

export class Canvas {
    public element: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;
    public width: number;
    public height: number;
    public tagId: string;
    public pxratio: number;

    private readonly container: Container;

    constructor(container: Container, tagId: string) {
        const canvasEl = document.querySelector(`#${tagId} > .${Constants.canvasClass}`) as HTMLCanvasElement;

        this.container = container;
        this.element = canvasEl;
        this.width = canvasEl.offsetWidth;
        this.height = canvasEl.offsetHeight;
        this.tagId = tagId;
        this.pxratio = 1;
        this.context = this.element.getContext("2d");
    }

    /* ---------- tsParticles functions - canvas ------------ */
    public init(): void {
        this.size();
        this.paint();
    }

    public size(): void {
        const container = this.container;
        const options = container.options;

        this.element.width = this.width;
        this.element.height = this.height;

        if (options.interactivity.events.resize) {
            window.addEventListener("resize", () => {
                this.width = this.element.offsetWidth;
                this.height = this.element.offsetHeight;

                /* resize canvas */
                if (container.retina.isRetina) {
                    this.width *= this.pxratio;
                    this.height *= this.pxratio;
                }

                this.element.width = this.width;
                this.element.height = this.height;

                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    container.particles.clear();
                    container.particles.init();
                    container.particles.draw(0);
                }

                /* density particles enabled */
                container.densityAutoParticles();
            });
        }
    }

    public paint(): void {
        if (this.context) {
            this.context.fillRect(0, 0, this.width, this.height);
        }
    }

    public clear(): void {
        if (this.context) {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }
}
