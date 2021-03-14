/**
 * [[include:Container.md]]
 * @packageDocumentation
 */
import { Canvas } from "./Canvas";
import type {
    IAttract,
    IBubble,
    IContainerInteractivity,
    IMovePathGenerator,
    IRepulse,
    IRgb,
    IShapeDrawer,
} from "./Interfaces";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import type { IOptions } from "../Options/Interfaces/IOptions";
import { FrameManager } from "./FrameManager";
import type { RecursivePartial } from "../Types";
import { Options } from "../Options/Classes/Options";
import type { IContainerPlugin } from "./Interfaces";
import { animate, cancelAnimation, EventListeners, isSsr, Plugins } from "../Utils";
import { Particle } from "./Particle";
import { Vector } from "./Particle/Vector";

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 * @category Core
 */
export class Container {
    /**
     * Check if the particles container is started
     */
    public started;

    /**
     * Check if the particles container is destroyed, if so it's not recommended using it
     */
    public destroyed;

    public pageHidden;
    public lastFrameTime;
    public fpsLimit;
    public interactivity: IContainerInteractivity;
    public bubble: IBubble;
    public repulse: IRepulse;
    public attract: IAttract;
    public readonly zLayers = 10000;

    /**
     * All the options loaded into the container, it's a full [[Options]] object
     */
    public readonly fullOptions;

    /**
     * The options currently used by the container, it's a full [[Options]] object
     */
    public actualOptions;

    public readonly retina;
    public readonly canvas;

    /**
     * The particles manager
     */
    public readonly particles;

    public readonly drawer;

    /**
     * All the shape drawers used by the container
     */
    public readonly drawers;

    /**
     * All the plugins used by the container
     */
    public readonly plugins;

    public readonly pathGenerator: IMovePathGenerator;

    private paused;
    private firstStart;
    private drawAnimationFrame?: number;

