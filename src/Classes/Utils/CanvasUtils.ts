import type { IDimension } from "../../Interfaces/IDimension";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IRgb } from "../../Interfaces/IRgb";
import type { Particle } from "../Particle";
import { ShapeUtils } from "./ShapeUtils";
import type { ILineLinkedShadow } from "../../Interfaces/Options/Particles/ILineLinkedShadow";
import type { IPolygonMaskDrawStroke } from "../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import { ColorUtils } from "./ColorUtils";

export class CanvasUtils {
    public static paintBase(context: CanvasRenderingContext2D,
        dimension: IDimension,
        baseColor?: string): void {
        context.save();
        context.fillStyle = baseColor ?? "rgba(255, 255, 255, 0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }

    public static clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }

    public static drawPolygonMask(context: CanvasRenderingContext2D,
        rawData: ICoordinates[],
        stroke: IPolygonMaskDrawStroke): void {
        const color = typeof stroke.color === "string" ?
            ColorUtils.stringToRgb(stroke.color) :
            ColorUtils.colorToRgb(stroke.color);

        if (color) {
            context.save();
            context.beginPath();
            context.moveTo(rawData[0].x, rawData[0].y);

            for (let i = 1; i < rawData.length; i++) {
                context.lineTo(rawData[i].x, rawData[i].y);
            }

            context.closePath();
            context.strokeStyle = ColorUtils.getStyleFromColor(color);
            context.lineWidth = stroke.width;
            context.stroke();
            context.restore();
        }
    }

    public static drawLineLinked(context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        backgroundMask: boolean,
        colorLine: IRgb,
        opacity: number,
        shadow: ILineLinkedShadow): void {
        context.save();

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        if (colorLine) {
            context.strokeStyle = ColorUtils.getStyleFromColor(colorLine, opacity);;
        }

        context.lineWidth = width;
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */
        context.beginPath();

        const color = typeof shadow.color === "string" ?
            ColorUtils.stringToRgb(shadow.color) :
            ColorUtils.colorToRgb(shadow.color);

        if (shadow.enable && color) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromColor(color);
        }

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
        context.save();
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
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

        grad.addColorStop(0, ColorUtils.getStyleFromColor(p1.color));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, midColor);
        grad.addColorStop(1, ColorUtils.getStyleFromColor(p2.color));

        return grad;
    }

    public static drawGrabLine(context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        colorLine: IRgb,
        opacity: number): void {
        context.save();
        context.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    public static drawParticle(context: CanvasRenderingContext2D,
        particle: Particle,
        colorValue: string,
        backgroundMask: boolean,
        radius: number): void {
        context.save();

        const stroke = particle.stroke;
        const strokeColor = particle.strokeColor;
        const shadow = particle.container.options.particles.shadow;
        const shadowColor = particle.shadowColor;

        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromColor(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }

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

        ShapeUtils.drawShape(context, particle, radius, stroke, strokeColor);

        context.closePath();

        if (stroke.width > 0 && particle.strokeColor) {
            context.strokeStyle = ColorUtils.getStyleFromColor(particle.strokeColor);
            context.lineWidth = stroke.width;
            context.stroke();
        }

        context.fill();
        context.restore();
    }
}
