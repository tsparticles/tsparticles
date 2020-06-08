import { Canvas } from "./Canvas";
import type { IRepulse } from "./Interfaces/IRepulse";
import type { IBubble } from "./Interfaces/IBubble";
import type { IContainerInteractivity } from "./Interfaces/IContainerInteractivity";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import type { IOptions } from "../Options/Interfaces/IOptions";
import { FrameManager } from "./FrameManager";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Options } from "../Options/Classes/Options";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import { EventListeners, Plugins } from "../Utils";
import { Particle } from "./Particle";
import { INoiseValue } from "./Interfaces/INoiseValue";
import { INoise } from "./Interfaces/INoise";

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export class Container {
    public interactivity: IContainerInteractivity;
    public options: Options;
    public retina: Retina;
    public canvas: Canvas;
    public drawers: Map<string, IShapeDrawer>;
    public particles: Particles;
    public plugins: Map<string, IContainerPlugin>;
    public bubble: IBubble;
    public repulse: IRepulse;
    public lastFrameTime: number;
    public pageHidden: boolean;
    public drawer?: FrameManager;
    public started: boolean;
    public destroyed: boolean;
    public density: number;

    public readonly noise: INoise;

    private paused: boolean;
    private drawAnimationFrame?: number;
    private eventListeners: EventListeners;

    /**
     * This is the core class, create an instance to have a new working particles manager
     * @constructor
     * @param id the id to identify this instance
     * @param sourceOptions the options to load
     * @param presets all the presets to load with options
     */
    constructor(
        public readonly id: string,
        public readonly sourceOptions?: RecursivePartial<IOptions>,
        ...presets: string[]
    ) {
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this);
        this.drawer = new FrameManager(this);
        this.noise = {
            init: (): void => {
                // nothing required
            },
            generate: (): INoiseValue => {
                return {
                    angle: Math.random() * Math.PI * 2,
                    length: Math.random(),
                };
            },
            update: (): void => {
                // nothing required
            },
        };
        this.interactivity = {
            mouse: {},
        };
        this.bubble = {};
        this.repulse = { particles: [] };
        this.plugins = new Map<string, IContainerPlugin>();
        this.drawers = new Map<string, IShapeDrawer>();
        this.density = 1;

        /* tsParticles variables with default values */
        this.options = new Options();

        for (const preset of presets) {
            this.options.load(Plugins.getPreset(preset));
        }

        const shapes = Plugins.getSupportedShapes();

        for (const type of shapes) {
            const drawer = Plugins.getShapeDrawer(type);

            if (drawer) {
                this.drawers.set(type, drawer);
            }
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

    public play(force?: boolean): void {
        const needsUpdate = this.paused || force;

        if (this.paused) {
            this.paused = false;
        }

        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }

            this.lastFrameTime = performance.now();
        }

        this.draw();
    }

    public pause(): void {
        if (this.drawAnimationFrame !== undefined) {
            Container.cancelAnimation(this.drawAnimationFrame);

            delete this.drawAnimationFrame;
        }

        if (!this.paused) {
            for (const [, plugin] of this.plugins) {
                if (plugin.pause) {
                    plugin.pause();
                }
            }

            if (!this.pageHidden) {
                this.paused = true;
            }
        }
    }

    public draw(): void {
        this.drawAnimationFrame = Container.requestFrame((t) => this.drawer?.nextFrame(t));
    }

    public getAnimationStatus(): boolean {
        return !this.paused;
    }

    public setNoise(
        noiseOrGenerator?: INoise | ((particle: Particle) => INoiseValue),
        init?: () => void,
        update?: () => void
    ): void {
        if (!noiseOrGenerator) {
            return;
        }

        if (typeof noiseOrGenerator === "function") {
            this.noise.generate = noiseOrGenerator;

            if (init) {
                this.noise.init = init;
            }

            if (update) {
                this.noise.update = update;
            }
        } else {
            if (noiseOrGenerator.generate) {
                this.noise.generate = noiseOrGenerator.generate;
            }

            if (noiseOrGenerator.init) {
                this.noise.init = noiseOrGenerator.init;
            }

            if (noiseOrGenerator.update) {
                this.noise.update = noiseOrGenerator.update;
            }
        }
    }

    /* ---------- tsParticles functions - vendors ------------ */

    public densityAutoParticles(): void {
        this.initDensityFactor();

        const numberOptions = this.options.particles.number;
        const optParticlesNumber = numberOptions.value;
        const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
        const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * this.density;
        const particlesCount = this.particles.count;

        if (particlesCount < particlesNumber) {
            this.particles.push(Math.abs(particlesNumber - particlesCount));
        } else if (particlesCount > particlesNumber) {
            this.particles.removeQuantity(particlesCount - particlesNumber);
        }
    }

    public initDensityFactor(): void {
        const densityOptions = this.options.particles.number.density;

        if (!this.canvas.element || !densityOptions.enable) {
            return;
        }

        const canvas = this.canvas.element;
        const pxRatio = this.retina.pixelRatio;

        this.density = (canvas.width * canvas.height) / (densityOptions.factor * pxRatio * densityOptions.area);
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
        delete this.bubble;
        delete this.repulse;
        delete this.drawer;
        delete this.eventListeners;

        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }

        this.drawers = new Map<string, IShapeDrawer>();
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
        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();

        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }

        this.plugins = new Map<string, IContainerPlugin>();
        this.particles.linksColors = {};

        delete this.particles.linksColor;
    }

    public async start(): Promise<void> {
        if (this.started) {
            return;
        }

        await this.init();

        this.started = true;

        this.eventListeners.addListeners();

        for (const [, plugin] of this.plugins) {
            if (plugin.startAsync !== undefined) {
                await plugin.startAsync();
            } else if (plugin.start !== undefined) {
                plugin.start();
            }
        }

        this.play();
    }

    private async init(): Promise<void> {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();

        const availablePlugins = Plugins.getAvailablePlugins(this);

        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }

        for (const [, drawer] of this.drawers) {
            if (drawer.init) {
                await drawer.init(this);
            }
        }

        for (const [, plugin] of this.plugins) {
            if (plugin.init) {
                plugin.init(this.options);
            } else if (plugin.initAsync !== undefined) {
                await plugin.initAsync(this.options);
            }
        }

        this.particles.init();
        this.densityAutoParticles();
    }
}
