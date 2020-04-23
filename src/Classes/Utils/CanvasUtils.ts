import type { IDimension } from "../../Interfaces/IDimension";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IRgb } from "../../Interfaces/IRgb";
import type { ILineLinkedShadow } from "../../Interfaces/Options/Particles/LineLinked/ILineLinkedShadow";
import type { IPolygonMaskDrawStroke } from "../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import { ColorUtils } from "./ColorUtils";
import type { IParticle } from "../../Interfaces/IParticle";
import type { IShadow } from "../../Interfaces/Options/Particles/IShadow";
import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import { Absorber } from "../Absorber";

export class CanvasUtils {
    private static readonly drawers: { [type: string]: IShapeDrawer } = {};

    public static paintBase(context: CanvasRenderingContext2D,
                            dimension: IDimension,
                            baseColor?: string): void {
        context.save();
        context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
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

    public static drawPolygonMaskPath(context: CanvasRenderingContext2D,
                                      path: Path2D,
                                      stroke: IPolygonMaskDrawStroke,
                                      position: ICoordinates): void {
        context.save();
        context.translate(position.x, position.y);

        const color = typeof stroke.color === "string" ?
            ColorUtils.stringToRgb(stroke.color) :
            ColorUtils.colorToRgb(stroke.color);

        if (color) {
            context.strokeStyle = ColorUtils.getStyleFromColor(color, stroke.opacity);
            context.lineWidth = stroke.width;
            context.stroke(path);
        }

        context.restore();
    }

    public static drawAbsorber(context: CanvasRenderingContext2D, absorber: Absorber) {
        context.save();
        context.translate(absorber.position.x, absorber.position.y);
        context.beginPath();
        context.arc(0, 0, absorber.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = ColorUtils.getStyleFromColor(absorber.color);
        context.fill();
        context.restore();
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

        context.lineWidth = width;
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        if (colorLine) {
            context.strokeStyle = ColorUtils.getStyleFromColor(colorLine, opacity);
        }

        const shadowColor = typeof shadow.color === "string" ?
            ColorUtils.stringToRgb(shadow.color) :
            ColorUtils.colorToRgb(shadow.color);

        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromColor(shadowColor);
        }

        context.stroke();
        context.restore();
    }

    public static drawConnectLine(context: CanvasRenderingContext2D,
                                  width: number,
                                  lineStyle: CanvasGradient,
                                  begin: ICoordinates,
                                  end: ICoordinates): void {
        context.save();
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    }

    public static gradient(context: CanvasRenderingContext2D,
                           p1: IParticle,
                           p2: IParticle,
                           midColor: IRgb,
                           opacity: number): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.size.value / p1.size.value);

        if (!p1.color || !p2.color) {
            return;
        }

        const sourcePos = p1.position;
        const destPos = p2.position;
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, ColorUtils.getStyleFromColor(p1.color, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils.getStyleFromColor(midColor, opacity));
        grad.addColorStop(1, ColorUtils.getStyleFromColor(p2.color, opacity));

        return grad;
    }

    public static drawGrabLine(context: CanvasRenderingContext2D,
                               width: number,
                               begin: ICoordinates,
                               end: ICoordinates,
                               colorLine: IRgb,
                               opacity: number): void {
        context.save();
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.strokeStyle = ColorUtils.getStyleFromColor(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }

    public static drawParticle(context: CanvasRenderingContext2D,
                               particle: IParticle,
                               colorValue: string,
                               backgroundMask: boolean,
                               radius: number,
                               opacity: number,
                               shadow: IShadow): void {
        const pos = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };

        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();

        const shadowColor = particle.shadowColor;

        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromColor(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }

        context.fillStyle = colorValue;

        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        const stroke = particle.stroke;

        if (stroke.width > 0 && particle.strokeColor) {
            context.strokeStyle = ColorUtils.getStyleFromColor(particle.strokeColor, particle.stroke.opacity);
            context.lineWidth = stroke.width;
        }

        this.drawShape(context, particle, radius, opacity);

        if (particle.close) {
            context.closePath();
        }

        if (stroke.width > 0 && particle.strokeColor) {
            context.stroke();
        }

        if (particle.fill) {
            context.fill();
        }

        context.restore();
    }

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.drawers[type]) {
            this.drawers[type] = drawer;
        }
    }

    public static drawShape(context: CanvasRenderingContext2D,
                            particle: IParticle,
                            radius: number,
                            opacity: number): void {

        if (!particle.shape) {
            return;
        }

        const drawer = this.drawers[particle.shape];

        if (!drawer) {
            return;
        }

        drawer.draw(context, particle, radius, opacity);
    }
}
