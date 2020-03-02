"use strict";

import {Canvas} from "./Canvas";
import {Constants} from "./Utils/Constants";
import {EventListeners} from "./Utils/EventListeners";
import {IRepulse} from "../Interfaces/IRepulse";
import {IBubble} from "../Interfaces/IBubble";
import {IImage} from "../Interfaces/IImage";
import {ISvg} from "../Interfaces/ISvg";
import {IOptions} from "../Interfaces/Options/IOptions";
import {IContainerInteractivity} from "../Interfaces/IContainerInteractivity";
import {Loader} from "./Loader";
import {Particles} from "./Particles";
import {Retina} from "./Retina";
import {ShapeType} from "../Enums/ShapeType";
import {Utils} from "./Utils/Utils";
import {PolygonMask} from "./PolygonMask";
import {IOptionsShapeImage} from "../Interfaces/Options/Shape/IOptionsShapeImage";

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export class Container {
    public interactivity: IContainerInteractivity;
    public options: IOptions;
    public retina: Retina;
    public canvas: Canvas;
    public particles: Particles;
    public polygon: PolygonMask;
    public checkAnimFrame?: number;
    public drawAnimFrame?: number;
    public bubble: IBubble;
    public repulse: IRepulse;
    public svg: ISvg;
    public images: Array<IImage>;
    public lastFrameTime: number;
    public pageHidden: boolean;

    private readonly eventListeners: EventListeners;

    constructor(tagId: string, params: IOptions) {
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this, tagId);
        this.particles = new Particles(this);
        this.polygon = new PolygonMask(this);
        this.interactivity = {
            mouse: {},
        };
        this.svg = {
            count: 0,
            source: undefined,
        };
        this.images = [];
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
        this.eventListeners.addEventsListeners();
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
                area /= this.canvas.pxRatio * 2;
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

    public async loadImg(image: IImage, optionsImage: IOptionsShapeImage): Promise<void> {
        image.error = false;

        if (optionsImage.src) {
            const img = new Image();

            img.addEventListener("load", () => {
                image.obj = img;

                this.checkBeforeDraw();
            });

            img.src = optionsImage.src;
        } else {
            console.error("Error tsParticles - No image.src");

            image.error = true;
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
        this.images = [];
        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();

        delete this.particles.lineLinkedColor;

        /* restart */
        await this.start();
    }

    public async start(): Promise<void> {
        /* If is set the url of svg element, load it and parse into raw polygon data,
         * works only with single path SVG
         */
        if (this.options.polygon.url) {
            this.polygon.raw = await this.polygon.parseSvgPathToPolygon(this.options.polygon.url);
        }

        if (this.options.particles.shape.type === ShapeType.image) {
            if (this.options.particles.shape.image instanceof Array) {
                for (const optionsImage of this.options.particles.shape.image) {
                    const src = optionsImage.src;
                    const image: IImage = {error: false};

                    image.type = src.substr(src.length - 3);

                    await this.loadImg(image, optionsImage);

                    this.images.push(image);
                }
            }  else {
                const optionsImage = this.options.particles.shape.image;
                const src = optionsImage.src;
                const image: IImage = {error: false};

                image.type = src.substr(src.length - 3);

                await this.loadImg(image, optionsImage);

                this.images.push(image);
            }
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

        if (this.options.particles.shape.type === ShapeType.image && this.images.every((img) => img.error)) {
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

            if (this.images.every((img) => img.error)) {
                return;
            }
        }

        this.init();
        this.draw(0);
    }
}
