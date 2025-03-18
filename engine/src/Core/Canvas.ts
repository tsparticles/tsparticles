import { clear, drawParticle, drawParticlePlugin, drawPlugin, paintBase, paintImage } from "../Utils/CanvasUtils.js";
import { cloneStyle, getFullScreenStyle, getLogger, safeMutationObserver } from "../Utils/Utils.js";
import {
    defaultOpacity,
    defaultTransformValue,
    generatedAttribute,
    inverseFactorNumerator,
    minimumLength,
    minimumSize,
    zIndexFactorOffset,
} from "./Utils/Constants.js";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IDimension } from "./Interfaces/IDimension.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle.js";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues.js";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater.js";
import type { ITrailFillData } from "./Interfaces/ITrailFillData.js";
import type { Particle } from "./Particle.js";

/**
 * @param factor -
 * @param newFactor -
 * @param key -
 */
function setTransformValue(
    factor: IParticleTransformValues,
    newFactor: IParticleTransformValues,
    key: keyof IParticleTransformValues,
): void {
    const newValue = newFactor[key];

    if (newValue !== undefined) {
        factor[key] = (factor[key] ?? defaultTransformValue) * newValue;
    }
}

/**
 *
 * @param canvas -
 * @param style -
 * @param important -
 */
function setStyle(canvas: HTMLCanvasElement, style?: CSSStyleDeclaration, important = false): void {
    if (!style) {
        return;
    }

    const element = canvas;

    if (!element) {
        return;
    }

    const elementStyle = element.style;

    if (!elementStyle) {
        return;
    }

    const keys = new Set<string>();

    for (const key in elementStyle) {
        if (!Object.prototype.hasOwnProperty.call(elementStyle, key)) {
            continue;
        }

        keys.add(elementStyle[key]);
    }

    for (const key in style) {
        if (!Object.prototype.hasOwnProperty.call(style, key)) {
            continue;
        }

        keys.add(style[key]);
    }

    for (const key of keys) {
        const value = style.getPropertyValue(key);

        if (!value) {
            elementStyle.removeProperty(key);
        } else {
            elementStyle.setProperty(key, value, important ? "important" : "");
        }
    }
}

/**
 * Canvas manager
 */
export class Canvas {
    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;

    /**
     * The particles canvas dimension
     */
    readonly size: IDimension;

    private _colorPlugins: IContainerPlugin[];

    /**
     * The particles canvas context
     */
    private _context: CanvasRenderingContext2D | null;

    private _coverColorStyle?: string;
    private _coverImage?: { image: HTMLImageElement; opacity: number };
    private readonly _engine;
    private _generated;
    private _mutationObserver?: MutationObserver;
    private _originalStyle?: CSSStyleDeclaration;
    private _pointerEvents: string;
    private _postDrawUpdaters: IParticleUpdater[];
    private _preDrawUpdaters: IParticleUpdater[];
    private _resizePlugins: IContainerPlugin[];
    private readonly _standardSize: IDimension;
    private _trailFill?: ITrailFillData;

    /**
     * Constructor of canvas manager
     * @param container - the parent container
     * @param engine - the engine managing the whole library
     */
    constructor(
        private readonly container: Container,
        engine: Engine,
    ) {
        this._engine = engine;
        this._standardSize = {
            height: 0,
            width: 0,
        };

        const pxRatio = container.retina.pixelRatio,
            stdSize = this._standardSize;

        this.size = {
            height: stdSize.height * pxRatio,
            width: stdSize.width * pxRatio,
        };

        this._context = null;
        this._generated = false;
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
        this._pointerEvents = "none";
    }

    private get _fullScreen(): boolean {
        return this.container.actualOptions.fullScreen.enable;
    }

