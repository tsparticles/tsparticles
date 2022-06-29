import type { IHsl, IRgba } from "./Interfaces/Colors";
import { clear, drawParticle, drawParticlePlugin, drawPlugin, paintBase } from "../Utils/CanvasUtils";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils";
import type { Container } from "./Container";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { IDelta } from "./Interfaces/IDelta";
import type { IDimension } from "./Interfaces/IDimension";
import type { IParticleColorStyle } from "./Interfaces/IParticleColorStyle";
import type { IParticleTransformValues } from "./Interfaces/IParticleTransformValues";
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
    /**
     * The particles canvas context
     */
    #context: CanvasRenderingContext2D | null;

    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;

    resizeFactor?: IDimension;

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

    destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.draw((ctx) => {
            clear(ctx, this.size);
        });
    }

    draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        if (!this.#context) {
            return;
        }

        return cb(this.#context);
    }

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

        if (!pfColor && !psColor) {
            return;
        }

        let [fColor, sColor] = this.getPluginParticleColors(particle);

        if (!fColor || !sColor) {
            if (!fColor) {
                fColor = pfColor ? pfColor : undefined;
            }

            if (!sColor) {
                sColor = psColor ? psColor : undefined;
            }
        }

        const options = this.container.actualOptions,
            zIndexOptions = particle.options.zIndex,
            zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
            opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1,
            strokeOpacity = particle.stroke?.opacity ?? opacity,
            zOpacity = opacity * zOpacityFactor,
            zStrokeOpacity = strokeOpacity * zOpacityFactor;

        const colorStyles: IParticleColorStyle = {
            fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined,
        };

        colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;

        this.draw((ctx) => {
            const transform: IParticleTransformValues = {};

            const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
                container = this.container;

            for (const updater of container.particles.updaters) {
                if (updater.beforeDraw) {
                    updater.beforeDraw(particle);
                }

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
            }

            drawParticle(
                container,
                ctx,
                particle,
                delta,
                colorStyles,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                radius * zSizeFactor,
                zOpacity,
                particle.options.shadow,
                transform
            );

            for (const updater of container.particles.updaters) {
                if (updater.afterDraw) {
                    updater.afterDraw(particle);
                }
            }
        });
    }

    drawParticlePlugin(plugin: IContainerPlugin, particle: Particle, delta: IDelta): void {
        this.draw((ctx) => {
            drawParticlePlugin(ctx, plugin, particle, delta);
        });
    }

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
        this.paint();
    }

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

    async windowResize(): Promise<void> {
        if (!this.element) {
            return;
        }

        this.resize();

        const container = this.container,
            needsRefresh = container.updateActualOptions();

        /* density particles enabled */
        container.particles.setDensity();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }

        if (needsRefresh) {
            await container.refresh();
        }
    }

    private getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
        let fColor: IHsl | undefined, sColor: IHsl | undefined;

        for (const [, plugin] of this.container.plugins) {
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

        const originalStyle = this.originalStyle;

        if (options.fullScreen.enable) {
            this.originalStyle = deepExtend({}, element.style) as CSSStyleDeclaration;

            element.style.setProperty("position", "fixed", "important");
            element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
            element.style.setProperty("top", "0", "important");
            element.style.setProperty("left", "0", "important");
            element.style.setProperty("width", "100%", "important");
            element.style.setProperty("height", "100%", "important");
        } else if (originalStyle) {
            element.style.position = originalStyle.position;
            element.style.zIndex = originalStyle.zIndex;
            element.style.top = originalStyle.top;
            element.style.left = originalStyle.left;
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;
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
}
