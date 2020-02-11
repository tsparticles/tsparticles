
import { pJSUtils } from './pjsutils';
import { pJSOptions, pJSContainerInteractivity, pJSSvg, pJSImg, pJSBubble, pJSRepulse } from './pjsinterfaces';
import { pJSRetina } from './pjsretina';
import { pJSCanvas } from './pjscanvas';
import { pJSParticles } from './pjsparticles';
import { pJSShapeType, pJSOutMode, pJSInteractivityDetect, pJSClickMode, pJSProcessBubbleType } from './pjsenums';
import { pJSLoader } from './pjsloader';
import { pJSParticle } from './pjsparticle';
import { pJSConstants } from './pjsconstants';

'use strict';

export class pJSContainer {
    interactivity: pJSContainerInteractivity;
    options: pJSOptions;

    retina: pJSRetina;
    canvas: pJSCanvas;
    particles: pJSParticles;

    checkAnimFrame?: number;
    drawAnimFrame?: number;

    bubble: pJSBubble;
    repulse: pJSRepulse;
    svg: pJSSvg;
    img: pJSImg;

    lastFrameTime = 0;
    pageHidden = false;

    constructor(tag_id: string, params: pJSOptions) {
        this.retina = new pJSRetina(this);
        this.canvas = new pJSCanvas(this, tag_id);
        this.particles = new pJSParticles(this);

        this.interactivity = {
            mouse: {}
        };

        this.svg = {
            source: undefined,
            count: 0
        };

        this.img = {};
        this.bubble = {};
        this.repulse = {};

        this.options = pJSConstants.defaultOptions;

        /* particles.js variables with default values */

        /* params settings */
        if (params) {
            pJSUtils.deepExtend(this.options, params);
        }

        /* ---------- pJS - start ------------ */
        this.eventsListeners();

        //TODO: Start è async
        this.start().then(() => {
            /*
                Cancel animation if page is not in focus
                Browsers will do this anyway, however the
                Delta time must also be reset, so canceling
                the old frame and starting a new one is necessary
            */
            document.addEventListener("visibilitychange", () => this.handleVisibilityChange(), false);
        });
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pageHidden = true;

            if (this.drawAnimFrame) {
                this.cancelAnimation(this.drawAnimFrame);
            }
        } else {
            this.pageHidden = false;
            this.lastFrameTime = performance.now();
            this.draw(0);
        }
    }

    /* ---------- pJS functions - vendors ------------ */
    eventsListeners() {
        /* events target element */
        if (this.options.interactivity.detect_on == pJSInteractivityDetect.window) {
            this.interactivity.el = window;
        } else {
            this.interactivity.el = this.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (this.options.interactivity.events.onhover.enable || this.options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            this.interactivity.el.addEventListener('mousemove', (e: Event) => {
                let pos_x;
                let pos_y;

                let mouseEvent = e as MouseEvent;

                if (this.interactivity.el == window) {
                    pos_x = mouseEvent.clientX;
                    pos_y = mouseEvent.clientY;
                } else {
                    pos_x = mouseEvent.offsetX || mouseEvent.clientX;
                    pos_y = mouseEvent.offsetY || mouseEvent.clientY;
                }

                this.interactivity.mouse.pos_x = pos_x * (this.retina.isRetina ? this.canvas.pxratio : 1);
                this.interactivity.mouse.pos_y = pos_y * (this.retina.isRetina ? this.canvas.pxratio : 1);

                this.interactivity.status = 'mousemove';
            });
            /* el on onmouseleave */
            this.interactivity.el.addEventListener('mouseleave', () => {
                this.interactivity.mouse.pos_x = null;
                this.interactivity.mouse.pos_y = null;
                this.interactivity.status = 'mouseleave';
            });
        }

        /* on click event */
        if (this.options.interactivity.events.onclick.enable) {
            this.interactivity.el.addEventListener('click', () => {
                this.interactivity.mouse.click_pos_x = this.interactivity.mouse.pos_x;
                this.interactivity.mouse.click_pos_y = this.interactivity.mouse.pos_y;
                this.interactivity.mouse.click_time = new Date().getTime();

                if (this.options.interactivity.events.onclick.enable) {
                    switch (this.options.interactivity.events.onclick.mode) {
                        case pJSClickMode.push:
                            if (this.options.particles.move.enable) {
                                this.particles.push(this.options.interactivity.modes.push.particles_nb, this.interactivity.mouse);
                            } else {
                                if (this.options.interactivity.modes.push.particles_nb == 1) {
                                    this.particles.push(this.options.interactivity.modes.push.particles_nb, this.interactivity.mouse);
                                }
                                else if (this.options.interactivity.modes.push.particles_nb > 1) {
                                    this.particles.push(this.options.interactivity.modes.push.particles_nb);
                                }
                            }
                            break;
                        case pJSClickMode.remove:
                            this.particles.remove(this.options.interactivity.modes.remove.particles_nb);
                            break;
                        case pJSClickMode.bubble:
                            this.bubble.clicking = true;
                            break;
                        case pJSClickMode.repulse:
                            this.repulse.clicking = true;
                            this.repulse.count = 0;
                            this.repulse.finish = false;
                            setTimeout(() => {
                                this.repulse.clicking = false;
                            }, this.options.interactivity.modes.repulse.duration * 1000);
                            break;
                    }
                }
            });
        }
    }

    densityAutoParticles() {
        if (this.options.particles.number.density.enable) {
            /* calc area */
            let area = this.canvas.el.width * this.canvas.el.height / 1000;

            if (this.retina.isRetina) {
                area = area / ((this.canvas.pxratio) * 2);
            }
            /* calc number of particles based on density area */
            let nb_particles = area * this.options.particles.number.value / this.options.particles.number.density.value_area;

            /* add or remove X particles */
            let missing_particles = this.particles.array.length - nb_particles;

            if (missing_particles < 0)
                this.particles.push(Math.abs(missing_particles));
            else
                this.particles.remove(missing_particles);
        }
    }

    destroypJS() {
        if (this.drawAnimFrame !== undefined)
            cancelAnimationFrame(this.drawAnimFrame);

        this.canvas.el.remove();

        pJSLoader.pJSDomSet([]);
    }

    exportImg() {
        window.open(this.canvas.el.toDataURL('image/png'), '_blank');
    }

    async loadImg(type: string) {
        this.img.error = undefined;
        if (this.options.particles.shape.image.src != '') {
            if (type == 'svg') {
                let response = await fetch(this.options.particles.shape.image.src);

                if (response.ok) {
                    this.svg.source = await response.text();

                    this.checkBeforeDraw();
                } else {
                    console.error('Error pJS - Image not found');
                    this.img.error = true;
                }
            }
            else {
                let img = new Image();

                img.addEventListener('load', () => {
                    this.img.obj = img;

                    this.checkBeforeDraw();
                });

                img.src = this.options.particles.shape.image.src;
            }
        }
        else {
            console.error('Error pJS - No image.src');
            this.img.error = true;
        }
    }

    requestFrame(callback: FrameRequestCallback) {
        return window.requestAnimFrame(callback);
    }

    cancelAnimation(handle: number) {
        return window.cancelAnimationFrame(handle);
    }

    draw(timestamp: DOMHighResTimeStamp) {
        // FPS limit logic
        // If we are too fast, just draw without updating
        var fps_limit = this.options.fps_limit;
        if (fps_limit > 0 && timestamp < this.lastFrameTime + (1000 / fps_limit)) {
            this.requestFrame(timestamp => this.draw(timestamp));
            return;
        }

        const delta = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        if (this.options.particles.shape.type == pJSShapeType.image) {
            if (this.img.type == 'svg') {
                if (this.drawAnimFrame && this.svg.count >= this.options.particles.number.value) {
                    this.particles.draw(delta);

                    if (!this.options.particles.move.enable) {
                        this.cancelAnimation(this.drawAnimFrame);
                    } else {
                        this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
                    }
                } else {
                    if (!this.img.error) {
                        this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
                    }
                }
            } else {
                if (this.img.obj != undefined) {
                    this.particles.draw(delta);

                    if (this.drawAnimFrame !== undefined && !this.options.particles.move.enable) {
                        this.cancelAnimation(this.drawAnimFrame);
                    } else {
                        this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
                    }
                } else {
                    if (!this.img.error) {
                        this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
                    }
                }
            }
        } else {
            this.particles.draw(delta);

            if (!this.options.particles.move.enable) {
                if (this.drawAnimFrame !== undefined) {
                    this.cancelAnimation(this.drawAnimFrame);
                }
            } else {
                this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
            }
        }
    }

    checkBeforeDraw() {
        // if shape is image
        if (this.options.particles.shape.type == pJSShapeType.image) {
            if (this.img.type == 'svg' && this.svg.source == undefined) {
                this.checkAnimFrame = this.requestFrame(() => {
                    //TODO: Questo check non è da nessuna parte
                    //check();
                });
            }
            else {
                if (this.checkAnimFrame) {
                    this.cancelAnimation(this.checkAnimFrame);
                }

                if (!this.img.error) {
                    this.init();
                    this.draw(0);
                }
            }
        } else {
            this.init();
            this.draw(0);
        }
    }

    processBubble(p: pJSParticle, dist_mouse: number, time_spent: number, bubble_param: number, particles_param: number, p_obj_bubble: number | undefined, p_obj: number, id: pJSProcessBubbleType) {
        const pJS = this;
        const options = pJS.options;

        if (bubble_param != particles_param) {
            if (!pJS.bubble.duration_end) {
                if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                    let obj;

                    if (p_obj_bubble != undefined)
                        obj = p_obj_bubble;
                    else
                        obj = p_obj;
                    if (obj != bubble_param) {
                        let value = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration);

                        if (id == pJSProcessBubbleType.size)
                            p.radius_bubble = value;
                        if (id == pJSProcessBubbleType.opacity)
                            p.opacity_bubble = value;
                    }
                } else {
                    if (id == pJSProcessBubbleType.size)
                        p.radius_bubble = undefined;
                    if (id == pJSProcessBubbleType.opacity)
                        p.opacity_bubble = undefined;
                }
            } else if (p_obj_bubble != undefined) {
                let value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration), dif = bubble_param - value_tmp;
                let value = bubble_param + dif;

                if (id == pJSProcessBubbleType.size)
                    p.radius_bubble = value;
                if (id == pJSProcessBubbleType.opacity)
                    p.opacity_bubble = value;
            }
        }
    }

    processRepulse(p: pJSParticle, dx: number, dy: number, force: number) {
        let pJS = this;
        let options = pJS.options;

        let f = Math.atan2(dy, dx);

        p.vx = force * Math.cos(f);
        p.vy = force * Math.sin(f);

        if (options.particles.move.out_mode == pJSOutMode.bounce) {
            let pos = {
                x: p.x + p.vx,
                y: p.y + p.vy
            };

            if (pos.x + p.radius > pJS.canvas.w)
                p.vx = -p.vx;
            else if (pos.x - p.radius < 0)
                p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h)
                p.vy = -p.vy;
            else if (pos.y - p.radius < 0)
                p.vy = -p.vy;
        }
    }

    init() {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.canvas.size();
        this.canvas.paint();
        this.particles.create();
        this.densityAutoParticles();
    }

    async start() {
        if (this.options.particles.shape.type == pJSShapeType.image) {
            this.img.type = this.options.particles.shape.image.src.substr(this.options.particles.shape.image.src.length - 3);
            await this.loadImg(this.img.type);
        }
        else {
            this.checkBeforeDraw();
        }
    }
}