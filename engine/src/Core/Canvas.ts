import type { IHsl, IRgba } from "./Interfaces/Colors";
import { clear, drawParticle, drawParticlePlugin, drawPlugin, paintBase } from "../Utils/CanvasUtils";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils";
import type { Container } from "./Container";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { IDelta } from "./Interfaces/IDelta";
import type { IDimension } from "./Interfaces/IDimension";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues";
import type { IParticleUpdater } from "./Interfaces/IParticleUpdater";
import type { Particle } from "./Particle";
import { deepExtend } from "../Utils/Utils";
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
    #colorPlugins: IContainerPlugin[];

    /**
     * The particles canvas context
     */
    #context: CanvasRenderingContext2D | null;

    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;

    #postDrawUpdaters: IParticleUpdater[];
    #preDrawUpdaters: IParticleUpdater[];

    resizeFactor?: IDimension;

    #resizePlugins: IContainerPlugin[];

    /**
     * The particles canvas dimension
     */
    readonly size: IDimension;

    private coverColorStyle?: string;
    private generatedCanvas;
    private originalStyle?: CSSStyleDeclaration;
    private trailFillColor?: IRgba;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(private readonly container: Container) {
        this.size = {
            height: 0,
            width: 0,
        };

        this.#context = null;
        this.generatedCanvas = false;
        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];
        this.#resizePlugins = [];
        this.#colorPlugins = [];
    }

    /**
     * Clears the canvas content
     */
    clear(): void {
        const options = this.container.actualOptions,
            trail = options.particles.move.trail;

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
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
        if (this.generatedCanvas) {
            this.element?.remove();
        } else {
            this.resetOriginalStyle();
        }

        this.draw((ctx) => {
            clear(ctx, this.size);
        });

        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];
        this.#resizePlugins = [];
        this.#colorPlugins = [];
    }

    /**
     * Generic draw method, for drawing stuff on the canvas context
     * @param cb
     */
    draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        if (!this.#context) {
            return;
        }

        return cb(this.#context);
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

        let [fColor, sColor] = this.getPluginParticleColors(particle);

        if (!fColor || !sColor) {
            if (!fColor) {
                fColor = pfColor ? pfColor : undefined;
            }

            if (!sColor) {
                sColor = psColor ? psColor : undefined;
            }
        }

        if (!fColor || !sColor) {
            return;
        }

        this.draw((ctx) => {
            const options = this.container.actualOptions,
                zIndexOptions = particle.options.zIndex,
                zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
                opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1,
                strokeOpacity = particle.stroke?.opacity ?? opacity,
                zOpacity = opacity * zOpacityFactor,
                zStrokeOpacity = strokeOpacity * zOpacityFactor,
                transform: IParticleTransformValues = {},
                colorStyles: IParticleColorStyle = {
                    fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined,
                };

            colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;

            this.applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);

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

            this.applyPostDrawUpdaters(particle);
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
    init(): void {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
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
        this.#resizePlugins = [];

        for (const [, plugin] of this.container.plugins) {
            if (plugin.resize) {
                this.#resizePlugins.push(plugin);
            }

            if (plugin.particleFillColor || plugin.particleStrokeColor) {
                this.#colorPlugins.push(plugin);
            }
        }
    }

    /**
     * Initializes the updaters needed by canvas
     */
    initUpdaters(): void {
        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];

        for (const updater of this.container.particles.updaters) {
            if (updater.afterDraw) {
                this.#postDrawUpdaters.push(updater);
            }

            if (updater.getColorStyles && updater.getTransformValues && updater.beforeDraw) {
                this.#preDrawUpdaters.push(updater);
            }
        }
    }

    /**
     * Loads the canvas html element
     * @param canvas the canvas html element
     */
    loadCanvas(canvas: HTMLCanvasElement): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas =
            canvas.dataset && generatedAttribute in canvas.dataset
                ? canvas.dataset[generatedAttribute] === "true"
                : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = deepExtend({}, this.element.style) as CSSStyleDeclaration;
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;

        this.#context = this.element.getContext("2d");
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

                this.paintBase(this.coverColorStyle);
            } else {
                this.paintBase();
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

        this.applyResizePlugins();

        if (needsRefresh) {
            await container.refresh();
        }
    }

    private applyPostDrawUpdaters(particle: Particle): void {
        for (const updater of this.#postDrawUpdaters) {
            updater.afterDraw?.(particle);
        }
    }

    private applyPreDrawUpdaters(
        ctx: CanvasRenderingContext2D,
        particle: Particle,
        radius: number,
        zOpacity: number,
        colorStyles: IParticleColorStyle,
        transform: IParticleTransformValues
    ): void {
        for (const updater of this.#preDrawUpdaters) {
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

    private applyResizePlugins(): void {
        for (const plugin of this.#resizePlugins) {
            plugin.resize?.();
        }
    }

    private getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
        let fColor: IHsl | undefined, sColor: IHsl | undefined;

        for (const plugin of this.#colorPlugins) {
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

    private initCover(): void {
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

            this.coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
    }

    private initStyle(): void {
        const element = this.element,
            options = this.container.actualOptions;

        if (!element) {
            return;
        }

        if (options.fullScreen.enable) {
            this.originalStyle = deepExtend({}, element.style) as CSSStyleDeclaration;

            element.style.setProperty("position", "fixed", "important");
            element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
            element.style.setProperty("top", "0", "important");
            element.style.setProperty("left", "0", "important");
            element.style.setProperty("width", "100%", "important");
            element.style.setProperty("height", "100%", "important");
        } else {
            this.resetOriginalStyle();
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

    private initTrail(): void {
        const options = this.container.actualOptions,
            trail = options.particles.move.trail,
            fillColor = rangeColorToRgb(trail.fillColor);

        if (fillColor) {
            const trail = options.particles.move.trail;

            this.trailFillColor = {
                r: fillColor.r,
                g: fillColor.g,
                b: fillColor.b,
                a: 1 / trail.length,
            };
        }
    }

    private paintBase(baseColor?: string): void {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private resetOriginalStyle(): void {
        const element = this.element,
            originalStyle = this.originalStyle;

        if (element && originalStyle) {
            element.style.position = originalStyle.position;
            element.style.zIndex = originalStyle.zIndex;
            element.style.top = originalStyle.top;
            element.style.left = originalStyle.left;
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;
        }
    }
}
