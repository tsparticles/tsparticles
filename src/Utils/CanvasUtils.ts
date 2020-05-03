import type { IDimension } from "../Core/Interfaces/IDimension";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IRgb } from "../Core/Interfaces/IRgb";
import type { ILineLinkedShadow } from "../Options/Interfaces/Particles/LineLinked/ILineLinkedShadow";
import { ColorUtils } from "./ColorUtils";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { Container } from "../Core/Container";
import { IPlugin } from "../Core/Interfaces/IPlugin";

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
                           opacity: number): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.size.value / p1.size.value);

        if (!p1.color || !p2.color) {
            return;
        }

        const sourcePos = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y
        };
        const destPos = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y
        };

        const midRgb = ColorUtils.mix(p1.color, p2.color, p1.size.value, p2.size.value);
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, ColorUtils.getStyleFromColor(p1.color, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils.getStyleFromColor(midRgb, opacity));
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

    public static drawParticle(container: Container,
                               context: CanvasRenderingContext2D,
                               particle: IParticle,
                               delta: number,
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

        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        const shadowColor = particle.shadowColor;

        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromColor(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }

        context.fillStyle = colorValue;

        const stroke = particle.stroke;

        if (stroke.width > 0 && particle.strokeColor) {
            context.strokeStyle = ColorUtils.getStyleFromColor(particle.strokeColor, particle.stroke.opacity);
            context.lineWidth = stroke.width;
        }

        this.drawShape(container, context, particle, radius, opacity, delta);

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
        context.save();
        context.translate(pos.x, pos.y);

        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        this.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);

        context.restore();
    }

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.drawers[type]) {
            this.drawers[type] = drawer;
        }
    }

    public static getShapeDrawer(type: string): IShapeDrawer {
        return this.drawers[type];
    }

    public static drawShape(container: Container,
                            context: CanvasRenderingContext2D,
                            particle: IParticle,
                            radius: number,
                            opacity: number,
                            delta: number): void {

        if (!particle.shape) {
            return;
        }

        const drawer = container.drawers[particle.shape];

        if (!drawer) {
            return;
        }

        drawer.draw(context, particle, radius, opacity, delta);
    }

    public static drawShapeAfterEffect(container: Container,
                                       context: CanvasRenderingContext2D,
                                       particle: IParticle,
                                       radius: number,
                                       opacity: number,
                                       delta: number): void {

        if (!particle.shape) {
            return;
        }

        const drawer = container.drawers[particle.shape];

        if (!drawer) {
            return;
        }

        if (drawer.afterEffect !== undefined) {
            drawer.afterEffect(context, particle, radius, opacity, delta);
        }
    }

    public static drawPlugin(context: CanvasRenderingContext2D, plugin: IPlugin, delta: number) {
        context.save();

        if (plugin.draw !== undefined) {
            plugin.draw(context, delta);
        }

        context.restore();
    }
}
