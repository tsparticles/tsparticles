import {IDimension} from "../../Interfaces/IDimension";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {IRgb} from "../../Interfaces/IRgb";
import {Particle} from "../Particle";
import {Utils} from "./Utils";
import {IStroke} from "../../Interfaces/Options/Particles/Shape/IStroke";
import {ShapeType} from "../../Enums/ShapeType";
import {ISide} from "../../Interfaces/ISide";

export class CanvasUtils {
    public static paintBase(context: CanvasRenderingContext2D,
                            dimension: IDimension,
                            baseColor: string = "rgba(255, 255, 255, 0)"): void {
        context.fillStyle = baseColor;
        context.fillRect(0, 0, dimension.width, dimension.height);
    }

    public static clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }

    public static drawPolygonMask(context: CanvasRenderingContext2D,
                                  rawData: ICoordinates[],
                                  strokeStyle: string,
                                  lineWidth: number): void {
        context.beginPath();
        context.moveTo(rawData[0].x, rawData[0].y);

        for (let i = 1; i < rawData.length; i++) {
            context.lineTo(rawData[i].x, rawData[i].y);
        }

        context.closePath();
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }

    public static drawLineLinked(context: CanvasRenderingContext2D,
                                 width: number,
                                 begin: ICoordinates,
                                 end: ICoordinates,
                                 backgroundMask: boolean,
                                 colorLine: IRgb,
                                 opacity: number): void {
        context.save();

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        if (colorLine) {
            context.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        }

        context.lineWidth = width;
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    public static drawConnectLine(context: CanvasRenderingContext2D,
                                  width: number,
                                  lineStyle: CanvasGradient,
                                  begin: ICoordinates,
                                  end: ICoordinates): void {
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
    }

    public static gradient(context: CanvasRenderingContext2D,
                           p1: Particle,
                           p2: Particle,
                           midColor: string): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.radius / p1.radius);

        if (!p1.color || !p2.color) {
            return;
        }

        const sourcePos = p1.position;
        const destPos = p2.position;
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, Utils.getStyleFromColor(p1.color));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, midColor);
        grad.addColorStop(1, Utils.getStyleFromColor(p2.color));

        return grad;
    }

    public static drawGrabLine(context: CanvasRenderingContext2D,
                               width: number,
                               begin: ICoordinates,
                               end: ICoordinates,
                               colorLine: IRgb,
                               opacity: number): void {
        context.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
    }

    public static drawParticle(context: CanvasRenderingContext2D,
                               particle: Particle,
                               colorValue: string,
                               backgroundMask: boolean,
                               radius: number,
                               stroke: IStroke): void {
        context.save();

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

        context.fillStyle = colorValue;

        const pos = {
            x: particle.position.x,
            y: particle.position.y,
        };

        context.translate(pos.x, pos.y);
        context.beginPath();

        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        CanvasUtils.drawShape(context, particle, radius, stroke);

        context.closePath();

        if (stroke.width > 0) {
            context.strokeStyle = stroke.color;
            context.lineWidth = stroke.width;
            context.stroke();
        }

        context.fill();
        context.restore();
    }

    private static drawShape(context: CanvasRenderingContext2D,
                             particle: Particle,
                             radius: number,
                             stroke: IStroke): void {
        const pos = {
            x: particle.offset.x,
            y: particle.offset.y,
        };

        const sides = particle.container.options.particles.shape.polygon.sides;

        switch (particle.shape) {
            case ShapeType.line:
                CanvasUtils.drawLineShape(context, radius, stroke);
                break;

            case ShapeType.circle:
                CanvasUtils.drawCircleShape(context, radius, pos);
                break;

            case ShapeType.edge:
            case ShapeType.square:
                CanvasUtils.drawSquareShape(context, radius);
                break;

            case ShapeType.triangle:
                CanvasUtils.drawTriangleShape(context, radius);
                break;

            case ShapeType.polygon:
                CanvasUtils.drawPolygonShape(context, radius, sides);
                break;

            case ShapeType.star:
                CanvasUtils.drawStarShape(context, radius, sides);
                break;

            case ShapeType.heart:
                CanvasUtils.drawHeartShape(context, radius);
                break;

            case ShapeType.char:
            case ShapeType.character:
                const style = particle.container.options.particles.shape.character.style;
                const weight = particle.container.options.particles.shape.character.weight;
                const size = Math.round(radius) * 2;
                const font = particle.container.options.particles.shape.character.font;
                const text = particle.text;
                const fill = particle.container.options.particles.shape.character.fill;

                context.font = `${style} ${weight} ${size}px ${font}`;

                if (text) {
                    const pos = {
                        x: -radius / 2,
                        y: radius / 2,
                    };

                    CanvasUtils.drawTextShape(context, text, pos, fill);
                }
                break;

            case ShapeType.image:
                if (particle.image && particle.image.data.obj) {
                    CanvasUtils.drawImageShape(context, particle, radius);
                }

                break;
        }
    }

    private static drawTriangleShape(context: CanvasRenderingContext2D, radius: number): void {
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

        CanvasUtils.drawGenericPolygonShape(context, start, side);
    }

    private static drawPolygonShape(context: CanvasRenderingContext2D, radius: number, sides: number): void {
        const start: ICoordinates = {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
        const side: ISide = {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: radius * 2.66 / (sides / 3),
        };

        CanvasUtils.drawGenericPolygonShape(context, start, side);
    }

    private static drawStarShape(context: CanvasRenderingContext2D, radius: number, sides: number): void {
        const start: ICoordinates = {
            x: -radius * 2 / (sides / 4),
            y: -radius / (2 * 2.66 / 3.5),
        };
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: radius * 2 * 2.66 / (sides / 3),
        };

        CanvasUtils.drawGenericPolygonShape(context, start, side);
    }

    private static drawLineShape(context: CanvasRenderingContext2D, length: number, stroke: IStroke): void {
        context.moveTo(0, -length / 2);
        context.lineTo(0, length / 2);
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.width;
        context.stroke();
    }

    private static drawCircleShape(context: CanvasRenderingContext2D, radius: number, center: ICoordinates): void {
        context.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
    }

    private static drawSquareShape(context: CanvasRenderingContext2D, side: number): void {
        context.rect(-side, -side, side * 2, side * 2);
    }

    private static drawHeartShape(context: CanvasRenderingContext2D, radius: number): void {
        const x = -radius / 2;
        const y = -radius / 2;

        context.moveTo(x, y + radius / 4);
        context.quadraticCurveTo(x, y, x + radius / 4, y);
        context.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
        context.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
        context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
        context.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
        context.lineTo(x + radius / 2, y + radius);
        context.lineTo(x + radius / 4, y + radius * 3 / 4);
        context.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);
    }

    private static drawTextShape(context: CanvasRenderingContext2D,
                                 text: string,
                                 pos: ICoordinates, fill: boolean): void {
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }
    }

    private static drawGenericPolygonShape(context: CanvasRenderingContext2D, start: ICoordinates, side: ISide): void {
        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        if (!context) {
            return;
        }

        context.save();
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }

        // c.stroke();
        context.fill();
        context.restore();
    }

    private static drawImageShape(context: CanvasRenderingContext2D, particle: Particle, radius: number): void {
        if (!context) {
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

        context.drawImage(imgObj, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    }
}