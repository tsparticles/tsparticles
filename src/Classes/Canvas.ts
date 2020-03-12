"use strict";

import {Constants} from "./Utils/Constants";
import {Container} from "./Container";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {IDimension} from "../Interfaces/IDimension";
import {Utils} from "./Utils/Utils";
import {IRgb} from "../Interfaces/IRgb";
import {Particle} from "./Particle";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {ShapeType} from "../Enums/ShapeType";
import {ISide} from "../Interfaces/ISide";

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
            this.context.fillStyle = baseColor;
            this.context.fillRect(0, 0, this.dimension.width, this.dimension.height);
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
                this.context.clearRect(0, 0, this.dimension.width, this.dimension.height);
            }
        }
    }

    public drawPolygon(rawData: ICoordinates[]): void {
        const container = this.container;
        const options = container.options;
        const context = container.canvas.context;

        if (context) {
            context.beginPath();
            context.moveTo(rawData[0].x, rawData[0].y);

            for (let i = 1; i < rawData.length; i++) {
                context.lineTo(rawData[i].x, rawData[i].y);
            }

            context.closePath();
            context.strokeStyle = options.polygon.draw.lineColor;
            context.lineWidth = options.polygon.draw.lineWidth;
            context.stroke();
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

        ctx.save();

        if (options.backgroundMask.enable) {
            ctx.globalCompositeOperation = 'destination-out';
        }

        if (colorLine) {
            ctx.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        }

        ctx.lineWidth = container.retina.lineLinkedWidth;
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
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

        ctx.beginPath();
        ctx.strokeStyle = lineStyle;
        ctx.moveTo(p1.position.x, p1.position.y);
        ctx.lineTo(p2.position.x, p2.position.y);
        ctx.stroke();
        ctx.closePath();
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

        if (ctx) {
            if (container.particles.lineLinkedColor == "random") {
                colorLine = Utils.getRandomColorRGBA();
            } else {
                colorLine = container.particles.lineLinkedColor as IRgb || colorLine;
            }

            ctx.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
            ctx.lineWidth = container.retina.lineLinkedWidth;
            // container.canvas.ctx.lineCap = "round"; /* performance issue */
            /* path */
            ctx.beginPath();
            ctx.moveTo(particle.position.x + particle.offset.x, particle.position.y + particle.offset.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.closePath();
        }
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

        const ctx = this.context;
        ctx.save();

        // TODO: Performance issues, the canvas shadow is really slow
        // const shadow = options.particles.shadow;

        // if (shadow.enable) {
        //     ctx.shadowBlur = shadow.blur;
        //     ctx.shadowColor = shadow.color;
        //     ctx.shadowOffsetX = shadow.offset.x;
        //     ctx.shadowOffsetY = shadow.offset.y;
        // } else {
        //     delete ctx.shadowBlur;
        //     delete ctx.shadowColor;
        //     delete ctx.shadowOffsetX;
        //     delete ctx.shadowOffsetY;
        // }

        ctx.fillStyle = colorValue;

        const pos = {
            x: particle.position.x,
            y: particle.position.y,
        };

        ctx.translate(pos.x, pos.y);
        ctx.beginPath();

        if (particle.angle !== 0) {
            ctx.rotate(particle.angle * Math.PI / 180);
        }

        if (options.backgroundMask.enable) {
            ctx.globalCompositeOperation = 'destination-out';
        }

        this.drawShape(particle, radius);

        ctx.closePath();

        if (options.particles.shape.stroke.width > 0) {
            ctx.strokeStyle = options.particles.shape.stroke.color;
            ctx.lineWidth = options.particles.shape.stroke.width;
            ctx.stroke();
        }

        ctx.fill();
        ctx.restore();
    }

    private drawShape(particle: Particle, radius: number): void {
        const container = this.container;
        const options = container.options;
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        const pos = {
            x: particle.offset.x,
            y: particle.offset.y,
        };

        switch (particle.shape) {
            case ShapeType.line:
                ctx.moveTo(0, 0);
                ctx.lineTo(0, radius);
                ctx.strokeStyle = options.particles.shape.stroke.color;
                ctx.lineWidth = options.particles.shape.stroke.width;
                ctx.stroke();
                break;

            case ShapeType.circle:
                ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, false);
                break;
            case ShapeType.edge:
            case ShapeType.square:
                ctx.rect(-radius, -radius, radius * 2, radius * 2);
                break;
            case ShapeType.triangle: {
                const start: ICoordinates = {
                    x: -radius,
                    y: radius / 1.66,
                };

                const side: ISide = {
                    count: {
                        denominator: 2,
                        numerator: 3,
                    },
                    length: radius * 2,
                };

                this.subDrawShape(start, side);
            }
                break;
            case ShapeType.polygon: {
                const start: ICoordinates = {
                    x: -radius / (options.particles.shape.polygon.sides / 3.5),
                    y: -radius / (2.66 / 3.5),
                };
                const side: ISide = {
                    count: {
                        denominator: 1,
                        numerator: options.particles.shape.polygon.sides,
                    },
                    length: radius * 2.66 / (options.particles.shape.polygon.sides / 3),
                };

                this.subDrawShape(start, side);
            }
                break;
            case ShapeType.star: {
                const start: ICoordinates = {
                    x: -radius * 2 / (options.particles.shape.polygon.sides / 4),
                    y: -radius / (2 * 2.66 / 3.5),
                };
                const side: ISide = {
                    count: {
                        denominator: 2,
                        numerator: options.particles.shape.polygon.sides,
                    },
                    length: radius * 2 * 2.66 / (options.particles.shape.polygon.sides / 3),
                };

                this.subDrawShape(start, side);
            }
                break;

            case ShapeType.heart: {
                const x = -radius / 2;
                const y = -radius / 2;

                ctx.moveTo(x, y + radius / 4);
                ctx.quadraticCurveTo(x, y, x + radius / 4, y);
                ctx.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
                ctx.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
                ctx.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
                ctx.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
                ctx.lineTo(x + radius / 2, y + radius);
                ctx.lineTo(x + radius / 4, y + radius * 3 / 4);
                ctx.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);
            }
                break;

            case ShapeType.char:
            case ShapeType.character: {
                const style = options.particles.shape.character.style;
                const weight = options.particles.shape.character.weight;
                const size = Math.round(radius) * 2;
                const font = options.particles.shape.character.font;
                const text = particle.text;

                ctx.font = `${style} ${weight} ${size}px ${font}`;

                if (text) {
                    const x = -radius / 2;
                    const y = radius / 2;

                    if (options.particles.shape.character.fill) {
                        ctx.fillText(text, x, y);
                    } else {
                        ctx.strokeText(text, x, y);
                    }
                }
            }
                break;

            case ShapeType.image:
                if (particle.image && particle.image.data.obj) {
                    this.subDraw(particle, radius);
                }

                break;
        }
    }

    private subDrawShape(start: ICoordinates, side: ISide): void {
        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
        const ctx = this.context;

        if (!ctx) {
            return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.translate(start.x, start.y);
        ctx.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            ctx.lineTo(side.length, 0);
            ctx.translate(side.length, 0);
            ctx.rotate(interiorAngle);
        }

        // c.stroke();
        ctx.fill();
        ctx.restore();
    }

    private subDraw(particle: Particle, radius: number): void {
        const ctx = this.context;

        if (!ctx) {
            return;
        }

        const imgObj = particle.image?.data.obj;

        if (!imgObj) {
            return;
        }

        let ratio = 1;

        if (particle.image) {
            ratio = particle.image.ratio;
        }

        const pos = {
            x: -radius,
            y: -radius,
        };

        ctx.drawImage(imgObj, pos.x, pos.y, radius * 2, radius * 2 / ratio);
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

            return this.gradient(p1, p2, midColor);
        }
    }

    private gradient(p1: Particle, p2: Particle, midColor: string): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.radius / p1.radius);
        const ctx = this.context;

        if (!ctx || !p1.color || !p2.color) {
            return;
        }

        const sourcePos = p1.position;
        const destPos = p2.position;
        const grad = ctx.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, Utils.getStyleFromColor(p1.color));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, midColor);
        grad.addColorStop(1, Utils.getStyleFromColor(p2.color));

        return grad;
    }
}
