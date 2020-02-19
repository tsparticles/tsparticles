"use strict";

import {Canvas} from "./Canvas";
import {Constants} from "./Utils/Constants";
import {EventListeners} from "./Utils/EventListeners";
import {IRepulse} from "../Interfaces/IRepulse";
import {IBubble} from "../Interfaces/IBubble";
import {IImage} from "../Interfaces/IImage";
import {ISvg} from "../Interfaces/ISvg";
import {IOptions} from "../Interfaces/IOptions";
import {IContainerInteractivity} from "../Interfaces/IContainerInteractivity";
import {InteractivityDetect} from "../Enums/InteractivityDetect";
import {Loader} from "./Loader";
import {Particles} from "./Particles";
import {Retina} from "./Retina";
import {ShapeType} from "../Enums/ShapeType";
import {Utils} from "./Utils/Utils";

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
    public image: IImage;
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
        this.image = {error: false};
        this.bubble = {};
        this.repulse = {};

        /* tsParticles variables with default values */
        this.options = Constants.defaultOptions;

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

    private static requestFrame(callback: FrameRequestCallback): number {
        return window.requestAnimFrame(callback);
    }

    private static cancelAnimation(handle: number): void {
        window.cancelAnimationFrame(handle);
    }

    /* ---------- tsParticles functions - vendors ------------ */

    public densityAutoParticles(): void {
        if (this.options.particles.number.density.enable) {
            /* calc area */
            let area = this.canvas.element.width * this.canvas.element.height / 1000;

            if (this.retina.isRetina) {
                area /= this.canvas.pxratio * 2;
            }

            const optParticlesNumber = this.options.particles.number.value;
            const density = this.options.particles.number.density.value_area;

            /* calc number of particles based on density area */
            const particlesNumber = area * optParticlesNumber / density;

            /* add or remove X particles */
            const missingParticles = this.particles.array.length - particlesNumber;

            if (missingParticles < 0) {
                this.particles.push(Math.abs(missingParticles));
            } else {
                this.particles.remove(missingParticles);
            }
        }
    }

    public destroy(): void {
        if (this.drawAnimFrame !== undefined) {
            cancelAnimationFrame(this.drawAnimFrame);
        }

        this.retina.reset();
        this.canvas.element.remove();

        const idx = Loader.dom().indexOf(this);

        if (idx >= 0) {
            Loader.dom().splice(idx, 1);
        }
    }

    public exportImg(): void {
        window.open(this.canvas.element.toDataURL("image/png"), "_blank");
    }

    public async loadImg(): Promise<void> {
        this.image.error = false;

        if (this.options.particles.shape.image.src) {
            const img = new Image();

            img.addEventListener("load", () => {
                this.image.obj = img;

                this.checkBeforeDraw();
            });

            img.src = this.options.particles.shape.image.src;
        } else {
            console.error("Error tsParticles - No image.src");

            this.image.error = true;
        }
    }

    public async refresh(): Promise<void> {
        /* init all */
        if (this.checkAnimFrame) {
            Container.cancelAnimation(this.checkAnimFrame);
        }

        if (this.drawAnimFrame) {
            Container.cancelAnimation(this.drawAnimFrame);
        }

        this.svg.source = undefined;
        this.svg.count = 0;
        this.image.obj = undefined;

        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();

        delete this.particles.lineLinkedColor;

        /* restart */
        await this.start();
    }

    public async start(): Promise<void> {
        if (this.options.particles.shape.type === ShapeType.image) {
            const src = this.options.particles.shape.image.src;

            this.image.type = src.substr(src.length - 3);

            await this.loadImg();
        } else {
            this.checkBeforeDraw();
        }
    }

    private init(): void {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.particles.init();
        this.densityAutoParticles();
    }

    private handleVisibilityChange(): void {
        if (document.hidden) {
            this.pageHidden = true;

            if (this.drawAnimFrame) {
                Container.cancelAnimation(this.drawAnimFrame);
            }
        } else {
            this.pageHidden = false;
            this.lastFrameTime = performance.now();
            this.draw(0);
        }
    }

    private addEventsListeners(): void {
        /* events target element */
        if (this.options.interactivity.detect_on === InteractivityDetect.window) {
            this.interactivity.element = window;
        } else if (this.options.interactivity.detect_on === InteractivityDetect.parent) {
            this.interactivity.element = this.canvas.element.parentNode;
        } else {
            this.interactivity.element = this.canvas.element;
        }

        const interactivityEl = this.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (this.options.interactivity.events.onhover.enable || this.options.interactivity.events.onclick.enable) {
            if (interactivityEl) {
                /* el on mousemove */
                interactivityEl.addEventListener("mousemove", (e: Event) => this.eventListeners.mouseTouchMove(e));

                /* el on touchstart */
                interactivityEl.addEventListener("touchstart", (e: Event) => this.eventListeners.mouseTouchMove(e));

                /* el on touchmove */
                interactivityEl.addEventListener("touchmove", (e: Event) => this.eventListeners.mouseTouchMove(e));

                if (!this.options.interactivity.events.onclick.enable) {
                    /* el on touchend */
                    interactivityEl.addEventListener("touchend", () => this.eventListeners.mouseTouchFinish());
                }

                /* el on onmouseleave */
                interactivityEl.addEventListener("mouseleave", () => this.eventListeners.mouseTouchFinish());

                /* el on touchcancel */
                interactivityEl.addEventListener("touchcancel", () => this.eventListeners.mouseTouchFinish());
            }
        }

        /* on click event */
        if (this.options.interactivity.events.onclick.enable) {
            if (interactivityEl) {
                interactivityEl.addEventListener("touchend", (e: Event) => this.eventListeners.mouseTouchClick(e));
                interactivityEl.addEventListener("mouseup", (e: Event) => this.eventListeners.mouseTouchClick(e));
            }
        }
    }

    private draw(timestamp: DOMHighResTimeStamp): void {
        // FPS limit logic
        // If we are too fast, just draw without updating
        const fpsLimit = this.options.fps_limit;

        if (fpsLimit > 0 && timestamp < this.lastFrameTime + (1000 / fpsLimit)) {
            this.drawAnimFrame = Container.requestFrame((t) => this.draw(t));
            return;
        }

        const delta = timestamp - this.lastFrameTime;

        this.lastFrameTime = timestamp;

        if (this.options.particles.shape.type === ShapeType.image && this.image.error) {
            return;
        }

        this.particles.draw(delta);

        if (this.drawAnimFrame !== undefined && !this.options.particles.move.enable) {
            Container.cancelAnimation(this.drawAnimFrame);
        } else {
            this.drawAnimFrame = Container.requestFrame((t) => this.draw(t));
        }
    }

    private checkBeforeDraw(): void {
        if (this.options.particles.shape.type === ShapeType.image) {
            if (this.checkAnimFrame) {
                Container.cancelAnimation(this.checkAnimFrame);
            }

            if (this.image.error) {
                return;
            }
        }

        this.init();
        this.draw(0);
    }
}
