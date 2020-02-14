
import { Utils } from '../utils/utils';
import { IOptions, IContainerInteractivity, ISvg, IImage, IBubble, IRepulse } from '../utils/interfaces';
import { Retina } from './retina';
import { Canvas } from './canvas';
import { Particles } from './particles';
import { ShapeType, OutMode, InteractivityDetect, ClickMode, ProcessBubbleType } from '../utils/enums';
import { Loader } from './loader';
import { Particle } from './particle';
import { Constants } from '../utils/constants';

'use strict';

export class Container {
    interactivity: IContainerInteractivity;
    options: IOptions;

    retina: Retina;
    canvas: Canvas;
    particles: Particles;

    checkAnimFrame?: number;
    drawAnimFrame?: number;

    bubble: IBubble;
    repulse: IRepulse;
    svg: ISvg;
    img: IImage;

    lastFrameTime = 0;
    pageHidden = false;

    constructor(tag_id: string, params: IOptions) {
        this.retina = new Retina(this);
        this.canvas = new Canvas(this, tag_id);
        this.particles = new Particles(this);

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

        this.options = Constants.defaultOptions;

        /* tsParticles variables with default values */

        /* params settings */
        if (params) {
            Utils.deepExtend(this.options, params);
        }

        /* ---------- tsParticles - start ------------ */
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

    /* ---------- tsParticles functions - vendors ------------ */
    eventsListeners() {
        /* events target element */
        if (this.options.interactivity.detect_on == InteractivityDetect.window) {
            this.interactivity.el = window;
        } else if (this.options.interactivity.detect_on == 'parent') {
            this.interactivity.el = this.canvas.el.parentNode;
        } else {
            this.interactivity.el = this.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (this.options.interactivity.events.onhover.enable || this.options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            if (this.interactivity.el) {
                this.interactivity.el.addEventListener('mousemove', (e: Event) => {
                    let pos_x;
                    let pos_y;

                    let mouseEvent = e as MouseEvent;

                    if (this.interactivity.el == window) {
                        pos_x = mouseEvent.clientX;
                        pos_y = mouseEvent.clientY;
                    } else if (this.options.interactivity.detect_on == InteractivityDetect.parent) {
                        let source = mouseEvent.srcElement as HTMLElement;
                        let target = mouseEvent.currentTarget as HTMLElement
                        if (source && target) {
                            let sourceRect = source.getBoundingClientRect();
                            let targetRect = target.getBoundingClientRect();
                            pos_x = mouseEvent.offsetX + sourceRect.left - targetRect.left;
                            pos_y = mouseEvent.offsetY + sourceRect.top - targetRect.top;
                        } else {
                            pos_x = mouseEvent.offsetX || mouseEvent.clientX;
                            pos_y = mouseEvent.offsetY || mouseEvent.clientY;
                        }
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
        }

        /* on click event */
        if (this.options.interactivity.events.onclick.enable) {
            if (this.interactivity.el) {
                this.interactivity.el.addEventListener('click', () => {
                    this.interactivity.mouse.click_pos_x = this.interactivity.mouse.pos_x;
                    this.interactivity.mouse.click_pos_y = this.interactivity.mouse.pos_y;
                    this.interactivity.mouse.click_time = new Date().getTime();

                    if (this.options.interactivity.events.onclick.enable) {
                        switch (this.options.interactivity.events.onclick.mode) {
                            case ClickMode.push:
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
                            case ClickMode.remove:
                                this.particles.remove(this.options.interactivity.modes.remove.particles_nb);
                                break;
                            case ClickMode.bubble:
                                this.bubble.clicking = true;
                                break;
                            case ClickMode.repulse:
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

    destroyContainer() {
        if (this.drawAnimFrame !== undefined)
            cancelAnimationFrame(this.drawAnimFrame);

        this.canvas.el.remove();

        Loader.domSet([]);
    }

    exportImg() {
        window.open(this.canvas.el.toDataURL('image/png'), '_blank');
    }

    async loadImg(type: string) {
        this.img.error = undefined;
        if (this.options.particles.shape.image.src != '') {
            // if (type == 'svg') {
            //     let response = await fetch(this.options.particles.shape.image.src);

            //     if (response.ok) {
            //         this.svg.source = await response.text();

            //         this.checkBeforeDraw();
            //     } else {
            //         console.error('Error tsParticles - Image not found');
            //         this.img.error = true;
            //     }
            // } else {
            let img = new Image();

            img.addEventListener('load', () => {
                this.img.obj = img;

                this.checkBeforeDraw();
            });

            img.src = this.options.particles.shape.image.src;
            // }
        } else {
            console.error('Error tsParticles - No image.src');
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
            this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
            return;
        }

        const delta = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        if (this.options.particles.shape.type == ShapeType.image) {
            // if (this.img.type == 'svg') {
            //     if (this.drawAnimFrame && this.svg.count >= this.options.particles.number.value) {
            //         this.particles.draw(delta);

            //         if (!this.options.particles.move.enable) {
            //             this.cancelAnimation(this.drawAnimFrame);
            //         } else {
            //             this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
            //         }
            //     } else {
            //         if (!this.img.error) {
            //             this.drawAnimFrame = this.requestFrame(timestamp => this.draw(timestamp));
            //         }
            //     }
            // } else {
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
            // }
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
        if (this.options.particles.shape.type == ShapeType.image) {
            // if (this.img.type == 'svg' && this.svg.source == undefined) {
            //     this.checkAnimFrame = this.requestFrame(() => {
            //         //TODO: Can't find anywhere this check
            //         //check();
            //     });
            // } else {
            if (this.checkAnimFrame) {
                this.cancelAnimation(this.checkAnimFrame);
            }

            if (!this.img.error) {
                this.init();
                this.draw(0);
            }
            // }
        } else {
            this.init();
            this.draw(0);
        }
    }

    processBubble(p: Particle, dist_mouse: number, time_spent: number, bubble_param: number, particles_param: number, p_obj_bubble: number | undefined, p_obj: number, id: ProcessBubbleType) {
        const container = this;
        const options = container.options;

        if (bubble_param != particles_param) {
            if (!container.bubble.duration_end) {
                if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                    let obj;

                    if (p_obj_bubble != undefined)
                        obj = p_obj_bubble;
                    else
                        obj = p_obj;
                    if (obj != bubble_param) {
                        let value = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration);

                        if (id == ProcessBubbleType.size)
                            p.radius_bubble = value;
                        if (id == ProcessBubbleType.opacity)
                            p.opacity_bubble = value;
                    }
                } else {
                    if (id == ProcessBubbleType.size)
                        p.radius_bubble = undefined;
                    if (id == ProcessBubbleType.opacity)
                        p.opacity_bubble = undefined;
                }
            } else if (p_obj_bubble != undefined) {
                let value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration), dif = bubble_param - value_tmp;
                let value = bubble_param + dif;

                if (id == ProcessBubbleType.size)
                    p.radius_bubble = value;
                if (id == ProcessBubbleType.opacity)
                    p.opacity_bubble = value;
            }
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
        if (this.options.particles.shape.type == ShapeType.image) {
            this.img.type = this.options.particles.shape.image.src.substr(this.options.particles.shape.image.src.length - 3);
            await this.loadImg(this.img.type);
        }
        else {
            this.checkBeforeDraw();
        }
    }
}
