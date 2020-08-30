import type { Container } from "./Container";
import type { IDimension } from "./Interfaces/IDimension";
import type { IRgb } from "./Interfaces/IRgb";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticle } from "./Interfaces/IParticle";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { ILink, ILinkTriangle } from "./Interfaces/ILink";
import { CanvasUtils, ColorUtils, Constants, NumberUtils, Utils } from "../Utils";
import type { Particle } from "./Particle";
import type { IDelta } from "./Interfaces/IDelta";
import type { IRgba } from "./Interfaces/IRgba";

/**
 * Canvas manager
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

        if (this.element) {
            if (options.backgroundMode.enable) {
                this.originalStyle = Utils.deepExtend({}, this.element.style) as CSSStyleDeclaration;

                this.element.style.position = "fixed";
                this.element.style.zIndex = options.backgroundMode.zIndex.toString(10);
                this.element.style.top = "0";
                this.element.style.left = "0";
                this.element.style.width = "100%";
                this.element.style.height = "100%";
            } else {
                this.element.style.position = this.originalStyle?.position ?? "";
                this.element.style.zIndex = this.originalStyle?.zIndex ?? "";
                this.element.style.top = this.originalStyle?.top ?? "";
                this.element.style.left = this.originalStyle?.left ?? "";
                this.element.style.width = this.originalStyle?.width ?? "";
                this.element.style.height = this.originalStyle?.height ?? "";
            }
        }

        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const trail = options.particles.move.trail;

        const coverRgb = ColorUtils.colorToRgb(color);

        this.coverColor =
            coverRgb !== undefined
                ? {
                      r: coverRgb.r,
                      g: coverRgb.g,
                      b: coverRgb.b,
                      a: cover.opacity,
                  }
                : undefined;
        this.trailFillColor = ColorUtils.colorToRgb(trail.fillColor);

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
        this.originalStyle = Utils.deepExtend({}, this.element.style) as CSSStyleDeclaration;
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
            CanvasUtils.clear(this.context, this.size);
        }
    }

    /**
     * Calculates the size of the canvas
     */
    public resize(): void {
        if (!this.element) {
            return;
        }

        this.element.width = this.size.width;
        this.element.height = this.size.height;
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
            CanvasUtils.clear(this.context, this.size);
            this.paintBase(ColorUtils.getStyleFromRgb(this.coverColor, this.coverColor.a));
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
            this.paintBase(ColorUtils.getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        } else if (this.context) {
            CanvasUtils.clear(this.context, this.size);
        }
    }

    public windowResize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;
        const options = container.options;
        const pxRatio = container.retina.pixelRatio;

        container.canvas.size.width = this.element.offsetWidth * pxRatio;
        container.canvas.size.height = this.element.offsetHeight * pxRatio;

        this.element.width = container.canvas.size.width;
        this.element.height = container.canvas.size.height;

        /* repaint canvas on anim disabled */
        if (!options.particles.move.enable) {
            container.particles.redraw();
        }

        /* density particles enabled */
        container.densityAutoParticles();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }

    public drawLinkLine(link: ILink): void {
        if (!link.visible) {
            return;
        }

        const container = this.container;
        const options = container.options;
        const p1 = link.edges[0];
        const p2 = link.edges[1];

        if (!p2) {
            return;
        }

        let opacity = link.opacity;

        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        let colorLine: IRgb | undefined;

        /*
         * particles connecting line color:
         *
         *  random: in blink mode : in every frame refresh the color would change
         *          hence resulting blinking of lines
         *  mid: in consent mode: sample particles color and get a mid level color
         *                        from those two for the connecting line color
         */

        const twinkle = p1.particlesOptions.twinkle.lines;

        if (twinkle.enable) {
            const twinkleFreq = twinkle.frequency;
            const twinkleRgb = ColorUtils.colorToRgb(twinkle.color);
            const twinkling = Math.random() < twinkleFreq;

            if (twinkling && twinkleRgb !== undefined) {
                colorLine = twinkleRgb;
                opacity = twinkle.opacity;
            }
        }

        if (!colorLine) {
            const linksOptions = p1.particlesOptions.links;
            const linkColor =
                linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;

            if (linkColor === Constants.randomColorValue) {
                colorLine = ColorUtils.getRandomRgbColor();
            } else if (linkColor === "mid") {
                const sourceColor = p1.getFillColor() ?? p1.getStrokeColor();
                const destColor = p2.getFillColor() ?? p2.getStrokeColor();

                if (sourceColor && destColor) {
                    colorLine = ColorUtils.mix(sourceColor, destColor, p1.size.value, p2.size.value);
                } else {
                    const hslColor = sourceColor ?? destColor;

                    if (!hslColor) {
                        return;
                    }

                    colorLine = ColorUtils.hslToRgb(hslColor);
                }
            } else {
                colorLine = linkColor as IRgb;
            }
        }

        const width = p1.linksWidth ?? container.retina.linksWidth;

        CanvasUtils.drawLinkLine(
            ctx,
            width,
            pos1,
            pos2,
            p1.particlesOptions.links.distance,
            container.canvas.size,
            p1.particlesOptions.links.warp,
            options.backgroundMask.enable,
            options.backgroundMask.composite,
            colorLine,
            opacity,
            p1.particlesOptions.links.shadow
        );
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

        CanvasUtils.drawConnectLine(ctx, p1.linksWidth ?? this.container.retina.linksWidth, lineStyle, pos1, pos2);
    }

    public drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        const beginPos = particle.getPosition();

        CanvasUtils.drawGrabLine(
            ctx,
            particle.linksWidth ?? container.retina.linksWidth,
            beginPos,
            mousePos,
            lineColor,
            opacity
        );
    }

    public drawParticleShadow(particle: Particle, mousePos: ICoordinates): void {
        if (!this.context) {
            return;
        }

        const radius = particle.bubble.radius ?? particle.size.value;

        CanvasUtils.drawParticleShadow(this.container, this.context, particle, radius, mousePos);
    }

    public drawLinks(): void {
        if (!this.context) {
            return;
        }

        const particles = this.container.particles;

        if (particles.links.length <= 0) {
            return;
        }

        this.context.save();

        const lineLinks = particles.links;

        for (const link of lineLinks) {
            const source = link.edges[0];
            const destination = link.edges[1];
            const distance = NumberUtils.getDistance(source.getPosition(), destination.getPosition());
            const optDistance =
                source.linksDistance ?? destination.linksDistance ?? this.container.retina.linksDistance;

            if (distance > optDistance) {
                particles.removeExactLink(link);
                continue;
            }

            this.drawLinkLine(link);
        }

        this.context.restore();
    }

    public drawLinkTriangles(): void {
        const particles = this.container.particles;

        for (const triangle of particles.triangles) {
            this.drawLinkTriangle(triangle);
        }
    }

    public drawLinkTriangle(triangle: ILinkTriangle): void {
        const container = this.container;
        const particles = container.particles;
        const options = container.options;

        const [p1, p2, p3] = triangle.vertices;

        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const pos3 = p3.getPosition();

        const link1 = particles.findLink(p1, p2);
        const link2 = !link1 ? undefined : particles.findLink(p1, p3);
        const link3 = !link1 || !link2 ? undefined : particles.findLink(p2, p3);

        if (!link1 || !link2 || !link3) {
            particles.removeTriangle(p1, p2, p3);

            return;
        }

        if (!triangle.visible) {
            return;
        }

        const triangleOptions = p1.particlesOptions.links.triangles;

        if (!triangleOptions.enable) {
            return;
        }

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        let colorTriangle = ColorUtils.colorToRgb(triangleOptions.color);

        if (!colorTriangle) {
            const linksOptions = p1.particlesOptions.links;
            const linkColor =
                linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;

            if (linkColor === Constants.randomColorValue) {
                colorTriangle = ColorUtils.getRandomRgbColor();
            } else if (linkColor === "mid") {
                const sourceColor = p1.getFillColor();
                const destColor = p2.getFillColor();

                if (sourceColor && destColor) {
                    colorTriangle = ColorUtils.mix(sourceColor, destColor, p1.size.value, p2.size.value);
                } else {
                    const hslColor = sourceColor ?? destColor;

                    if (!hslColor) {
                        return;
                    }

                    colorTriangle = ColorUtils.hslToRgb(hslColor);
                }
            } else {
                colorTriangle = linkColor as IRgb;
            }
        }

        const width = p1.linksWidth ?? container.retina.linksWidth;

        CanvasUtils.drawLinkTriangle(
            ctx,
            width,
            pos1,
            pos2,
            pos3,
            options.backgroundMask.enable,
            options.backgroundMask.composite,
            colorTriangle,
            triangle.opacity
        );
    }

    public drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.image?.loaded === false || particle.spawning || particle.destroyed) {
            return;
        }

        const pfColor = particle.getFillColor();
        const psColor = particle.getStrokeColor() ?? pfColor;

        if (!pfColor && !psColor) {
            return;
        }

        const options = this.container.options;
        const twinkle = particle.particlesOptions.twinkle.particles;
        const twinkleFreq = twinkle.frequency;
        const twinkleRgb = ColorUtils.colorToRgb(twinkle.color);
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;
        const radius = particle.bubble.radius ?? particle.size.value;
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;
        const infectionStage = particle.infecter.infectionStage;
        const infection = options.infection;
        const infectionStages = infection.stages;
        const infectionColor = infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
        const infectionRgb = ColorUtils.colorToRgb(infectionColor);
        const fColor =
            twinkling && twinkleRgb !== undefined
                ? twinkleRgb
                : infectionRgb ?? (pfColor ? ColorUtils.hslToRgb(pfColor) : undefined);
        const sColor =
            twinkling && twinkleRgb !== undefined
                ? twinkleRgb
                : infectionRgb ?? (psColor ? ColorUtils.hslToRgb(psColor) : undefined);

        const fillColorValue = fColor !== undefined ? ColorUtils.getStyleFromRgb(fColor, opacity) : undefined;

        if (!this.context || (!fillColorValue && !sColor)) {
            return;
        }

        const strokeColorValue =
            sColor !== undefined
                ? ColorUtils.getStyleFromRgb(sColor, particle.stroke.opacity ?? opacity)
                : fillColorValue;

        if (radius > 0) {
            CanvasUtils.drawParticle(
                this.container,
                this.context,
                particle,
                delta,
                fillColorValue,
                strokeColorValue,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                radius,
                opacity,
                particle.particlesOptions.shadow
            );
        }
    }

    public drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        if (!this.context) {
            return;
        }

        CanvasUtils.drawPlugin(this.context, plugin, delta);
    }

    private paintBase(baseColor?: string): void {
        if (!this.context) {
            return;
        }

        CanvasUtils.paintBase(this.context, this.size, baseColor);
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        const options = this.container.options;
        const connectOptions = options.interactivity.modes.connect;

        if (this.context) {
            return CanvasUtils.gradient(this.context, p1, p2, connectOptions.links.opacity);
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
            const color = ColorUtils.colorToRgb(background.color);

            if (color) {
                elementStyle.backgroundColor = ColorUtils.getStyleFromRgb(color, background.opacity);
            }
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

    public drawLight(mousePos: ICoordinates): void {
        if (!this.context) {
            return;
        }

        CanvasUtils.drawLight(this.container, this.context, mousePos);
    }
}