    private readonly eventListeners;
    private readonly intersectionObserver?;

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
        this.fpsLimit = 60;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this);
        this.drawer = new FrameManager(this);
        this.pathGenerator = {
            generate: (): Vector => {
                const v = Vector.create(0, 0);

                v.angle = Math.random() * Math.PI * 2;
                v.length = Math.random();

                return v;
            },
            init: (): void => {
                // nothing required
            },
            update: (): void => {
                // nothing required
            },
        };
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.bubble = {};
        this.repulse = { particles: [] };
        this.attract = { particles: [] };
        this.plugins = new Map<string, IContainerPlugin>();
        this.drawers = new Map<string, IShapeDrawer>();

        /* tsParticles variables with default values */
        this.fullOptions = new Options();
        this.actualOptions = new Options();

        for (const preset of presets) {
            this.fullOptions.load(Plugins.getPreset(preset));
        }

        const shapes = Plugins.getSupportedShapes();

        for (const type of shapes) {
            const drawer = Plugins.getShapeDrawer(type);

            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }

        /* options settings */
        if (this.sourceOptions) {
            this.fullOptions.load(this.sourceOptions);
        }

        this.fpsLimit = this.fullOptions.fpsLimit > 0 ? this.fullOptions.fpsLimit : 60;

        /* ---------- tsParticles - start ------------ */
        this.eventListeners = new EventListeners(this);

        if (!isSsr() && typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
        }
    }

    /**
     * Starts animations and resume from pause
     * @param force
     */
    public play(force?: boolean): void {
        const needsUpdate = this.paused || force;

        if (this.firstStart && !this.actualOptions.autoPlay) {
            this.firstStart = false;
            return;
        }

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

    /**
     * Pauses animations
     */
    public pause(): void {
        if (this.drawAnimationFrame !== undefined) {
            cancelAnimation()(this.drawAnimationFrame);

            delete this.drawAnimationFrame;
        }

        if (this.paused) {
            return;
        }

        for (const [, plugin] of this.plugins) {
            if (plugin.pause) {
                plugin.pause();
            }
        }

        if (!this.pageHidden) {
            this.paused = true;
        }
    }

    /**
     * Draws a frame
     */
    public draw(): void {
        this.drawAnimationFrame = animate()((timestamp) => this.drawer.nextFrame(timestamp));
    }

    /**
     * Gets the animation status
     * @returns `true` is playing, `false` is paused
     */
    public getAnimationStatus(): boolean {
        return !this.paused;
    }

    /**
     * Customise path generation
     * @param pathOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
     * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
     * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
     */
    public setPath(
        pathOrGenerator?: IMovePathGenerator | ((particle: Particle) => Vector),
        init?: () => void,
        update?: () => void
    ): void {
        if (!pathOrGenerator) {
            return;
        }

        if (typeof pathOrGenerator === "function") {
            this.pathGenerator.generate = pathOrGenerator;

            if (init) {
                this.pathGenerator.init = init;
            }

            if (update) {
                this.pathGenerator.update = update;
            }
        } else {
            if (pathOrGenerator.generate) {
                this.pathGenerator.generate = pathOrGenerator.generate;
            }

            if (pathOrGenerator.init) {
                this.pathGenerator.init = pathOrGenerator.init;
            }

            if (pathOrGenerator.update) {
                this.pathGenerator.update = pathOrGenerator.update;
            }
        }
    }

    /**
     * Destroys the current container, invalidating it
     */
    public destroy(): void {
        this.stop();

        this.canvas.destroy();

        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }

        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }

        this.destroyed = true;
    }

    /**
     * @deprecated this method is deprecated, please use the exportImage method
     * @param callback The callback to handle the image
     */
    public exportImg(callback: BlobCallback): void {
        this.exportImage(callback);
    }

    /**
     * Exports the current canvas image, `background` property of `options` won't be rendered because it's css related
     * @param callback The callback to handle the image
     * @param type The exported image type
     * @param quality The exported image quality
     */
    public exportImage(callback: BlobCallback, type?: string, quality?: number): void {
        return this.canvas.element?.toBlob(callback, type ?? "image/png", quality);
    }

    /**
     * Exports the current configuration using `options` property
     * @returns a JSON string created from `options` property
     */
    public exportConfiguration(): string {
        return JSON.stringify(this.actualOptions, undefined, 2);
    }

    /**
     * Restarts the container, just a [[stop]]/[[start]] alias
     */
    public async refresh(): Promise<void> {
        /* restart */
        this.stop();

        return this.start();
    }

    /**
     * Stops the container, opposite to `start`. Clears some resources and stops events.
     */
    public stop(): void {
        if (!this.started) {
            return;
        }

        this.firstStart = true;
        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();

        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.observe(this.interactivity.element);
        }

        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }

        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }

        this.particles.linksColors = new Map<string, IRgb | string | undefined>();

        delete this.particles.grabLineColor;
        delete this.particles.linksColor;
    }

    /**
     * Loads the given theme, overriding the options
     * @param name the theme name, if `undefined` resets the default options or the default theme
     */
    public async loadTheme(name?: string): Promise<void> {
        this.actualOptions.setTheme(name);

        return this.refresh();
    }

    /**
     * Starts the container, initializes what are needed to create animations and event handling
     */
    public async start(): Promise<void> {
        if (this.started) {
            return;
        }

        await this.init();

        this.started = true;

        this.eventListeners.addListeners();

        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.observe(this.interactivity.element);
        }

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
        this.actualOptions = new Options();
        this.actualOptions.load(this.fullOptions);

        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();

        this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this.fullOptions);
        this.actualOptions.setTheme(undefined);

        /* this re-init is necessary since options could have different values */
        this.retina.init();
        this.canvas.init();

        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 60;

        const availablePlugins = Plugins.getAvailablePlugins(this);

        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }

        const drawerPromises: Promise<void>[] = [];

        for (const [, drawer] of this.drawers) {
            if (drawer.init) {
                drawerPromises.push(drawer.init(this));
            }
        }

        await Promise.allSettled(drawerPromises);

        for (const [, plugin] of this.plugins) {
            if (plugin.init) {
                plugin.init(this.actualOptions);
            } else if (plugin.initAsync !== undefined) {
                await plugin.initAsync(this.actualOptions);
            }
        }

        this.particles.init();
        this.particles.setDensity();

        for (const [, plugin] of this.plugins) {
            if (plugin.particlesSetup !== undefined) {
                plugin.particlesSetup();
            }
        }
    }

    private intersectionManager(entries: IntersectionObserverEntry[]) {
        if (!this.actualOptions.pauseOnOutsideViewport) {
            return;
        }

        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }

            if (entry.isIntersecting) {
                this.play();
            } else {
                this.pause();
            }
        }
    }
}
