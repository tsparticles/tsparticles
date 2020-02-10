import { pJSLoader } from './pjsloader';
import { pJSContainer } from './pjscontainer';
import { pJSInteractivityDetect, pJSClickMode, pJSShapeType } from './pjsenums';

'use strict';

export class pJSVendors {
    pJSContainer: pJSContainer;

    constructor(pJSContainer: pJSContainer) {
        this.pJSContainer = pJSContainer;
    }

    /* ---------- pJS functions - vendors ------------ */
    eventsListeners() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        /* events target element */
        if (options.interactivity.detect_on == pJSInteractivityDetect.window) {
            pJS.interactivity.el = window;
        } else {
            pJS.interactivity.el = pJS.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onhover.enable || options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            pJS.interactivity.el.addEventListener('mousemove', (e: Event) => {
                let pos_x;
                let pos_y;

                let mouseEvent = e as MouseEvent;

                if (pJS.interactivity.el == window) {
                    pos_x = mouseEvent.clientX;
                    pos_y = mouseEvent.clientY;
                } else {
                    pos_x = mouseEvent.offsetX || mouseEvent.clientX;
                    pos_y = mouseEvent.offsetY || mouseEvent.clientY;
                }

                pJS.interactivity.mouse.pos_x = pos_x * (pJS.retina.isRetina ? pJS.canvas.pxratio : 1);
                pJS.interactivity.mouse.pos_y = pos_y * (pJS.retina.isRetina ? pJS.canvas.pxratio : 1);

                pJS.interactivity.status = 'mousemove';
            });
            /* el on onmouseleave */
            pJS.interactivity.el.addEventListener('mouseleave', () => {
                pJS.interactivity.mouse.pos_x = null;
                pJS.interactivity.mouse.pos_y = null;
                pJS.interactivity.status = 'mouseleave';
            });
        }
        /* on click event */
        if (options.interactivity.events.onclick.enable) {
            pJS.interactivity.el.addEventListener('click', () => {
                pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
                pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
                pJS.interactivity.mouse.click_time = new Date().getTime();
                if (options.interactivity.events.onclick.enable) {
                    switch (options.interactivity.events.onclick.mode) {
                        case pJSClickMode.push:
                            if (options.particles.move.enable) {
                                pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                            }
                            else {
                                if (options.interactivity.modes.push.particles_nb == 1) {
                                    pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                                }
                                else if (options.interactivity.modes.push.particles_nb > 1) {
                                    pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb);
                                }
                            }
                            break;
                        case pJSClickMode.remove:
                            pJS.modes.removeParticles(options.interactivity.modes.remove.particles_nb);
                            break;
                        case pJSClickMode.bubble:
                            pJS.bubble_clicking = true;
                            break;
                        case pJSClickMode.repulse:
                            pJS.repulse_clicking = true;
                            pJS.repulse_count = 0;
                            pJS.repulse_finish = false;
                            setTimeout(() => {
                                pJS.repulse_clicking = false;
                            }, options.interactivity.modes.repulse.duration * 1000);
                            break;
                    }
                }
            });
        }
    }

    densityAutoParticles() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.number.density.enable) {
            /* calc area */
            let area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;

            if (pJS.retina.isRetina) {
                area = area / ((pJS.canvas.pxratio) * 2);
            }
            /* calc number of particles based on density area */
            let nb_particles = area * options.particles.number.value / options.particles.number.density.value_area;

            /* add or remove X particles */
            let missing_particles = pJS.particles.array.length - nb_particles;

            if (missing_particles < 0)
                pJS.modes.pushParticles(Math.abs(missing_particles));
            else
                pJS.modes.removeParticles(missing_particles);
        }
    }

    destroypJS() {
        let pJS = this.pJSContainer;

        if (pJS.drawAnimFrame !== undefined)
            cancelAnimationFrame(pJS.drawAnimFrame);

        pJS.canvas.el.remove();
        pJSLoader.pJSDomSet([]);
    }

    exportImg() {
        let pJS = this.pJSContainer;

        window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
    }

    async loadImg(type: string) {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        pJS.img.error = undefined;
        if (options.particles.shape.image.src != '') {
            if (type == 'svg') {
                let response = await fetch(options.particles.shape.image.src);

                if (response.ok) {
                    pJS.svg.source = await response.text();

                    this.checkBeforeDraw();
                } else {
                    console.error('Error pJS - Image not found');
                    pJS.img.error = true;
                }
            }
            else {
                let img = new Image();

                img.addEventListener('load', () => {
                    pJS.img.obj = img;

                    this.checkBeforeDraw();
                });

                img.src = options.particles.shape.image.src;
            }
        }
        else {
            console.error('Error pJS - No image.src');
            pJS.img.error = true;
        }
    }

    draw() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.shape.type == pJSShapeType.image) {
            if (pJS.img.type == 'svg') {
                if (pJS.drawAnimFrame && pJS.svg.count >= options.particles.number.value) {
                    pJS.particles.draw();
                    if (!options.particles.move.enable)
                        window.cancelRequestAnimFrame(pJS.drawAnimFrame);
                    else
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
                else {
                    if (!pJS.img.error)
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
            }
            else {
                if (pJS.img.obj != undefined) {
                    pJS.particles.draw();

                    if (pJS.drawAnimFrame !== undefined && !options.particles.move.enable)
                        window.cancelRequestAnimFrame(pJS.drawAnimFrame);
                    else
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
                else {
                    if (!pJS.img.error)
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
            }
        }
        else {
            pJS.particles.draw();
            if (!options.particles.move.enable) {
                if (pJS.drawAnimFrame !== undefined)
                    window.cancelRequestAnimFrame(pJS.drawAnimFrame);
            }
            else
                pJS.drawAnimFrame = window.requestAnimFrame(() => {
                    this.draw();
                });
        }
    }

    checkBeforeDraw() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        // if shape is image
        if (options.particles.shape.type == pJSShapeType.image) {
            if (pJS.img.type == 'svg' && pJS.svg.source == undefined) {
                pJS.checkAnimFrame = window.requestAnimFrame(() => {
                    //TODO: Questo check non è da nessuna parte
                    //check();
                });
            }
            else {
                if (pJS.checkAnimFrame)
                    window.cancelRequestAnimFrame(pJS.checkAnimFrame);

                if (!pJS.img.error) {
                    this.init();
                    this.draw();
                }
            }
        }
        else {
            this.init();
            this.draw();
        }
    }

    init() {
        let pJS = this.pJSContainer;

        /* init canvas + particles */
        pJS.retina.init();
        pJS.canvas.init();
        pJS.canvas.size();
        pJS.canvas.paint();
        pJS.particles.create();
        this.densityAutoParticles();
    }

    async start() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.shape.type == pJSShapeType.image) {
            pJS.img.type = options.particles.shape.image.src.substr(options.particles.shape.image.src.length - 3);
            await this.loadImg(pJS.img.type);
        }
        else {
            this.checkBeforeDraw();
        }
    }
}