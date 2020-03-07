"use strict";

import {Canvas} from "./Canvas";
import {EventListeners} from "./Utils/EventListeners";
import {IRepulse} from "../Interfaces/IRepulse";
import {IBubble} from "../Interfaces/IBubble";
import {IImage} from "../Interfaces/IImage";
import {IContainerInteractivity} from "../Interfaces/IContainerInteractivity";
import {Loader} from "./Loader";
import {Particles} from "./Particles";
import {Retina} from "./Retina";
import {ShapeType} from "../Enums/ShapeType";
import {Utils} from "./Utils/Utils";
import {PolygonMask} from "./PolygonMask";
import {ImageShape} from "./Options/Particles/Shape/ImageShape";
import {IOptions} from "../Interfaces/Options/IOptions";
import {container} from "tsyringe";
import {Drawer} from "./Drawer";

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export class Container {
    /**
     * @deprecated this property is obsolete, please use the new drawAnimationFrame
     */
    public get drawAnimFrame(): number | undefined {
        return this.drawAnimationFrame;
    }

    /**
     * @deprecated this property is obsolete, please use the new drawAnimationFrame
     * @param value
     */
    public set drawAnimFrame(value: number | undefined) {
        this.drawAnimationFrame = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new checkAnimationFrame
     */
    public get checkAnimFrame(): number | undefined {
        return this.checkAnimationFrame;
    }

    /**
     * @deprecated this property is obsolete, please use the new checkAnimationFrame
     * @param value
     */
    public set checkAnimFrame(value: number | undefined) {
        this.checkAnimationFrame = value;
    }

    public interactivity: IContainerInteractivity;
    public options: IOptions;
    public retina: Retina;
    public canvas: Canvas;
    public particles: Particles;
    public polygon: PolygonMask;
    public checkAnimationFrame?: number;
    public drawAnimationFrame?: number;
    public bubble: IBubble;
    public repulse: IRepulse;
    public images: IImage[];
    public lastFrameTime: number;
    public pageHidden: boolean;
    public drawer: Drawer;

    private readonly _eventListeners: EventListeners;

    constructor(tagId: string, params: IOptions) {
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this, tagId);
        this.particles = new Particles(this);
        this.polygon = new PolygonMask(this);
        this.drawer = new Drawer(this);
        this.interactivity = {
            mouse: {},
        };
        this.images = [];
        this.bubble = {};
        this.repulse = {};

        /* tsParticles variables with default values */
        this.options = container.resolve<IOptions>("IOptions");

        /* params settings */
        if (params) {
            Utils.deepExtend(this.options, params);
        }

        /* ---------- tsParticles - start ------------ */
        this._eventListeners = new EventListeners(this);
        this._eventListeners.addEventsListeners();

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

    public static requestFrame(callback: FrameRequestCallback): number {
        return window.customRequestAnimationFrame(callback);
    }

    public static cancelAnimation(handle: number): void {
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
            const density = this.options.particles.number.density.area;

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
        if (this.drawAnimationFrame !== undefined) {
            cancelAnimationFrame(this.drawAnimationFrame);
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

    public async loadImg(image: IImage, optionsImage: ImageShape): Promise<void> {
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
        if (this.checkAnimationFrame) {
            Container.cancelAnimation(this.checkAnimationFrame);
        }

        if (this.drawAnimationFrame) {
            Container.cancelAnimation(this.drawAnimationFrame);
        }

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
            } else {
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

            if (this.drawAnimationFrame) {
                Container.cancelAnimation(this.drawAnimationFrame);
            }
        } else {
            this.pageHidden = false;
            this.lastFrameTime = performance.now();
            this.drawer.draw(0);
        }
    }

    private checkBeforeDraw(): void {
        if (this.options.particles.shape.type === ShapeType.image) {
            if (this.checkAnimationFrame) {
                Container.cancelAnimation(this.checkAnimationFrame);
            }

            if (this.images.every((img) => img.error)) {
                return;
            }
        }

        this.init();
        this.drawer.draw(0);
    }
}
