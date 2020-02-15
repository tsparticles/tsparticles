"use strict";

import { Utils } from "../utils/utils";
import { IOptions, IContainerInteractivity, ISvg, IImage, IBubble, IRepulse } from "../utils/interfaces";
import { Retina } from "./retina";
import { Canvas } from "./canvas";
import { Particles } from "./particles";
import { ShapeType, InteractivityDetect, ClickMode, ProcessBubbleType } from "../utils/enums";
import { Loader } from "./loader";
import { Particle } from "./particle";
import { Constants } from "../utils/constants";
import { EventListeners } from "../utils/eventlisteners";

export class Container {
    public interactivity: IContainerInteractivity;
    public options: IOptions;
    public retina: Retina;
    public canvas: Canvas;
    public particles: Particles;
    public checkAnimFrame?: number;
    public drawAnimFrame?: number;
    public bubble: IBubble;
    public repulse: IRepulse;
    public svg: ISvg;
    public img: IImage;
    public lastFrameTime: number;
    public pageHidden: boolean;

    private readonly eventListeners: EventListeners;

    constructor(tagId: string, params: IOptions) {
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this, tagId);
        this.particles = new Particles(this);

        this.interactivity = {
            mouse: {},
        };

        this.svg = {
            count: 0,
            source: undefined,
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
        this.eventListeners = new EventListeners(this);
        this.addEventsListeners();

        this.start().then(() => {
            /*
                Cancel animation if page is not in focus
                Browsers will do this anyway, however the
                Delta time must also be reset, so canceling
                the old frame and starting a new one is necessary
            */
            document.addEventListener("visibilitychange", () => this.handleVisibilityChange(), false);
        }).catch((error) => {
            throw error;
        });
    }

    public handleVisibilityChange(): void {
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
    public addEventsListeners(): void {
        /* events target element */
        if (this.options.interactivity.detect_on === InteractivityDetect.window) {
            this.interactivity.el = window;
        } else if (this.options.interactivity.detect_on === InteractivityDetect.parent) {
            this.interactivity.el = this.canvas.el.parentNode;
        } else {
            this.interactivity.el = this.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (this.options.interactivity.events.onhover.enable || this.options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            if (this.interactivity.el) {
                this.interactivity.el.addEventListener("mousemove", (e: Event) => this.eventListeners.mouseMove(e));
                /* el on onmouseleave */
                this.interactivity.el.addEventListener("mouseleave", () => this.eventListeners.mouseLeave());
            }
        }

        /* on click event */
        if (this.options.interactivity.events.onclick.enable) {
            if (this.interactivity.el) {
                this.interactivity.el.addEventListener("click", () => this.eventListeners.mouseClick());
            }
        }
    }

    public densityAutoParticles(): void {
        if (this.options.particles.number.density.enable) {
            /* calc area */
            let area = this.canvas.el.width * this.canvas.el.height / 1000;

            if (this.retina.isRetina) {
                area = area / ((this.canvas.pxratio) * 2);
            }

            const particlesNumber = this.options.particles.number.value;
            const density = this.options.particles.number.density.value_area;

            /* calc number of particles based on density area */
            const nb_particles = area * particlesNumber / density;

            /* add or remove X particles */
            const missing_particles = this.particles.array.length - nb_particles;

            if (missing_particles < 0)
                this.particles.push(Math.abs(missing_particles));
            else
                this.particles.remove(missing_particles);
        }
    }

    public destroyContainer(): void {
        if (this.drawAnimFrame !== undefined) {
            cancelAnimationFrame(this.drawAnimFrame);
        }

        this.canvas.el.remove();

        Loader.domSet([]);
    }

    public exportImg(): void {
        window.open(this.canvas.el.toDataURL("image/png"), "_blank");
    }

    public async loadImg(type: string): Promise<void> {
        this.img.error = undefined;
        if (this.options.particles.shape.image.src) {
            // if (type === "svg") {
            //     let response = await fetch(this.options.particles.shape.image.src);

            //     if (response.ok) {
            //         this.svg.source = await response.text();

            //         this.checkBeforeDraw();
            //     } else {
            //         console.error("Error tsParticles - Image not found");
            //         this.img.error = true;
            //     }
            // } else {
            const img = new Image();

            img.addEventListener("load", () => {
                this.img.obj = img;

                this.checkBeforeDraw();
            });

            img.src = this.options.particles.shape.image.src;
            // }
        } else {
            console.error("Error tsParticles - No image.src");
            this.img.error = true;
        }
    }

    public requestFrame(callback: FrameRequestCallback): number {
        return window.requestAnimFrame(callback);
    }

    public cancelAnimation(handle: number): void {
        window.cancelAnimationFrame(handle);
    }

    public draw(timestamp: DOMHighResTimeStamp): void {
        // FPS limit logic
        // If we are too fast, just draw without updating
        const fps_limit = this.options.fps_limit;

        if (fps_limit > 0 && timestamp < this.lastFrameTime + (1000 / fps_limit)) {
            this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
            return;
        }

        const delta = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        if (this.options.particles.shape.type === ShapeType.image) {
            // if (this.img.type === "svg") {
            //     if (this.drawAnimFrame && this.svg.count >= this.options.particles.number.value) {
            //         this.particles.draw(delta);

            //         if (!this.options.particles.move.enable) {
            //             this.cancelAnimation(this.drawAnimFrame);
            //         } else {
            //             this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
            //         }
            //     } else {
            //         if (!this.img.error) {
            //             this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
            //         }
            //     }
            // } else {
            if (this.img.obj) {
                this.particles.draw(delta);

                if (this.drawAnimFrame !== undefined && !this.options.particles.move.enable) {
                    this.cancelAnimation(this.drawAnimFrame);
                } else {
                    this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
                }
            } else {
                if (!this.img.error) {
                    this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
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
                this.drawAnimFrame = this.requestFrame((timestamp) => this.draw(timestamp));
            }
        }
    }

    public checkBeforeDraw(): void {
        // if shape is image
        if (this.options.particles.shape.type === ShapeType.image) {
            // if (this.img.type === "svg" && this.svg.source === undefined) {
            //     this.checkAnimFrame = this.requestFrame(() => {
            //         //TODO: Can"t find anywhere this check
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

    public init(): void {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.canvas.size();
        this.canvas.paint();
        this.particles.create();
        this.densityAutoParticles();
    }

    public async start(): Promise<void> {
        if (this.options.particles.shape.type === ShapeType.image) {
            const src = this.options.particles.shape.image.src;

            this.img.type = src.substr(src.length - 3);

            await this.loadImg(this.img.type);
        }
        else {
            this.checkBeforeDraw();
        }
    }
}
