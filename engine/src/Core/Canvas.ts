import type { Container } from "./Container";
import {
    colorToHsl,
    colorToRgb,
    Constants,
    deepExtend,
    drawConnectLine,
    drawGrabLine,
    drawParticle,
    drawParticlePlugin,
    drawPlugin,
    getStyleFromHsl,
    getStyleFromRgb,
    gradient,
    paintBase,
} from "../Utils";
import type { Particle } from "./Particle";
import { clear } from "../Utils";
import type { IContainerPlugin, ICoordinates, IDelta, IDimension, IHsl, IParticle, IRgb, IRgba } from "./Interfaces";

/**
 * Canvas manager
 * @category Core
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

    resizeFactor?: IDimension;

    /**
     * The particles canvas context
     */
    private context: CanvasRenderingContext2D | null;
    private generatedCanvas;
    private coverColor?: IRgba;
    private trailFillColor?: IRgba;
    private originalStyle?: CSSStyleDeclaration;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(private readonly container: Container) {
        this.size = {
            height: 0,
            width: 0,
        };

        this.context = null;
        this.generatedCanvas = false;
    }

    /* ---------- tsParticles functions - canvas ------------ */
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

    loadCanvas(canvas: HTMLCanvasElement): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas =
            canvas.dataset && Constants.generatedAttribute in canvas.dataset
                ? canvas.dataset[Constants.generatedAttribute] === "true"
                : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = deepExtend({}, this.element.style) as CSSStyleDeclaration;
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;

        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }

    destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.draw((ctx) => {
            clear(ctx, this.size);
        });
    }

    /**
     * Paints the canvas background
     */
    paint(): void {
        const options = this.container.actualOptions;

        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
                clear(ctx, this.size);

                this.paintBase(getStyleFromRgb(this.coverColor, this.coverColor.a));
            } else {
                this.paintBase();
            }
        });
    }

    /**
     * Clears the canvas content
     */
    clear(): void {
        const options = this.container.actualOptions;
        const trail = options.particles.move.trail;

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

    async windowResize(): Promise<void> {
        if (!this.element) {
            return;
        }

        const container = this.container;

        this.resize();

        const needsRefresh = container.updateActualOptions();

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

    /**
     * Calculates the size of the canvas
     */
    resize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const size = container.canvas.size;
        const oldSize = {
            width: size.width,
            height: size.height,
        };

        size.width = this.element.offsetWidth * pxRatio;
        size.height = this.element.offsetHeight * pxRatio;

        this.element.width = size.width;
        this.element.height = size.height;

        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }

    drawConnectLine(p1: IParticle, p2: IParticle): void {
        this.draw((ctx) => {
            const lineStyle = this.lineStyle(p1, p2);

            if (!lineStyle) {
                return;
            }

            const pos1 = p1.getPosition();
            const pos2 = p2.getPosition();

            drawConnectLine(ctx, p1.retina.linksWidth ?? this.container.retina.linksWidth, lineStyle, pos1, pos2);
        });
    }

    drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;

        this.draw((ctx) => {
            const beginPos = particle.getPosition();

            drawGrabLine(
                ctx,
                particle.retina.linksWidth ?? container.retina.linksWidth,
                beginPos,
                mousePos,
                lineColor,
                opacity
            );
        });
    }

    drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.spawning || particle.destroyed) {
            return;
        }

        const pfColor = particle.getFillColor();
        const psColor = particle.getStrokeColor() ?? pfColor;

        if (!pfColor && !psColor) {
            return;
        }

        let [fColor, sColor] = this.getPluginParticleColors(particle);

        const pOptions = particle.options;
        const twinkle = pOptions.twinkle.particles;
        const twinkling = twinkle.enable && Math.random() < twinkle.frequency;

        if (!fColor || !sColor) {
            const twinkleRgb = colorToHsl(twinkle.color);

            if (!fColor) {
                fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : pfColor ? pfColor : undefined;
            }

            if (!sColor) {
                sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : psColor ? psColor : undefined;
            }
        }

        const options = this.container.actualOptions;
        const zIndexOptions = particle.options.zIndex;
        const zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate;
        const radius = particle.getRadius();
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity?.value ?? 1;
        const strokeOpacity = particle.stroke?.opacity ?? opacity;
        const zOpacity = opacity * zOpacityFactor;
        const fillColorValue = fColor ? getStyleFromHsl(fColor, zOpacity) : undefined;

        if (!fillColorValue && !sColor) {
            return;
        }

        this.draw((ctx) => {
            const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate;

            const zStrokeOpacity = strokeOpacity * zOpacityFactor;
            const strokeColorValue = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : fillColorValue;

            if (radius <= 0) {
                return;
            }

            const container = this.container;

            for (const updater of container.particles.updaters) {
                if (updater.beforeDraw) {
                    updater.beforeDraw(particle);
                }
            }

            drawParticle(
                this.container,
                ctx,
                particle,
                delta,
                fillColorValue,
                strokeColorValue,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                radius * zSizeFactor,
                zOpacity,
                particle.options.shadow,
                particle.gradient
            );

            for (const updater of container.particles.updaters) {
                if (updater.afterDraw) {
                    updater.afterDraw(particle);
                }
            }
        });
    }

    drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        this.draw((ctx) => {
            drawPlugin(ctx, plugin, delta);
        });
    }

    drawParticlePlugin(plugin: IContainerPlugin, particle: Particle, delta: IDelta): void {
        this.draw((ctx) => {
            drawParticlePlugin(ctx, plugin, particle, delta);
        });
    }

    initBackground(): void {
        const options = this.container.actualOptions;
        const background = options.background;
        const element = this.element;
        const elementStyle = element?.style;

        if (!elementStyle) {
            return;
        }

        if (background.color) {
            const color = colorToRgb(background.color);

            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
        } else {
            elementStyle.backgroundColor = "";
        }

        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }

    draw<T>(cb: (context: CanvasRenderingContext2D) => T): T | undefined {
        if (!this.context) {
            return;
        }

        return cb(this.context);
    }

    private initCover(): void {
        const options = this.container.actualOptions;
        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const coverRgb = colorToRgb(color);

        if (coverRgb) {
            this.coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };
        }
    }

    private initTrail(): void {
        const options = this.container.actualOptions;
        const trail = options.particles.move.trail;
        const fillColor = colorToRgb(trail.fillColor);

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

    private getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
        let fColor: IHsl | undefined;
        let sColor: IHsl | undefined;

        for (const [, plugin] of this.container.plugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = colorToHsl(plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor) {
                sColor = colorToHsl(plugin.particleStrokeColor(particle));
            }

            if (fColor && sColor) {
                break;
            }
        }

        return [fColor, sColor];
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

            element.style.position = "fixed";
            element.style.zIndex = options.fullScreen.zIndex.toString(10);
            element.style.top = "0";
            element.style.left = "0";
            element.style.width = "100%";
            element.style.height = "100%";
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

            element.style[key] = value;
        }
    }

    private paintBase(baseColor?: string): void {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        return this.draw((ctx) => {
            const options = this.container.actualOptions;
            const connectOptions = options.interactivity.modes.connect;

            return gradient(ctx, p1, p2, connectOptions.links.opacity);
        });
    }
}
