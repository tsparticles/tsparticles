import { pJSContainer } from './pjscontainer';

'use strict';

export class pJSCanvas {
    pJSContainer: pJSContainer;
    el: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D | null;
    w: number;
    h: number;
    tag_id: string;
    pxratio?: number

    constructor(pJSContainer: pJSContainer, tag_id: string) {
        let canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el') as HTMLCanvasElement;

        this.pJSContainer = pJSContainer;
        this.el = canvas_el;
        this.w = canvas_el.offsetWidth;
        this.h = canvas_el.offsetHeight;
        this.tag_id = tag_id;
    }

    /* ---------- pJS functions - canvas ------------ */
    init() {
        let pJS = this.pJSContainer;

        this.ctx = this.el.getContext('2d');
    }

    size() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        this.el.width = this.w;
        this.el.height = this.h;

        if (pJS && options.interactivity.events.resize) {
            window.addEventListener('resize', () => {
                this.w = this.el.offsetWidth;
                this.h = this.el.offsetHeight;

                /* resize canvas */
                if (pJS.retina.isRetina && this.pxratio) {
                    this.w *= this.pxratio;
                    this.h *= this.pxratio;
                }

                this.el.width = this.w;
                this.el.height = this.h;

                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    pJS.particles.empty();
                    pJS.particles.create();
                    pJS.particles.draw();
                    pJS.vendors.densityAutoParticles();
                }

                /* density particles enabled */
                pJS.vendors.densityAutoParticles();
            });
        }
    }

    paint() {
        let pJS = this.pJSContainer;

        if (this.ctx)
            this.ctx.fillRect(0, 0, this.w, this.h);
    }

    clear() {
        let pJS = this.pJSContainer;

        if (this.ctx)
            this.ctx.clearRect(0, 0, this.w, this.h);
    }
}