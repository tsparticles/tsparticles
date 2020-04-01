import { Canvas } from "./Canvas";
import { EventListeners } from "./Utils/EventListeners";
import type { IRepulse } from "../Interfaces/IRepulse";
import type { IBubble } from "../Interfaces/IBubble";
import type { IImage } from "../Interfaces/IImage";
import type { IContainerInteractivity } from "../Interfaces/IContainerInteractivity";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import { ShapeType } from "../Enums/ShapeType";
import { PolygonMask } from "./PolygonMask";
import { ImageShape } from "./Options/Particles/Shape/ImageShape";
import type { IOptions } from "../Interfaces/Options/IOptions";
import { FrameManager } from "./FrameManager";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Options } from "./Options/Options";
import { Utils } from "./Utils/Utils";
import type { IImageShape } from "../Interfaces/Options/Particles/Shape/IImageShape";
import { Presets } from "./Utils/Presets";

declare global {
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
    }
}

/* ---------- global functions - vendors ------------ */

window.customRequestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
})();

window.customCancelRequestAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export class Container {
    public readonly sourceOptions?: RecursivePartial<IOptions>;
    public readonly id: string;
    public interactivity: IContainerInteractivity;
    public options: IOptions;
    public retina: Retina;
    public canvas: Canvas;
    public particles: Particles;
    public polygon: PolygonMask;
    public bubble: IBubble;
    public repulse: IRepulse;
    public images: IImage[];
    public lastFrameTime: number;
    public pageHidden: boolean;
    public drawer: FrameManager;
    public started: boolean;
    public destroyed: boolean;

    private paused: boolean;
    private drawAnimationFrame?: number;
    private eventListeners: EventListeners;

    /**
     * This is the core class, create an instance to have a new working particles manager
     * @constructor
     * @param id the id to identify this instance
     * @param params the options to load
     * @param presets all the presets to load with options
     */
    constructor(id: string, params?: RecursivePartial<IOptions>, ...presets: string[]) {
        this.started = false;
        this.destroyed = false;
        this.id = id;
        this.paused = true;
        this.sourceOptions = params;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this);
        this.polygon = new PolygonMask(this);
        this.drawer = new FrameManager(this);
        this.interactivity = {
            mouse: {},
        };
        this.images = [];
        this.bubble = {};
        this.repulse = {};

        /* tsParticles variables with default values */
        this.options = new Options();

        for (const preset of presets) {
            this.options.load(Presets.getPreset(preset));
        }

        /* params settings */
        if (this.sourceOptions) {
            this.options.load(this.sourceOptions);
        }

        /* ---------- tsParticles - start ------------ */
        this.eventListeners = new EventListeners(this);
    }

    public static requestFrame(callback: FrameRequestCallback): number {
        return window.customRequestAnimationFrame(callback);
    }

    public static cancelAnimation(handle: number): void {
        window.cancelAnimationFrame(handle);
    }

    public play(): void {
        if (this.paused) {
            this.lastFrameTime = performance.now();
            this.paused = false;
        }

        this.drawAnimationFrame = Container.requestFrame((t) => this.drawer.nextFrame(t));
    }

    public pause(): void {
        if (this.drawAnimationFrame !== undefined) {
            Container.cancelAnimation(this.drawAnimationFrame);

            delete this.drawAnimationFrame;

            this.paused = true;
        }
    }

    /* ---------- tsParticles functions - vendors ------------ */

    public densityAutoParticles(): void {
        if (!(this.canvas.element && this.options.particles.number.density.enable)) {
            return;
        }

        let area = this.canvas.element.width * this.canvas.element.height / 1000;

        if (this.retina.isRetina) {
            area /= this.retina.pxRatio * 2;
        }

        const optParticlesNumber = this.options.particles.number.value;
        const density = this.options.particles.number.density.area;
        const particlesNumber = area * optParticlesNumber / density;
        const particlesCount = this.particles.count;

        if (particlesCount < particlesNumber) {
            this.particles.push(Math.abs(particlesNumber - particlesCount));
        } else if (particlesCount > particlesNumber) {
            this.particles.removeQuantity(particlesCount - particlesNumber);
        }
    }

    public destroy(): void {
        this.stop();

        this.retina.reset();
        this.canvas.destroy();

        delete this.interactivity;
        delete this.options;
        delete this.retina;
        delete this.canvas;
        delete this.particles;
        delete this.polygon;
        delete this.bubble;
        delete this.repulse;
        delete this.images;
        delete this.drawer;
        delete this.eventListeners;

        this.destroyed = true;
    }

    /**
     * @deprecated this method is deprecated, please use the exportImage method
     */
    public exportImg(callback: BlobCallback): void {
        this.exportImage(callback);
    }

    public exportImage(callback: BlobCallback, type?: string, quality?: number): void {
        return this.canvas.element?.toBlob(callback, type ?? "image/png", quality);
    }

    public exportConfiguration(): string {
        return JSON.stringify(this.options, undefined, 2);
    }

    public loadImage(image: IImage, optionsImage: ImageShape): Promise<void> {
        return new Promise((resolve: (value?: void | PromiseLike<void> | undefined) => void,
            reject: (reson?: any) => void) => {
            image.error = false;

            if (optionsImage.src) {
                const img = new Image();

                img.addEventListener("load", () => {
                    image.obj = img;

                    resolve();
                });

                img.addEventListener("error", () => {
                    image.error = true;

                    reject(`Error tsParticles - loading image: ${optionsImage.src}`);
                });

                img.src = optionsImage.src;
            } else {
                image.error = true;

                reject("Error tsParticles - No image.src");
            }
        });
    }

    public async refresh(): Promise<void> {
        /* restart */
        this.stop();
        await this.start();
    }

    public stop(): void {
        if (!this.started) {
            return;
        }

        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.images = [];
        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();
        this.polygon.reset();

        delete this.particles.lineLinkedColor;
    }

    public async start(): Promise<void> {
        if (this.started) {
            return;
        }

        this.started = true;

        this.eventListeners.addListeners();

        await this.polygon.init();

        if (Utils.isInArray(ShapeType.char, this.options.particles.shape.type) ||
            Utils.isInArray(ShapeType.character, this.options.particles.shape.type)) {
            if (this.options.particles.shape.character instanceof Array) {
                for (const character of this.options.particles.shape.character) {
                    await Utils.loadFont(character);
                }
            } else {
                const character = this.options.particles.shape.character;
                await Utils.loadFont(character);
            }
        }

        if (Utils.isInArray(ShapeType.image, this.options.particles.shape.type)) {
            if (this.options.particles.shape.image instanceof Array) {
                for (const optionsImage of this.options.particles.shape.image) {
                    await this.loadImageShape(optionsImage);
                }
            } else {
                await this.loadImageShape(this.options.particles.shape.image);
            }
        }

        this.checkBeforeDraw();
    }

    private async loadImageShape(imageShape: IImageShape): Promise<void> {
        const src = imageShape.src;
        const image: IImage = { error: false };

        image.type = src.substr(src.length - 3);

        await this.loadImage(image, imageShape);

        this.images.push(image);
    }

    private init(): void {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.particles.init();
        this.densityAutoParticles();
    }

    private checkBeforeDraw(): void {
        if (this.options.particles.shape.type === ShapeType.image) {
            if (this.images.every((img) => img.error)) {
                return;
            }
        }

        this.init();
        this.play();
    }
}
