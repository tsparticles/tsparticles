import { Constants } from "./Utils/Constants";
import type { Container } from "./Container";
import type { IDimension } from "../Interfaces/IDimension";
import { Utils } from "./Utils/Utils";
import type { IRgb } from "../Interfaces/IRgb";
import type { Particle } from "./Particle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import { CanvasUtils } from "./Utils/CanvasUtils";
import { ColorUtils } from "./Utils/ColorUtils";
import type { IColor } from "../Interfaces/Options/Particles/IColor";
import type { IBackgroundMaskCover } from "../Interfaces/Options/BackgroundMask/IBackgroundMaskCover";

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
    public readonly dimension: IDimension;

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
        this.dimension = {
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
        this.size();

        const container = this.container;
        const options = container.options;
        const cover = options.backgroundMask.cover as IBackgroundMaskCover;
        const trail = options.particles.move.trail;

        this.coverColor = ColorUtils.colorToRgb(cover.color !== undefined ?
            cover.color :
            options.backgroundMask.cover as IColor);

        this.trailFillColor = typeof trail.fillColor === "string" ?
            ColorUtils.stringToRgb(trail.fillColor) :
            ColorUtils.colorToRgb(trail.fillColor);

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
        this.dimension.height = canvas.offsetHeight;
        this.dimension.width = canvas.offsetWidth;
        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }

    public destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        if (this.context) {
            CanvasUtils.clear(this.context, this.dimension);
        }
    }

    /**
     * Calculates the size of the canvas
     */
    public size(): void {
        if (this.element) {
            this.element.width = this.dimension.width;
            this.element.height = this.dimension.height;
        }
    }

    /**
     * Paints the canvas background
     */
    public paint(): void {
        const container = this.container;
        const options = container.options;

        if (this.context) {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                if (this.coverColor) {
                    this.paintBase(ColorUtils.getStyleFromColor(this.coverColor));
                } else {
                    this.paintBase();
                }
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
            CanvasUtils.clear(this.context, this.dimension);
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
        const path = polygon.polygonPath;
        const path2dSupported = polygon.path2DSupported;

        if (context) {
            if (path2dSupported && path && polygon.offset) {
                CanvasUtils.drawPolygonMaskPath(context, path, polygonDraw.stroke, polygon.offset);
            } else if (rawData) {
                CanvasUtils.drawPolygonMask(context, rawData, polygonDraw.stroke);
            }
        }
    }

    public drawLinkedLine(p1: Particle, p2: Particle, pos1: ICoordinates, pos2: ICoordinates, opacity: number): void {
        const container = this.container;
        const options = container.options;

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

        if (container.particles.lineLinkedColor === Constants.randomColorValue) {
            colorLine = ColorUtils.getRandomRgbColor();
        } else if (container.particles.lineLinkedColor == "mid" && p1.color && p2.color) {
            const sourceColor = p1.color;
            const destColor = p2.color;

            colorLine = {
                b: Math.floor(Utils.mix(sourceColor.b, destColor.b, p1.radius, p2.radius)),
                g: Math.floor(Utils.mix(sourceColor.g, destColor.g, p1.radius, p2.radius)),
                r: Math.floor(Utils.mix(sourceColor.r, destColor.r, p1.radius, p2.radius)),
            };
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb;
        }

        const width = container.retina.lineLinkedWidth;

        CanvasUtils.drawLineLinked(ctx,
            width,
            pos1,
            pos2,
            options.backgroundMask.enable,
            colorLine,
            opacity,
            options.particles.lineLinked.shadow);
    }

    public drawConnectLine(p1: Particle, p2: Particle): void {
        const lineStyle = this.lineStyle(p1, p2);

        if (!lineStyle) {
            return;
        }

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        CanvasUtils.drawConnectLine(ctx, this.container.retina.lineLinkedWidth, lineStyle, p1.position, p2.position);
    }

    public drawGrabLine(particle: Particle, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;
        const options = container.options;
        const optColor = options.particles.lineLinked.color;

        let lineColor = container.particles.lineLinkedColor ||
            (typeof optColor === "string" ? ColorUtils.stringToRgb(optColor) : ColorUtils.colorToRgb(optColor));

        if (lineColor == Constants.randomColorValue) {
            lineColor = ColorUtils.getRandomRgbColor();
        }

        container.particles.lineLinkedColor = lineColor;

        let colorLine: IRgb = { r: 127, g: 127, b: 127 };
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        if (container.particles.lineLinkedColor == Constants.randomColorValue) {
            colorLine = ColorUtils.getRandomRgbColor() || colorLine;
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb || colorLine;
        }

        const beginPos = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };

        CanvasUtils.drawGrabLine(ctx, container.retina.lineLinkedWidth, beginPos, mousePos, colorLine, opacity);
    }

    public drawParticle(particle: Particle): void {
        const container = this.container;
        const options = container.options;

        let colorValue: string | undefined;
        const radius = particle.bubbler.radius !== undefined ? particle.bubbler.radius : particle.radius;
        const opacity = particle.bubbler.opacity !== undefined ? particle.bubbler.opacity : particle.opacity.value;

        if (particle.color) {
            colorValue = ColorUtils.getStyleFromColor(particle.color, opacity);
        }

        if (!this.context || !colorValue) {
            return;
        }

        CanvasUtils.drawParticle(this.context,
            particle,
            colorValue,
            options.backgroundMask.enable,
            radius);
    }

    private paintBase(baseColor?: string): void {
        if (this.context) {
            CanvasUtils.paintBase(this.context, this.dimension, baseColor);
        }
    }

    private lineStyle(p1: Particle, p2: Particle): CanvasGradient | undefined {
        if (p1.color && p2.color) {
            const sourceRgb = p1.color;
            const destRgb = p2.color;
            const rgb = {
                b: Utils.mix(sourceRgb.b, destRgb.b, p1.radius, p2.radius),
                g: Utils.mix(sourceRgb.g, destRgb.g, p1.radius, p2.radius),
                r: Utils.mix(sourceRgb.r, destRgb.r, p1.radius, p2.radius),
            };

            const midColor = ColorUtils.getStyleFromColor(rgb);

            if (this.context) {
                return CanvasUtils.gradient(this.context, p1, p2, midColor);
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
            const color = typeof background.color === "string" ?
                ColorUtils.stringToRgb(background.color) :
                ColorUtils.colorToRgb(background.color);

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
