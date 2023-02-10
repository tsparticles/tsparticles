import { clear, drawParticle, drawParticlePlugin, drawPlugin, paintBase, paintImage } from "../Utils/CanvasUtils";
import { deepExtend, isSsr } from "../Utils/Utils";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils";
import type { Container } from "./Container";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { IDelta } from "./Interfaces/IDelta";
import type { IDimension } from "./Interfaces/IDimension";
import type { IHsl } from "./Interfaces/Colors";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater";
import type { ITrailFillData } from "./Interfaces/ITrailFillData";
import type { Particle } from "./Particle";
import { generatedAttribute } from "./Utils/Constants";

function setTransformValue(
    factor: IParticleTransformValues,
    newFactor: IParticleTransformValues,
    key: keyof IParticleTransformValues
): void {
    const newValue = newFactor[key];

    if (newValue !== undefined) {
        factor[key] = (factor[key] ?? 1) * newValue;
    }
}

/**
 * Canvas manager
 * @category Core
 */
export class Canvas {
    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;

    resizeFactor?: IDimension;

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
    private _generated;
    private readonly _mutationObserver?: MutationObserver;
    private _originalStyle?: CSSStyleDeclaration;
    private _postDrawUpdaters: IParticleUpdater[];
    private _preDrawUpdaters: IParticleUpdater[];
    private _resizePlugins: IContainerPlugin[];
    private _trailFill?: ITrailFillData;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(private readonly container: Container) {
        this.size = {
            height: 0,
            width: 0,
        };

        this._context = null;
        this._generated = false;
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
        this._mutationObserver =
            !isSsr() && typeof MutationObserver !== "undefined"
                ? new MutationObserver((records) => {
                      for (const record of records) {
                          if (record.type === "attributes" && record.attributeName === "style") {
                              this._repairStyle();
                          }
                      }
                  })
                : undefined;
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
        } else if (trail.enable && trail.length > 0 && trailFill) {
            if (trailFill.color) {
                this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
            } else if (trailFill.image) {
                this._paintImage(trailFill.image, trailFill.opacity);
            }
        } else {
            this.draw((ctx) => {
                clear(ctx, this.size);
            });
        }
    }

    /**
     * Destroying object actions
     */
    destroy(): void {
        this._mutationObserver?.disconnect();

        if (this._generated) {
            this.element?.remove();
        } else {
            this._resetOriginalStyle();
        }

        this.stop();

        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
    }

    /**
     * Generic draw method, for drawing stuff on the canvas context
     * @param cb
     */
    draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        if (!this._context) {
            return;
        }

        return cb(this._context);
    }

    /**
     * Draws the specified particle in the canvas
     * @param particle the particle to draw
     * @param delta the frame delta time values
     */
    drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.spawning || particle.destroyed) {
            return;
        }

        const radius = particle.getRadius();

        if (radius <= 0) {
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

        this.draw((ctx) => {
            const options = this.container.actualOptions,
                zIndexOptions = particle.options.zIndex,
                zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
                opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1,
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
                container: this.container,
                context: ctx,
                particle,
                delta,
                colorStyles,
                backgroundMask: options.backgroundMask.enable,
                composite: options.backgroundMask.composite,
                radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
                opacity: zOpacity,
                shadow: particle.options.shadow,
                transform,
            });

            this._applyPostDrawUpdaters(particle);
        });
    }

    /**
     * Draws stuff using the given plugin, using the given particle
     * @param plugin the plugin to use for drawing stuff
     * @param particle the particle used
     * @param delta the frame delta time values
     */
    drawParticlePlugin(plugin: IContainerPlugin, particle: Particle, delta: IDelta): void {
        this.draw((ctx) => {
            drawParticlePlugin(ctx, plugin, particle, delta);
        });
    }

    /**
     * Draws stuff using the given plugin
     * @param plugin the plugin to use for drawing stuff
     * @param delta the frame delta time values
     */
    drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        this.draw((ctx) => {
            drawPlugin(ctx, plugin, delta);
        });
    }

    /**
     * Initializes the canvas element
     */
    async init(): Promise<void> {
        this.resize();
        this._initStyle();
        this._initCover();
        try {
            await this._initTrail();
        } catch (e) {
            console.error(e);
        }
        this.initBackground();

        if (this.element) {
            this._mutationObserver?.observe(this.element, { attributes: true });
        }

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
            element = this.element,
            elementStyle = element?.style;

        if (!elementStyle) {
            return;
        }

        if (background.color) {
            const color = rangeColorToRgb(background.color);

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

        for (const [, plugin] of this.container.plugins) {
            if (plugin.resize) {
                this._resizePlugins.push(plugin);
            }

            if (plugin.particleFillColor || plugin.particleStrokeColor) {
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

            if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
                this._preDrawUpdaters.push(updater);
            }
        }
    }

    /**
     * Loads the canvas html element
     * @param canvas the canvas html element
     */
    loadCanvas(canvas: HTMLCanvasElement): void {
        if (this._generated) {
            this.element?.remove();
        }

        this._generated =
            canvas.dataset && generatedAttribute in canvas.dataset
                ? canvas.dataset[generatedAttribute] === "true"
                : this._generated;
        this.element = canvas;
        this.element.ariaHidden = "true";
        this._originalStyle = deepExtend({}, this.element.style) as CSSStyleDeclaration;
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this._context = this.element.getContext("2d");
        this._mutationObserver?.observe(this.element, { attributes: true });
        this.container.retina.init();
        this.initBackground();
    }

    /**
     * Paints the canvas background
     */
    paint(): void {
        const options = this.container.actualOptions;

        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                clear(ctx, this.size);

                this._paintBase(this._coverColorStyle);
            } else {
                this._paintBase();
            }
        });
    }

    /**
     * Calculates the size of the canvas
     */
    resize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container,
            pxRatio = container.retina.pixelRatio,
            size = container.canvas.size,
            newSize = {
                width: this.element.offsetWidth * pxRatio,
                height: this.element.offsetHeight * pxRatio,
            };

        if (
            newSize.height === size.height &&
            newSize.width === size.width &&
            newSize.height === this.element.height &&
            newSize.width === this.element.width
        ) {
            return;
        }

        const oldSize = { ...size };

        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;

        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }

    stop(): void {
        this.draw((ctx) => {
            clear(ctx, this.size);
        });
    }

    /**
     * The window resize event handler
     */
    async windowResize(): Promise<void> {
        if (!this.element) {
            return;
        }

        this.resize();

        const container = this.container,
            needsRefresh = container.updateActualOptions();

        /* density particles enabled */
        container.particles.setDensity();

        this._applyResizePlugins();

        if (needsRefresh) {
            await container.refresh();
        }
    }

    private _applyPostDrawUpdaters(particle: Particle): void {
        for (const updater of this._postDrawUpdaters) {
            updater.afterDraw?.(particle);
        }
    }

    private _applyPreDrawUpdaters(
        ctx: CanvasRenderingContext2D,
        particle: Particle,
        radius: number,
        zOpacity: number,
        colorStyles: IParticleColorStyle,
        transform: IParticleTransformValues
    ): void {
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
    }

    private _applyResizePlugins(): void {
        for (const plugin of this._resizePlugins) {
            if (plugin.resize) {
                plugin.resize();
            }
        }
    }

    private _getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
        let fColor: IHsl | undefined, sColor: IHsl | undefined;

        for (const plugin of this._colorPlugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = rangeColorToHsl(plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor) {
                sColor = rangeColorToHsl(plugin.particleStrokeColor(particle));
            }

            if (fColor && sColor) {
                break;
            }
        }

        return [fColor, sColor];
    }

    private _initCover(): void {
        const options = this.container.actualOptions,
            cover = options.backgroundMask.cover,
            color = cover.color,
            coverRgb = rangeColorToRgb(color);

        if (coverRgb) {
            const coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };

            this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
    }

    private _initStyle(): void {
        const element = this.element,
            options = this.container.actualOptions;

        if (!element) {
            return;
        }

        if (this._fullScreen) {
            this._originalStyle = deepExtend({}, element.style) as CSSStyleDeclaration;

            this._setFullScreenStyle();
        } else {
            this._resetOriginalStyle();
        }

        for (const key in options.style) {
            if (!key || !options.style) {
                continue;
            }

            const value = options.style[key];

            if (!value) {
                continue;
            }

            element.style.setProperty(key, value, "important");
        }
    }

    private async _initTrail(): Promise<void> {
        const options = this.container.actualOptions,
            trail = options.particles.move.trail,
            trailFill = trail.fill;

        if (!trail.enable) {
            return;
        }

        if (trailFill.color) {
            const fillColor = rangeColorToRgb(trailFill.color);

            if (!fillColor) {
                return;
            }
            const trail = options.particles.move.trail;
            this._trailFill = {
                color: {
                    ...fillColor,
                },
                opacity: 1 / trail.length,
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
                        opacity: 1 / trail.length,
                    };
                    resolve();
                });

                img.addEventListener("error", (evt) => {
                    reject(evt.error);
                });

                img.src = trailFill.image;
            });
        }
    }

    private _paintBase(baseColor?: string): void {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private _paintImage(image: HTMLImageElement, opacity: number): void {
        this.draw((ctx) => {
            paintImage(ctx, this.size, image, opacity);
        });
    }

    private _repairStyle(): void {
        const element = this.element;

        if (!element) {
            return;
        }

        this._mutationObserver?.disconnect();

        this._initStyle();
        this.initBackground();

        this._mutationObserver?.observe(element, { attributes: true });
    }

    private _resetOriginalStyle(): void {
        const element = this.element,
            originalStyle = this._originalStyle;

        if (!(element && originalStyle)) {
            return;
        }

        element.style.position = originalStyle.position;
        element.style.zIndex = originalStyle.zIndex;
        element.style.top = originalStyle.top;
        element.style.left = originalStyle.left;
        element.style.width = originalStyle.width;
        element.style.height = originalStyle.height;
    }

    private _setFullScreenStyle(): void {
        const element = this.element;

        if (!element) {
            return;
        }

        const priority = "important";

        element.style.setProperty("position", "fixed", priority);
        element.style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
        element.style.setProperty("top", "0", priority);
        element.style.setProperty("left", "0", priority);
        element.style.setProperty("width", "100%", priority);
        element.style.setProperty("height", "100%", priority);
    }
}
