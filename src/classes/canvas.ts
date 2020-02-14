import { Container } from './container';
import { Constants } from '../utils/constants';

'use strict';

export class Canvas {
    private container: Container;
    public el: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D | null;
    public w: number;
    public h: number;
    public tag_id: string;
    public pxratio: number

    constructor(container: Container, tag_id: string) {
        let canvas_el = document.querySelector(`#${tag_id} > .${Constants.canvasClass}`) as HTMLCanvasElement;

        this.container = container;
        this.el = canvas_el;
        this.w = canvas_el.offsetWidth;
        this.h = canvas_el.offsetHeight;
        this.tag_id = tag_id;
        this.pxratio = 1;
        this.ctx = this.el.getContext('2d');
    }

    /* ---------- tsParticles functions - canvas ------------ */
    public init() {
        // TODO: Moved in the constructor, check if it's fine there
        // this.ctx = this.el.getContext('2d');
    }

    public size() {
        let container = this.container;
        let options = container.options;

        this.el.width = this.w;
        this.el.height = this.h;

        if (container && options.interactivity.events.resize) {
            window.addEventListener('resize', () => {
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

    public paint() {
        if (this.ctx) {
            this.ctx.fillRect(0, 0, this.w, this.h);
        }
    }

    public clear() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.w, this.h);
        }
    }
}
