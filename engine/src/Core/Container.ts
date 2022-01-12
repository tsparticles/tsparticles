/**
 * [[include:Container.md]]
 * @packageDocumentation
 */
import { Canvas } from "./Canvas";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import type { IOptions, Options } from "../Options";
import type { RecursivePartial } from "../Types";
import { animate, cancelAnimation, getRangeValue, loadContainerOptions } from "../Utils";
import type { Particle } from "./Particle";
import { EventListeners, FrameManager, Plugins, Vector } from "./Utils";
import type {
    IContainerInteractivity,
    IContainerPlugin,
    ICoordinates,
    IMovePathGenerator,
    IRgb,
    IShapeDrawer,
} from "./Interfaces";
import { ClickMode, EventType } from "../Enums";
import { Engine } from "../engine";

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 * @category Core
 */
export class Container {
    /**
     * Check if the particles container is started
     */
    started;

    /**
     * Check if the particles container is destroyed, if so it's not recommended using it
     */
    destroyed;

    density;
    duration;
    pageHidden;
    lastFrameTime?: number;
    lifeTime;
    fpsLimit;
    interactivity: IContainerInteractivity;
    zLayers;
    responsiveMaxWidth?: number;

    #engine;

    /**
     * The options used by the container, it's a full [[Options]] object
     */
    get options(): Options {
        return this._options;
    }

    get sourceOptions(): RecursivePartial<IOptions> | undefined {
        return this._sourceOptions;
    }

    /**
     * The options loaded by the container, it's a full [[Options]] object
     */
    actualOptions;

    readonly retina;
    readonly canvas;

    /**
     * The particles manager
     */
    readonly particles;

    readonly drawer;

    /**
     * All the shape drawers used by the container
     */
    readonly drawers;

    /**
     * All the plugins used by the container
     */
    readonly plugins;

    readonly pathGenerator: IMovePathGenerator;

    private _options;
    private _sourceOptions;
    private readonly _initialSourceOptions;
    private paused;
    private firstStart;
    private currentTheme?: string;
    private drawAnimationFrame?: number;

    private readonly eventListeners;
    private readonly intersectionObserver?;

    /**
     * This is the core class, create an instance to have a new working particles manager
     * @constructor
     * @param engine the current engine instance
     * @param id the id to identify this instance
     * @param sourceOptions the options to load
     */
    constructor(engine: Engine, readonly id: string, sourceOptions?: RecursivePartial<IOptions>) {
        this.#engine = engine;
        this.fpsLimit = 60;
        this.duration = 0;
        this.lifeTime = 0;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this.#engine, this);
        this.drawer = new FrameManager(this);
        this.pathGenerator = {
            generate: (p: Particle): Vector => {
                const v = p.velocity.copy();

                v.angle += (v.length * Math.PI) / 180;

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
        this.plugins = new Map<string, IContainerPlugin>();
        this.drawers = new Map<string, IShapeDrawer>();
        this.density = 1;
        /* tsParticles variables with default values */
        this._options = loadContainerOptions();
        this.actualOptions = loadContainerOptions();

        /* ---------- tsParticles - start ------------ */
        this.eventListeners = new EventListeners(this);

        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
        }

        this.#engine.dispatchEvent(EventType.containerBuilt, { container: this });
    }

    /**
     * Starts animations and resume from pause
     * @param force
     */
    play(force?: boolean): void {
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
        }

        this.#engine.dispatchEvent(EventType.containerPlay, { container: this });

        this.draw(needsUpdate || false);
    }

    /**
     * Pauses animations
     */
    pause(): void {
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

        this.#engine.dispatchEvent(EventType.containerPaused, { container: this });
    }

    /**
     * Draws a frame
     */
    draw(force: boolean): void {
        let refreshTime = force;

        this.drawAnimationFrame = animate()((timestamp) => {
            if (refreshTime) {
                this.lastFrameTime = undefined;

                refreshTime = false;
            }

            this.drawer.nextFrame(timestamp);
        });
    }

    /**
     * Gets the animation status
     * @returns `true` is playing, `false` is paused
     */
    getAnimationStatus(): boolean {
        return !this.paused && !this.pageHidden;
    }

    /**
     * Customise path generation
     * @deprecated Use the new setPath
     * @param noiseOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
     * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
     * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
     */
    setNoise(
        noiseOrGenerator?: IMovePathGenerator | ((particle: Particle) => Vector),
        init?: () => void,
        update?: () => void
    ): void {
        this.setPath(noiseOrGenerator, init, update);
    }

