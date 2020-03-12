"use strict";

import {Constants} from "./Utils/Constants";
import {Container} from "./Container";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {IDimension} from "../Interfaces/IDimension";
import {Utils} from "./Utils/Utils";
import {IRgb} from "../Interfaces/IRgb";
import {Particle} from "./Particle";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {CanvasUtils} from "./Utils/CanvasUtils";

/**
 * Canvas manager
 */
export class Canvas {
    /**
     * The particles canvas context
     */
    private readonly context: CanvasRenderingContext2D | null;

    /**
     * The particles canvas
     */
    public element: HTMLCanvasElement;
    /**
     * The particles canvas dimension
     */
    public dimension: IDimension;
    /**
     * The particles canvas container element id
     */
    public tagId: string;
    /**
     * The ratio used by the particles canvas
     */
    public pxRatio: number;

    /**
     * The parent container
     */
    private readonly container: Container;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     * @param tagId the particles container element id
     */
    constructor(container: Container, tagId: string) {
        const canvasEl = document.querySelector(`#${tagId} > .${Constants.canvasClass}`) as HTMLCanvasElement;

        this.container = container;
        this.element = canvasEl;
        this.dimension = {
            height: canvasEl.offsetHeight,
            width: canvasEl.offsetWidth,
        };
        this.tagId = tagId;
        this.pxRatio = 1;
        this.context = this.element.getContext("2d");
    }

    /* ---------- tsParticles functions - canvas ------------ */
    /**
     * Initializes the canvas element
     */
    public init(): void {
        this.size();
        this.paint();
    }

    /**
     * Calculates the size of the canvas
     */
    public size(): void {
        const container = this.container;
        const options = container.options;

        this.element.width = this.dimension.width;
        this.element.height = this.dimension.height;

        if (options.interactivity.events.resize) {
            window.addEventListener("resize", () => {
                this.dimension.width = this.element.offsetWidth;
                this.dimension.height = this.element.offsetHeight;

                /* resize canvas */
                if (container.retina.isRetina) {
                    this.dimension.width *= this.pxRatio;
                    this.dimension.height *= this.pxRatio;
                }

                this.element.width = this.dimension.width;
                this.element.height = this.dimension.height;

                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    container.particles.clear();
                    container.particles.init();
                    container.particles.draw(0);
                }

                /* density particles enabled */
                container.densityAutoParticles();

                if (options.polygon.type !== PolygonMaskType.none) {
                    if (container.polygon.redrawTimeout) {
                        clearTimeout(container.polygon.redrawTimeout);
                    }

                    container.polygon.redrawTimeout = setTimeout(async () => {
                        container.polygon.raw = await container.polygon.parseSvgPathToPolygon();
                        container.particles.clear();
                        container.particles.init();
                        container.particles.draw(0);
                    }, 250);
                }
            });
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
                const color = Utils.getParticleColor(options.backgroundMask.cover);

                if (color) {
                    this.paintBase(Utils.getStyleFromColor(color));
                } else {
                    this.paintBase();
                }
            } else {
                this.paintBase();
            }
        }
    }

    private paintBase(baseColor: string = "rgba(255, 255, 255, 0)"): void {
        if (this.context) {
            CanvasUtils.paintBase(this.context, this.dimension, baseColor);
        }
    }

    /**
     * Clears the canvas content
     */
    public clear(): void {
        const container = this.container;
        const options = container.options;

        if (options.backgroundMask.enable) {
            this.paint();
        } else {
            if (this.context) {
                CanvasUtils.clear(this.context, this.dimension);
            }
        }
    }

    public drawPolygonMask(rawData: ICoordinates[]): void {
        const container = this.container;
        const options = container.options;
        const context = this.context;
        const polygonDraw = options.polygon.draw;

        if (context) {
            CanvasUtils.drawPolygonMask(context, rawData, polygonDraw.lineColor, polygonDraw.lineWidth);
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

        if (container.particles.lineLinkedColor === "random") {
            colorLine = Utils.getRandomColorRGBA();
        } else if (container.particles.lineLinkedColor == "mid" && p1.color && p2.color) {
            const sourceColor = p1.color;
            const destColor = p2.color;

            colorLine = {
                b: Math.floor(Utils.mixComponents(sourceColor.b, destColor.b, p1.radius, p2.radius)),
                g: Math.floor(Utils.mixComponents(sourceColor.g, destColor.g, p1.radius, p2.radius)),
                r: Math.floor(Utils.mixComponents(sourceColor.r, destColor.r, p1.radius, p2.radius)),
            };
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb;
        }

        const width = container.retina.lineLinkedWidth;

        CanvasUtils.drawLineLinked(ctx, width, pos1, pos2, options.backgroundMask.enable, colorLine, opacity);
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

        let lineColor = container.particles.lineLinkedColor || Utils.hexToRgb(optColor);

        if (lineColor == "random") {
            lineColor = Utils.getRandomColorRGBA();
        }

        container.particles.lineLinkedColor = lineColor;

        let colorLine: IRgb = {r: 127, g: 127, b: 127};
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        if (container.particles.lineLinkedColor == "random") {
            colorLine = Utils.getRandomColorRGBA();
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

        let radius: number;
        let opacity: number;
        let colorValue: string | undefined;

        if (particle.bubbler.radius !== undefined) {
            radius = particle.bubbler.radius;
        } else {
            radius = particle.radius;
        }

        if (particle.bubbler.opacity !== undefined) {
            opacity = particle.bubbler.opacity;
        } else {
            opacity = particle.opacity.value;
        }

        if (particle.color) {
            colorValue = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`;
        }

        if (!this.context || !colorValue) {
            return;
        }

        CanvasUtils.drawParticle(this.context, particle, colorValue, options.backgroundMask.enable, radius, options.particles.shape.stroke);
    }

    private lineStyle(p1: Particle, p2: Particle): CanvasGradient | undefined {
        if (p1.color && p2.color) {
            const sourceRgb = p1.color;
            const destRgb = p2.color;

            const rgb = {
                b: Utils.mixComponents(sourceRgb.b, destRgb.b, p1.radius, p2.radius),
                g: Utils.mixComponents(sourceRgb.g, destRgb.g, p1.radius, p2.radius),
                r: Utils.mixComponents(sourceRgb.r, destRgb.r, p1.radius, p2.radius),
            };

            const midColor = Utils.getStyleFromColor(rgb);

            if (this.context) {
                return CanvasUtils.gradient(this.context, p1, p2, midColor);
            }
        }
    }
}