    /**
     * Clears the canvas content
     */
    clear(): void {
        const options = this.container.actualOptions,
            trail = options.particles.move.trail,
            trailFill = this._trailFill;

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > minimumLength && trailFill) {
            if (trailFill.color) {
                this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
            } else if (trailFill.image) {
                this._paintImage(trailFill.image, trailFill.opacity);
            }
        } else if (options.clear) {
            this.draw(ctx => {
                clear(ctx, this.size);
            });
        }
    }

    /**
     * Destroying object actions
     */
    destroy(): void {
        this.stop();

        if (this._generated) {
            const element = this.element;

            element?.remove();

            this.element = undefined;
        } else {
            this._resetOriginalStyle();
        }

        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
    }

    /**
     * Generic draw method, for drawing stuff on the canvas context
     * @param cb -
     * @returns the result of the callback
     */
    draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        const ctx = this._context;

        if (!ctx) {
            return;
        }

        return cb(ctx);
    }

    drawAsync<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        const ctx = this._context;

        if (!ctx) {
            return undefined;
        }

        return cb(ctx);
    }

    /**
     * Draws the specified particle in the canvas
     * @param particle - the particle to draw
     * @param delta - the frame delta time values
     */
    drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.spawning || particle.destroyed) {
            return;
        }

        const radius = particle.getRadius();

        if (radius <= minimumSize) {
            return;
        }

        const pfColor = particle.getFillColor(),
            psColor = particle.getStrokeColor() ?? pfColor;

        let [fColor, sColor] = this._getPluginParticleColors(particle);

        if (!fColor) {
            fColor = pfColor;
        }

        if (!sColor) {
            sColor = psColor;
        }

        if (!fColor && !sColor) {
            return;
        }

        this.draw((ctx): void => {
            const container = this.container,
                options = container.actualOptions,
                zIndexOptions = particle.options.zIndex,
                zIndexFactor = zIndexFactorOffset - particle.zIndexFactor,
                zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate,
                opacity = particle.bubble.opacity ?? particle.opacity?.value ?? defaultOpacity,
                strokeOpacity = particle.strokeOpacity ?? opacity,
                zOpacity = opacity * zOpacityFactor,
                zStrokeOpacity = strokeOpacity * zOpacityFactor,
                transform: IParticleTransformValues = {},
                colorStyles: IParticleColorStyle = {
                    fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined,
                };

            colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;

            this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);

            drawParticle({
                container,
                context: ctx,
                particle,
                delta,
                colorStyles,
                backgroundMask: options.backgroundMask.enable,
                composite: options.backgroundMask.composite,
                radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
                opacity: zOpacity,
                shadow: particle.options.shadow,
                transform,
            });

            this._applyPostDrawUpdaters(particle);
        });
    }

    /**
     * Draws stuff using the given plugin, using the given particle
     * @param plugin - the plugin to use for drawing stuff
     * @param particle - the particle used
     * @param delta - the frame delta time values
     */
    drawParticlePlugin(plugin: IContainerPlugin, particle: Particle, delta: IDelta): void {
        this.draw(ctx => drawParticlePlugin(ctx, plugin, particle, delta));
    }

    /**
     * Draws stuff using the given plugin
     * @param plugin - the plugin to use for drawing stuff
     * @param delta - the frame delta time values
     */
    drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        this.draw(ctx => drawPlugin(ctx, plugin, delta));
    }

    /**
     * Initializes the canvas element
     */
    async init(): Promise<void> {
        this._safeMutationObserver(obs => obs.disconnect());
        this._mutationObserver = safeMutationObserver(records => {
            for (const record of records) {
                if (record.type === "attributes" && record.attributeName === "style") {
                    this._repairStyle();
                }
            }
        });
        this.resize();
        this._initStyle();
        await this._initCover();

        try {
            await this._initTrail();
        } catch (e) {
            getLogger().error(e);
        }

        this.initBackground();

        this._safeMutationObserver(obs => {
            if (!this.element || !(this.element instanceof Node)) {
                return;
            }

            obs.observe(this.element, { attributes: true });
        });

        this.initUpdaters();
        this.initPlugins();
        this.paint();
    }

    /**
     * Initializes the canvas background
     */
    initBackground(): void {
        const options = this.container.actualOptions,
            background = options.background,
            element = this.element;

        if (!element) {
            return;
        }

        const elementStyle = element.style;

        if (!elementStyle) {
            return;
        }

        if (background.color) {
            const color = rangeColorToRgb(this._engine, background.color);

            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
        } else {
            elementStyle.backgroundColor = "";
        }

        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }

    /**
     * Initializes the plugins needed by canvas
     */
    initPlugins(): void {
        this._resizePlugins = [];

        for (const plugin of this.container.plugins.values()) {
            if (plugin.resize) {
                this._resizePlugins.push(plugin);
            }

            if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
                this._colorPlugins.push(plugin);
            }
        }
    }

    /**
     * Initializes the updaters needed by canvas
     */
    initUpdaters(): void {
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];

        for (const updater of this.container.particles.updaters) {
            if (updater.afterDraw) {
                this._postDrawUpdaters.push(updater);
            }

            if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
                this._preDrawUpdaters.push(updater);
            }
        }
    }

    /**
     * Loads the canvas html element
     * @param canvas - the canvas html element
     */
    loadCanvas(canvas: HTMLCanvasElement): void {
        if (this._generated && this.element) {
            this.element.remove();
        }

        this._generated =
            canvas.dataset && generatedAttribute in canvas.dataset
                ? canvas.dataset[generatedAttribute] === "true"
                : this._generated;
        this.element = canvas;
        this.element.ariaHidden = "true";
        this._originalStyle = cloneStyle(this.element.style);

        const standardSize = this._standardSize;

        standardSize.height = canvas.offsetHeight;
        standardSize.width = canvas.offsetWidth;

        const pxRatio = this.container.retina.pixelRatio,
            retinaSize = this.size;

        canvas.height = retinaSize.height = standardSize.height * pxRatio;
        canvas.width = retinaSize.width = standardSize.width * pxRatio;

        this._context = this.element.getContext("2d");

        this._safeMutationObserver(obs => obs.disconnect());

        this.container.retina.init();
        this.initBackground();

        this._safeMutationObserver(obs => {
            if (!this.element || !(this.element instanceof Node)) {
                return;
            }

            obs.observe(this.element, { attributes: true });
        });
    }

    /**
     * Paints the canvas background
     */
    paint(): void {
        const options = this.container.actualOptions;

        this.draw(ctx => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                clear(ctx, this.size);

                if (this._coverImage) {
                    this._paintImage(this._coverImage.image, this._coverImage.opacity);
                } else if (this._coverColorStyle) {
                    this._paintBase(this._coverColorStyle);
                } else {
                    this._paintBase();
                }
            } else {
                this._paintBase();
            }
        });
    }

    /**
     * Calculates the size of the canvas
     * @returns true if the size changed
     */
    resize(): boolean {
        if (!this.element) {
            return false;
        }

        const container = this.container,
            currentSize = container.canvas._standardSize,
            newSize = {
                width: this.element.offsetWidth,
                height: this.element.offsetHeight,
            },
            pxRatio = container.retina.pixelRatio,
            retinaSize = {
                width: newSize.width * pxRatio,
                height: newSize.height * pxRatio,
            };

        if (
            newSize.height === currentSize.height &&
            newSize.width === currentSize.width &&
            retinaSize.height === this.element.height &&
            retinaSize.width === this.element.width
        ) {
            return false;
        }

        const oldSize = { ...currentSize };

        currentSize.height = newSize.height;
        currentSize.width = newSize.width;

        const canvasSize = this.size;

        this.element.width = canvasSize.width = retinaSize.width;
        this.element.height = canvasSize.height = retinaSize.height;

        if (this.container.started) {
            container.particles.setResizeFactor({
                width: currentSize.width / oldSize.width,
                height: currentSize.height / oldSize.height,
            });
        }

        return true;
    }

    setPointerEvents(type: string): void {
        const element = this.element;

        if (!element) {
            return;
        }

        this._pointerEvents = type;
        this._repairStyle();
    }

    stop(): void {
        this._safeMutationObserver(obs => obs.disconnect());
        this._mutationObserver = undefined;

        this.draw(ctx => clear(ctx, this.size));
    }

    /**
     * The window resize event handler
     */
    async windowResize(): Promise<void> {
        if (!this.element || !this.resize()) {
            return;
        }

        const container = this.container,
            needsRefresh = container.updateActualOptions();

        /* density particles enabled */
        container.particles.setDensity();

        this._applyResizePlugins();

        if (needsRefresh) {
            await container.refresh();
        }
    }

    private readonly _applyPostDrawUpdaters: (particle: Particle) => void = particle => {
        for (const updater of this._postDrawUpdaters) {
            updater.afterDraw?.(particle);
        }
    };

    private readonly _applyPreDrawUpdaters: (
        ctx: CanvasRenderingContext2D,
        particle: Particle,
        radius: number,
        zOpacity: number,
        colorStyles: IParticleColorStyle,
        transform: IParticleTransformValues,
    ) => void = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
        for (const updater of this._preDrawUpdaters) {
            if (updater.getColorStyles) {
                const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);

                if (fill) {
                    colorStyles.fill = fill;
                }

                if (stroke) {
                    colorStyles.stroke = stroke;
                }
            }

            if (updater.getTransformValues) {
                const updaterTransform = updater.getTransformValues(particle);

                for (const key in updaterTransform) {
                    setTransformValue(transform, updaterTransform, key as keyof IParticleTransformValues);
                }
            }

            updater.beforeDraw?.(particle);
        }
    };

    private readonly _applyResizePlugins: () => void = () => {
        for (const plugin of this._resizePlugins) {
            plugin.resize?.();
        }
    };

    private readonly _getPluginParticleColors: (particle: Particle) => (IHsl | undefined)[] = particle => {
        let fColor: IHsl | undefined, sColor: IHsl | undefined;

        for (const plugin of this._colorPlugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = rangeColorToHsl(this._engine, plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor) {
                sColor = rangeColorToHsl(this._engine, plugin.particleStrokeColor(particle));
            }

            if (fColor && sColor) {
                break;
            }
        }

        return [fColor, sColor];
    };

    private readonly _initCover = async (): Promise<void> => {
        const options = this.container.actualOptions,
            cover = options.backgroundMask.cover,
            color = cover.color;

        if (color) {
            const coverRgb = rangeColorToRgb(this._engine, color);

            if (coverRgb) {
                const coverColor = {
                    ...coverRgb,
                    a: cover.opacity,
                };

                this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
            }
        } else {
            await new Promise<void>((resolve, reject) => {
                if (!cover.image) {
                    return;
                }

                const img = document.createElement("img");

                img.addEventListener("load", () => {
                    this._coverImage = {
                        image: img,
                        opacity: cover.opacity,
                    };

                    resolve();
                });

                img.addEventListener("error", evt => {
                    reject(evt.error);
                });

                img.src = cover.image;
            });
        }
    };

    private readonly _initStyle: () => void = () => {
        const element = this.element,
            options = this.container.actualOptions;

        if (!element) {
            return;
        }

        if (this._fullScreen) {
            this._setFullScreenStyle();
        } else {
            this._resetOriginalStyle();
        }

        for (const key in options.style) {
            if (!key || !options.style || !Object.prototype.hasOwnProperty.call(options.style, key)) {
                continue;
            }

            const value = options.style[key];

            if (!value) {
                continue;
            }

            element.style.setProperty(key, value, "important");
        }
    };

    private readonly _initTrail: () => Promise<void> = async () => {
        const options = this.container.actualOptions,
            trail = options.particles.move.trail,
            trailFill = trail.fill;

        if (!trail.enable) {
            return;
        }

        const opacity = inverseFactorNumerator / trail.length;

        if (trailFill.color) {
            const fillColor = rangeColorToRgb(this._engine, trailFill.color);

            if (!fillColor) {
                return;
            }

            this._trailFill = {
                color: {
                    ...fillColor,
                },
                opacity,
            };
        } else {
            await new Promise<void>((resolve, reject) => {
                if (!trailFill.image) {
                    return;
                }

                const img = document.createElement("img");

                img.addEventListener("load", () => {
                    this._trailFill = {
                        image: img,
                        opacity,
                    };

                    resolve();
                });

                img.addEventListener("error", evt => {
                    reject(evt.error);
                });

                img.src = trailFill.image;
            });
        }
    };

    private readonly _paintBase: (baseColor?: string) => void = baseColor => {
        this.draw(ctx => paintBase(ctx, this.size, baseColor));
    };

    private readonly _paintImage: (image: HTMLImageElement, opacity: number) => void = (image, opacity) => {
        this.draw(ctx => paintImage(ctx, this.size, image, opacity));
    };

    private readonly _repairStyle: () => void = () => {
        const element = this.element;

        if (!element) {
            return;
        }

        this._safeMutationObserver(observer => observer.disconnect());
        this._initStyle();
        this.initBackground();

        const pointerEvents = this._pointerEvents;

        element.style.pointerEvents = pointerEvents;
        element.setAttribute("pointer-events", pointerEvents);

        this._safeMutationObserver(observer => {
            if (!element || !(element instanceof Node)) {
                return;
            }

            observer.observe(element, { attributes: true });
        });
    };

    private readonly _resetOriginalStyle: () => void = () => {
        const element = this.element,
            originalStyle = this._originalStyle;

        if (!element || !originalStyle) {
            return;
        }

        setStyle(element, originalStyle, true);
    };

    private readonly _safeMutationObserver: (callback: (observer: MutationObserver) => void) => void = callback => {
        if (!this._mutationObserver) {
            return;
        }

        callback(this._mutationObserver);
    };

    private readonly _setFullScreenStyle: () => void = () => {
        const element = this.element;

        if (!element) {
            return;
        }

        setStyle(element, getFullScreenStyle(this.container.actualOptions.fullScreen.zIndex), true);
    };
}