    /**
     * Customise path generation
     * @param pathOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
     * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
     * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
     */
    setPath(
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
    destroy(): void {
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

        this.#engine.dispatchEvent(EventType.containerDestroyed, { container: this });
    }

    /**
     * @deprecated this method is deprecated, please use the exportImage method
     * @param callback The callback to handle the image
     */
    exportImg(callback: BlobCallback): void {
        this.exportImage(callback);
    }

    /**
     * Exports the current canvas image, `background` property of `options` won't be rendered because it's css related
     * @param callback The callback to handle the image
     * @param type The exported image type
     * @param quality The exported image quality
     */
    exportImage(callback: BlobCallback, type?: string, quality?: number): void {
        return this.canvas.element?.toBlob(callback, type ?? "image/png", quality);
    }

    /**
     * Exports the current configuration using `options` property
     * @returns a JSON string created from `options` property
     */
    exportConfiguration(): string {
        return JSON.stringify(this.actualOptions, undefined, 2);
    }

    /**
     * Restarts the container, just a [[stop]]/[[start]] alias
     */
    refresh(): Promise<void> {
        /* restart */
        this.stop();
        return this.start();
    }

    reset(): Promise<void> {
        this._options = loadContainerOptions();

        return this.refresh();
    }

    /**
     * Stops the container, opposite to `start`. Clears some resources and stops events.
     */
    stop(): void {
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

        this._sourceOptions = this._options;

        this.#engine.dispatchEvent(EventType.containerStopped, { container: this });
    }

    /**
     * Loads the given theme, overriding the options
     * @param name the theme name, if `undefined` resets the default options or the default theme
     */
    async loadTheme(name?: string): Promise<void> {
        this.currentTheme = name;

        await this.refresh();
    }

    /**
     * Starts the container, initializes what are needed to create animations and event handling
     */
    async start(): Promise<void> {
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

        this.#engine.dispatchEvent(EventType.containerStarted, { container: this });

        this.play();
    }

    addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
        const el = this.interactivity.element;

        if (!el) {
            return;
        }

        const clickOrTouchHandler = (e: Event, pos: ICoordinates, radius: number) => {
            if (this.destroyed) {
                return;
            }

            const pxRatio = this.retina.pixelRatio,
                posRetina = {
                    x: pos.x * pxRatio,
                    y: pos.y * pxRatio,
                },
                particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);

            callback(e, particles);
        };

        const clickHandler = (e: Event) => {
            if (this.destroyed) {
                return;
            }

            const mouseEvent = e as MouseEvent;
            const pos = {
                x: mouseEvent.offsetX || mouseEvent.clientX,
                y: mouseEvent.offsetY || mouseEvent.clientY,
            };

            clickOrTouchHandler(e, pos, 1);
        };

        const touchStartHandler = () => {
            if (this.destroyed) {
                return;
            }

            touched = true;
            touchMoved = false;
        };

        const touchMoveHandler = () => {
            if (this.destroyed) {
                return;
            }

            touchMoved = true;
        };

        const touchEndHandler = (e: Event) => {
            if (this.destroyed) {
                return;
            }

            if (touched && !touchMoved) {
                const touchEvent = e as TouchEvent;
                let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];

                if (!lastTouch) {
                    lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];

                    if (!lastTouch) {
                        return;
                    }
                }

                const canvasRect = this.canvas.element?.getBoundingClientRect();
                const pos = {
                    x: lastTouch.clientX - (canvasRect?.left ?? 0),
                    y: lastTouch.clientY - (canvasRect?.top ?? 0),
                };

                clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
            }

            touched = false;
            touchMoved = false;
        };

        const touchCancelHandler = () => {
            if (this.destroyed) {
                return;
            }

            touched = false;
            touchMoved = false;
        };

        let touched = false;
        let touchMoved = false;

        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
    }

    handleClickMode(mode: ClickMode | string): void {
        this.particles.handleClickMode(mode);

        for (const [, plugin] of this.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }

    updateActualOptions(): boolean {
        this.actualOptions.responsive = [];
        const newMaxWidth = this.actualOptions.setResponsive(
            this.canvas.size.width,
            this.retina.pixelRatio,
            this._options
        );
        this.actualOptions.setTheme(this.currentTheme);

        if (this.responsiveMaxWidth != newMaxWidth) {
            this.responsiveMaxWidth = newMaxWidth;

            return true;
        }

        return false;
    }

    async init(): Promise<void> {
        const shapes = Plugins.getSupportedShapes();

        for (const type of shapes) {
            const drawer = Plugins.getShapeDrawer(type);

            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }

        /* options settings */
        this._options = loadContainerOptions(this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = loadContainerOptions(this._options);

        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();

        this.updateActualOptions();

        this.canvas.initBackground();
        this.canvas.resize();

        this.zLayers = this.actualOptions.zLayers;

        this.duration = getRangeValue(this.actualOptions.duration);
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 60;

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
                plugin.init(this.actualOptions);
            } else if (plugin.initAsync !== undefined) {
                await plugin.initAsync(this.actualOptions);
            }
        }

        const pathOptions = this.actualOptions.particles.move.path;

        if (pathOptions.generator) {
            const customGenerator = Plugins.getPathGenerator(pathOptions.generator);

            if (customGenerator) {
                if (customGenerator.init) {
                    this.pathGenerator.init = customGenerator.init;
                }

                if (customGenerator.generate) {
                    this.pathGenerator.generate = customGenerator.generate;
                }

                if (customGenerator.update) {
                    this.pathGenerator.update = customGenerator.update;
                }
            }
        }

        this.#engine.dispatchEvent(EventType.containerInit, { container: this });

        this.particles.init();
        this.particles.setDensity();

        for (const [, plugin] of this.plugins) {
            if (plugin.particlesSetup !== undefined) {
                plugin.particlesSetup();
            }
        }

        this.#engine.dispatchEvent(EventType.particlesSetup, { container: this });
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
