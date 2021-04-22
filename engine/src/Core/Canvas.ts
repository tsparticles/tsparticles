import type { Container } from "./Container";
import type { IContainerPlugin, ICoordinates, IDelta, IDimension, IParticle, IRgb, IRgba } from "./Interfaces";
import {
    clear,
    colorToRgb,
    Constants,
    deepExtend,
    drawConnectLine,
    drawEllipse,
    drawGrabLine,
    drawParticle,
    drawParticlePlugin,
    drawPlugin,
    getStyleFromRgb,
    gradient,
    hslToRgb,
    paintBase,
} from "../Utils";
import type { Particle } from "./Particle";
import { OrbitType } from "../Enums/Types/OrbitType";

const noColor = "rgba(0, 0, 0, 0)";

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

    loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void {
        if (!canvas.className) {
            canvas.className = Constants.canvasClass;
        }

        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas = generatedCanvas ?? this.generatedCanvas;
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
        this.draw((ctx) => {
            const options = this.container.actualOptions;

            if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
                clear(ctx, this.size);

                this.paintBase(this.coverColor);
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
            this.paintBase(this.trailFillColor);
        } else {
            this.draw((ctx) => {
                clear(ctx, this.size);
            });
        }
    }

    windowResize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;

        container.canvas.resize();
        container.actualOptions.setResponsive(this.size.width, container.retina.pixelRatio, container.options);
        container.particles.setDensity();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }

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

            drawConnectLine(ctx, p1.linksWidth ?? this.container.retina.linksWidth, lineStyle, pos1, pos2);
        });
    }

    drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void {
        this.draw((ctx) => {
            const beginPos = particle.getPosition();

            drawGrabLine(
                ctx,
                particle.linksWidth ?? this.container.retina.linksWidth,
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

        const container = this.container;

        let [fColor, sColor] = this.getPluginParticleColors(particle);

        const pOptions = particle.options;
        const twinkle = pOptions.twinkle.particles;
        const twinkling = twinkle.enable && Math.random() < twinkle.frequency;

        if (!fColor || !sColor) {
            const twinkleRgb = colorToRgb(twinkle.color);

            if (!fColor) {
                fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : pfColor ? hslToRgb(pfColor) : undefined;
            }

            if (!sColor) {
                sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : psColor ? hslToRgb(psColor) : undefined;
            }
        }

        const options = container.actualOptions;
        const zIndexOptions = particle.options.zIndex;
        const zOpacityFactor = 1 - zIndexOptions.opacityRate * particle.zIndexFactor;
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;
        const strokeOpacity = particle.stroke.opacity ?? opacity;
        const zOpacity = opacity * zOpacityFactor;
        const fillColorValue = fColor !== undefined ? getStyleFromRgb(fColor, zOpacity) : undefined;

        if (!fillColorValue && !sColor) {
            return;
        }

        const zStrokeOpacity = strokeOpacity * zOpacityFactor;
        const strokeColorValue = sColor !== undefined ? getStyleFromRgb(sColor, zStrokeOpacity) : fillColorValue;
        const radius = particle.getRadius();

        if (radius <= 0) {
            return;
        }

        const orbitOptions = particle.options.orbit;
        const zSizeFactor = 1 - zIndexOptions.sizeRate * particle.zIndexFactor;

        this.draw((ctx) => {
            if (orbitOptions.enable) {
                this.drawOrbit(particle, OrbitType.back);
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
                particle.options.shadow
            );

            if (orbitOptions.enable) {
                this.drawOrbit(particle, OrbitType.front);
            }
        });
    }

    drawOrbit(particle: IParticle, type: string): void {
        const container = this.container;
        const orbitOptions = particle.options.orbit;

        let start: number;
        let end: number;

        if (type === OrbitType.back) {
            start = Math.PI / 2;
            end = (Math.PI * 3) / 2;
        } else if (type === OrbitType.front) {
            start = (Math.PI * 3) / 2;
            end = Math.PI / 2;
        } else {
            start = 0;
            end = 2 * Math.PI;
        }

        this.draw((ctx) => {
            drawEllipse(
                ctx,
                particle,
                particle.orbitColor ?? particle.getFillColor(),
                particle.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
                orbitOptions.opacity,
                orbitOptions.width,
                (particle.orbitRotation ?? 0) * container.retina.pixelRatio,
                start,
                end
            );
        });
    }

    draw(fn: (context: CanvasRenderingContext2D) => void) {
        if (!this.context) {
            return;
        }

        fn(this.context);
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

    private paintBase(baseColor?: IRgba): void {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        const options = this.container.actualOptions;
        const connectOptions = options.interactivity.modes.connect;

        return this.context ? gradient(this.context, p1, p2, connectOptions.links.opacity) : undefined;
    }

    private initBackground(): void {
        const options = this.container.actualOptions;
        const background = options.background;
        const element = this.element;
        const elementStyle = element?.style;

        if (!elementStyle) {
            return;
        }

        if (background.color) {
            const color = colorToRgb(background.color);

            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : noColor;
        } else {
            elementStyle.backgroundColor = noColor;
        }

        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
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

    private getPluginParticleColors(particle: Particle): (IRgb | undefined)[] {
        let fColor: IRgb | undefined;
        let sColor: IRgb | undefined;

        for (const [, plugin] of this.container.plugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = colorToRgb(plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor) {
                sColor = colorToRgb(plugin.particleStrokeColor(particle));
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
    }
}
