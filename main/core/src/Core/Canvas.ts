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
import type { IOrbit } from "../Options/Interfaces/Particles/Orbit/IOrbit";

/**
 * Canvas manager
 * @category Core
 */
export class Canvas {
    /**
     * The particles canvas
     */
    public element?: HTMLCanvasElement;

    /**
     * The particles canvas dimension
     */
    public readonly size: IDimension;

    public resizeFactor?: IDimension;

    /**
     * The particles canvas context
     */
    private context: CanvasRenderingContext2D | null;
    private generatedCanvas;
    private coverColor?: IRgba;
    private trailFillColor?: IRgb;
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
    public init(): void {
        this.resize();

        const options = this.container.options;
        const element = this.element;

        if (element) {
            if (options.fullScreen.enable) {
                this.originalStyle = deepExtend({}, element.style) as CSSStyleDeclaration;

                element.style.position = "fixed";
                element.style.zIndex = options.fullScreen.zIndex.toString(10);
                element.style.top = "0";
                element.style.left = "0";
                element.style.width = "100%";
                element.style.height = "100%";
            } else {
                element.style.position = this.originalStyle?.position ?? "";
                element.style.zIndex = this.originalStyle?.zIndex ?? "";
                element.style.top = this.originalStyle?.top ?? "";
                element.style.left = this.originalStyle?.left ?? "";
                element.style.width = this.originalStyle?.width ?? "";
                element.style.height = this.originalStyle?.height ?? "";
            }
        }

        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const trail = options.particles.move.trail;

        const coverRgb = colorToRgb(color);

        this.coverColor =
            coverRgb !== undefined
                ? {
                      r: coverRgb.r,
                      g: coverRgb.g,
                      b: coverRgb.b,
                      a: cover.opacity,
                  }
                : undefined;
        this.trailFillColor = colorToRgb(trail.fillColor);

        this.initBackground();
        this.paint();
    }

    public loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void {
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

    public destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        if (this.context) {
            clear(this.context, this.size);
        }
    }

    /**
     * Paints the canvas background
     */
    public paint(): void {
        const options = this.container.options;

        if (!this.context) {
            return;
        }

        if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
            clear(this.context, this.size);
            this.paintBase(getStyleFromRgb(this.coverColor, this.coverColor.a));
        } else {
            this.paintBase();
        }
    }

    /**
     * Clears the canvas content
     */
    public clear(): void {
        const options = this.container.options;
        const trail = options.particles.move.trail;

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        } else if (this.context) {
            clear(this.context, this.size);
        }
    }

    public windowResize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;

        container.canvas.resize();

        container.options.setResponsive(this.size.width, container.retina.pixelRatio, container.fullOptions);

        /* density particles enabled */
        container.particles.setDensity();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }

    public resize(): void {
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

        this.resizeFactor = {
            width: size.width / oldSize.width,
            height: size.height / oldSize.height,
        };
    }

    public drawConnectLine(p1: IParticle, p2: IParticle): void {
        const lineStyle = this.lineStyle(p1, p2);

        if (!lineStyle) {
            return;
        }

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

        drawConnectLine(ctx, p1.linksWidth ?? this.container.retina.linksWidth, lineStyle, pos1, pos2);
    }

    public drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        const beginPos = particle.getPosition();

        drawGrabLine(ctx, particle.linksWidth ?? container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
    }

    public drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.spawning || particle.destroyed) {
            return;
        }

        const pfColor = particle.getFillColor();
        const psColor = particle.getStrokeColor() ?? pfColor;

        if (!pfColor && !psColor) {
            return;
        }

        const container = this.container;
        const options = container.options;
        const pOptions = particle.options;
        const radius = particle.getRadius();
        const twinkle = pOptions.twinkle.particles;
        const twinkleFreq = twinkle.frequency;
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;
        const strokeOpacity = particle.stroke.opacity ?? opacity;
        const twinkleRgb = colorToRgb(twinkle.color);

        let fColor: IRgb | undefined;
        let sColor: IRgb | undefined;

        for (const [, plugin] of container.plugins) {
            if (!fColor && plugin.particleFillColor !== undefined) {
                fColor = colorToRgb(plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor !== undefined) {
                sColor = colorToRgb(plugin.particleStrokeColor(particle));
            }

            if (fColor && sColor) {
                break;
            }
        }

        if (!fColor) {
            fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : pfColor ? hslToRgb(pfColor) : undefined;
        }

        if (!sColor) {
            sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : psColor ? hslToRgb(psColor) : undefined;
        }

        const zIndexOptions = particle.options.zIndex;
        const zOpacityFactor = 1 - zIndexOptions.opacityRate * particle.zIndexFactor;
        const zOpacity = opacity * zOpacityFactor;

        const fillColorValue = fColor !== undefined ? getStyleFromRgb(fColor, zOpacity) : undefined;

        if (!this.context || (!fillColorValue && !sColor)) {
            return;
        }

        const zStrokeOpacity = strokeOpacity * zOpacityFactor;
        const strokeColorValue = sColor !== undefined ? getStyleFromRgb(sColor, zStrokeOpacity) : fillColorValue;

        if (radius > 0) {
            const orbitOptions = particle.options.orbit;
            const zSizeFactor = 1 - zIndexOptions.sizeRate * particle.zIndexFactor;

            if (orbitOptions.enable) {
                this.drawOrbit(particle, orbitOptions, OrbitType.back);
            }

            drawParticle(
                this.container,
                this.context,
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
                this.drawOrbit(particle, orbitOptions, OrbitType.front);
            }
        }
    }

    public drawOrbit(particle: IParticle, orbitOptions: IOrbit, type: string): void {
        if (!this.context) {
            return;
        }

        const container = this.container;

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

        drawEllipse(
            this.context,
            particle,
            particle.orbitColor ?? particle.getFillColor(),
            particle.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
            orbitOptions.opacity,
            orbitOptions.width,
            (particle.orbitRotation ?? 0) * container.retina.pixelRatio,
            start,
            end
        );
    }

    public draw(fn: (context: CanvasRenderingContext2D) => void) {
        if (!this.context) {
            return;
        }

        fn(this.context);
    }

    public drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        this.draw((ctx) => {
            drawPlugin(ctx, plugin, delta);
        });
    }

    public drawParticlePlugin(plugin: IContainerPlugin, particle: Particle, delta: IDelta): void {
        this.draw((ctx) => {
            drawParticlePlugin(ctx, plugin, particle, delta);
        });
    }

    private paintBase(baseColor?: string): void {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        const options = this.container.options;
        const connectOptions = options.interactivity.modes.connect;

        if (this.context) {
            return gradient(this.context, p1, p2, connectOptions.links.opacity);
        }
    }

    private initBackground(): void {
        const options = this.container.options;
        const background = options.background;
        const element = this.element;

        if (!element) {
            return;
        }

        const elementStyle = element.style;

        if (background.color) {
            const color = colorToRgb(background.color);

            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "rgba(0, 0, 0, 0)";
        } else {
            elementStyle.backgroundColor = "rgba(0, 0, 0, 0)";
        }

        if (background.image) {
            elementStyle.backgroundImage = background.image;
        }

        if (background.position) {
            elementStyle.backgroundPosition = background.position;
        }

        if (background.repeat) {
            elementStyle.backgroundRepeat = background.repeat;
        }

        if (background.size) {
            elementStyle.backgroundSize = background.size;
        }
    }
}
