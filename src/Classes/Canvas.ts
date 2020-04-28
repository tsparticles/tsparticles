import { Constants } from "./Utils/Constants";
import type { Container } from "./Container";
import type { IDimension } from "../Interfaces/IDimension";
import type { IRgb } from "../Interfaces/IRgb";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import { CanvasUtils } from "./Utils/CanvasUtils";
import { ColorUtils } from "./Utils/ColorUtils";
import type { IParticle } from "../Interfaces/IParticle";
import type { Absorber } from "./Absorber";

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
     * The parent container
     */
    private readonly container: Container;

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
    constructor(container: Container) {
        this.container = container;
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

        const container = this.container;
        const options = container.options;
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
        if (this.element) {
            this.element.width = this.size.width;
            this.element.height = this.size.height;
        }
    }

    /**
     * Paints the canvas background
     */
    public paint(): void {
        const container = this.container;
        const options = container.options;

        if (this.context) {
            if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
                this.paintBase(ColorUtils.getStyleFromColor(this.coverColor));
            } else {
                this.paintBase();
            }
        }
    }

    /**
     * Clears the canvas content
     */
    public clear(): void {
        const container = this.container;
        const options = container.options;
        const trail = options.particles.move.trail;

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(ColorUtils.getStyleFromColor(this.trailFillColor, 1 / trail.length));
        } else if (this.context) {
            CanvasUtils.clear(this.context, this.size);
        }
    }

    public isPointInPath(path: Path2D, point: ICoordinates): boolean {
        return this.context?.isPointInPath(path, point.x, point.y) ?? false;
    }

    public drawPolygonMask(): void {
        const container = this.container;
        const options = container.options;
        const context = this.context;
        const polygonDraw = options.polygon.draw;
        const polygon = container.polygon;
        const rawData = polygon.raw;

        for (const path of polygon.paths) {
            const path2d = path.path2d;
            const path2dSupported = polygon.path2DSupported;

            if (context) {
                if (path2dSupported && path2d && polygon.offset) {
                    CanvasUtils.drawPolygonMaskPath(context, path2d, polygonDraw.stroke, polygon.offset);
                } else if (rawData) {
                    CanvasUtils.drawPolygonMask(context, rawData, polygonDraw.stroke);
                }
            }
        }
    }

    public drawAbsorber(absorber: Absorber): void {
        const ctx = this.context;

        if (!ctx) {
            return;
        }

        CanvasUtils.drawAbsorber(ctx, absorber);
    }

    public drawLinkedLine(p1: IParticle, p2: IParticle, opacity: number): void {
        const container = this.container;
        const options = container.options;
        const pos1 = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };
        const pos2 = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y,
        };

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

        const twinkle = options.particles.twinkle.lines;
        const twinkleFreq = twinkle.frequency;
        const twinkleColor = twinkle.color;
        const twinkleRgb = twinkleColor !== undefined ? ColorUtils.colorToRgb(twinkleColor) : undefined;
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;

        if (twinkling && twinkleRgb !== undefined) {
            colorLine = twinkleRgb;
            opacity = twinkle.opacity;
        } else if (container.particles.lineLinkedColor === Constants.randomColorValue) {
            colorLine = ColorUtils.getRandomRgbColor();
        } else if (container.particles.lineLinkedColor == "mid" && p1.color && p2.color) {
            const sourceColor = p1.color;
            const destColor = p2.color;

            colorLine = ColorUtils.mix(sourceColor, destColor, p1.size.value, p2.size.value);
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb;
        }

        const width = p1.lineLinkedWidth ?? container.retina.lineLinkedWidth;

        CanvasUtils.drawLineLinked(ctx,
            width,
            pos1,
            pos2,
            options.backgroundMask.enable,
            colorLine,
            opacity,
            p1.particlesOptions.lineLinked.shadow);
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

        const pos1 = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y
        };
        const pos2 = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y
        };

        CanvasUtils.drawConnectLine(ctx,
            p1.lineLinkedWidth ?? this.container.retina.lineLinkedWidth,
            lineStyle,
            pos1,
            pos2);
    }

    public drawGrabLine(particle: IParticle, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;
        const optColor = particle.particlesOptions.lineLinked.color;

        let lineColor = container.particles.grabLineColor ||
            (typeof optColor === "string" ? ColorUtils.stringToRgb(optColor) : ColorUtils.colorToRgb(optColor));

        if (lineColor == Constants.randomColorValue) {
            lineColor = ColorUtils.getRandomRgbColor();
        }

        container.particles.grabLineColor = lineColor;

        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        let colorLine: IRgb;

        if (container.particles.grabLineColor === Constants.randomColorValue) {
            colorLine = ColorUtils.getRandomRgbColor();
        } else {
            colorLine = container.particles.grabLineColor as IRgb;
        }

        if (colorLine === undefined) {
            return;
        }

        const beginPos = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };

        CanvasUtils.drawGrabLine(ctx,
            particle.lineLinkedWidth ?? container.retina.lineLinkedWidth,
            beginPos,
            mousePos,
            colorLine,
            opacity);
    }

    public drawParticle(particle: IParticle): void {
        const container = this.container;
        const options = container.options;

        const twinkle = particle.particlesOptions.twinkle.particles;
        const twinkleFreq = twinkle.frequency;
        const twinkleColor = typeof twinkle.color === "string" ? { value: twinkle.color } : twinkle.color;
        const twinkleRgb = twinkleColor !== undefined ? ColorUtils.colorToRgb(twinkleColor) : undefined;
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;
        const radius = particle.bubble.radius ?? particle.size.value;
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;
        const color = twinkling && twinkleRgb !== undefined ?
            twinkleRgb :
            particle.bubble.color ?? particle.color;

        const colorValue = color !== undefined ? ColorUtils.getStyleFromColor(color, opacity) : undefined;

        if (!this.context || !colorValue) {
            return;
        }

        CanvasUtils.drawParticle(this.context,
            particle,
            colorValue,
            options.backgroundMask.enable,
            radius,
            opacity,
            particle.particlesOptions.shadow);
    }

    private paintBase(baseColor?: string): void {
        if (this.context) {
            CanvasUtils.paintBase(this.context, this.size, baseColor);
        }
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        const container = this.container;
        const options = container.options;
        const connectOptions = options.interactivity.modes.connect;

        if (p1.color && p2.color) {
            if (this.context) {
                return CanvasUtils.gradient(this.context, p1, p2, connectOptions.lineLinked.opacity);
            }
        }
    }

    private initBackground(): void {
        const container = this.container;
        const options = container.options;
        const background = options.background;
        const element = this.element;

        if (!element) {
            return;
        }

        const elementStyle = element.style;

        if (background.color) {
            const color = ColorUtils.colorToRgb(background.color);

            if (color) {
                elementStyle.backgroundColor = ColorUtils.getStyleFromColor(color, background.opacity);
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
