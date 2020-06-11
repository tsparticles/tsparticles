import type { Container } from "./Container";
import type { IDimension } from "./Interfaces/IDimension";
import type { IRgb } from "./Interfaces/IRgb";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticle } from "./Interfaces/IParticle";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { ILink } from "./Interfaces/ILink";
import { CanvasUtils, ColorUtils, Constants } from "../Utils";

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
    private generatedCanvas: boolean;
    private coverColor?: IRgb;
    private trailFillColor?: IRgb;

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
        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const trail = options.particles.move.trail;

        this.coverColor = ColorUtils.colorToRgb(color);
        this.trailFillColor = ColorUtils.colorToRgb(trail.fillColor);

        this.paint();
    }

    public loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void {
        if (!canvas.className) {
            canvas.className = Constants.canvasClass;
        }

        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas = generatedCanvas ?? false;
        this.element = canvas;
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

        if (this.context) {
            if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
                this.paintBase(ColorUtils.getStyleFromRgb(this.coverColor));
            } else {
                this.paintBase();
            }
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

    public drawLinkTriangle(p1: IParticle, link1: ILink, link2: ILink): void {
        const container = this.container;
        const options = container.options;
        const p2 = link1.destination;
        const p3 = link2.destination;
        const triangleOptions = p1.particlesOptions.links.triangles;
        const opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const pos3 = p3.getPosition();

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        let colorTriangle = ColorUtils.colorToRgb(triangleOptions.color);

        if (!colorTriangle) {
            const linksOptions = p1.particlesOptions.links;
            const linkColor =
                linksOptions.id !== undefined
                    ? container.particles.linksColors[linksOptions.id]
                    : container.particles.linksColor;

            if (linkColor === Constants.randomColorValue) {
                colorTriangle = ColorUtils.getRandomRgbColor();
            } else if (linkColor === "mid") {
                const sourceColor = p1.getColor();
                const destColor = p2.getColor();

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
            colorTriangle,
            opacityTriangle
        );
    }

    public drawLinkLine(p1: IParticle, link: ILink): void {
        const container = this.container;
        const options = container.options;
        const p2 = link.destination;
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
                    ? container.particles.linksColors[linksOptions.id]
                    : container.particles.linksColor;

            if (linkColor === Constants.randomColorValue) {
                colorLine = ColorUtils.getRandomRgbColor();
            } else if (linkColor === "mid") {
                const sourceColor = p1.getColor();
                const destColor = p2.getColor();

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

    public drawParticle(particle: IParticle, delta: number): void {
        const pColor = particle.getColor();
        if (pColor === undefined) {
            return;
        }

        const options = this.container.options;
        const twinkle = particle.particlesOptions.twinkle.particles;
        const twinkleFreq = twinkle.frequency;
        const twinkleRgb = ColorUtils.colorToRgb(twinkle.color);
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;
        const radius = particle.bubble.radius ?? particle.size.value;
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;
        const infectionStage = particle.infectionStage;
        const infection = options.infection;
        const infectionStages = infection.stages;
        const infectionColor = infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
        const infectionRgb = ColorUtils.colorToRgb(infectionColor);
        const color = twinkling && twinkleRgb !== undefined ? twinkleRgb : infectionRgb ?? ColorUtils.hslToRgb(pColor);

        const colorValue = color !== undefined ? ColorUtils.getStyleFromRgb(color, opacity) : undefined;

        if (!this.context || !colorValue) {
            return;
        }

        if (particle.links.length > 0) {
            this.context.save();

            for (const link of particle.links) {
                if (particle.particlesOptions.links.triangles.enable) {
                    const links = particle.links.map((l) => l.destination);
                    const vertices = link.destination.links.filter((t) => links.indexOf(t.destination) >= 0);

                    if (vertices.length) {
                        for (const vertice of vertices) {
                            this.drawLinkTriangle(particle, link, vertice);
                        }
                    }
                }

                this.drawLinkLine(particle, link);
            }

            this.context.restore();
        }

        CanvasUtils.drawParticle(
            this.container,
            this.context,
            particle,
            delta,
            colorValue,
            options.backgroundMask.enable,
            radius,
            opacity,
            particle.particlesOptions.shadow
        );
    }

    public drawPlugin(plugin: IContainerPlugin, delta: number): void {
        if (!this.context) {
            return;
        }

        CanvasUtils.drawPlugin(this.context, plugin, delta);
    }

    private paintBase(baseColor?: string): void {
        if (this.context) {
            CanvasUtils.paintBase(this.context, this.size, baseColor);
        }
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
}
