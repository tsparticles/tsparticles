import type { IDimension } from "../Core/Interfaces/IDimension";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IRgb } from "../Core/Interfaces/IRgb";
import type { ILinksShadow } from "../Options/Interfaces/Particles/Links/ILinksShadow";
import { ColorUtils } from "./ColorUtils";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Container } from "../Core/Container";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import { Utils } from "./Utils";
import type { IDelta } from "../Core/Interfaces/IDelta";
import { HoverMode } from "../Enums/Modes";
import { Particle } from "../Core/Particle";

export class CanvasUtils {
    public static paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
        context.save();
        context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }

    public static clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }

    public static drawLinkLine(
        context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        maxDistance: number,
        canvasSize: IDimension,
        warp: boolean,
        backgroundMask: boolean,
        colorLine: IRgb,
        opacity: number,
        shadow: ILinksShadow
    ): void {
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */

        let drawn = false;

        if (Utils.getDistance(begin, end) <= maxDistance) {
            CanvasUtils.drawLine(context, begin, end);

            drawn = true;
        } else if (warp) {
            let pi1: ICoordinates | undefined;
            let pi2: ICoordinates | undefined;

            const endNE = {
                x: end.x - canvasSize.width,
                y: end.y,
            };

            const { dx, dy, distance } = Utils.getDistances(begin, endNE);

            if (distance <= maxDistance) {
                const yi = begin.y - (dy / dx) * begin.x;

                pi1 = { x: 0, y: yi };
                pi2 = { x: canvasSize.width, y: yi };
            } else {
                const endSW = {
                    x: end.x,
                    y: end.y - canvasSize.height,
                };

                const { dx, dy, distance } = Utils.getDistances(begin, endSW);

                if (distance <= maxDistance) {
                    const yi = begin.y - (dy / dx) * begin.x;
                    const xi = -yi / (dy / dx);

                    pi1 = { x: xi, y: 0 };
                    pi2 = { x: xi, y: canvasSize.height };
                } else {
                    const endSE = {
                        x: end.x - canvasSize.width,
                        y: end.y - canvasSize.height,
                    };

                    const { dx, dy, distance } = Utils.getDistances(begin, endSE);

                    if (distance <= maxDistance) {
                        const yi = begin.y - (dy / dx) * begin.x;
                        const xi = -yi / (dy / dx);

                        pi1 = { x: xi, y: yi };
                        pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                    }
                }
            }

            if (pi1 && pi2) {
                CanvasUtils.drawLine(context, begin, pi1);
                CanvasUtils.drawLine(context, end, pi2);

                drawn = true;
            }
        }

        if (!drawn) {
            return;
        }

        context.lineWidth = width;

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        context.strokeStyle = ColorUtils.getStyleFromRgb(colorLine, opacity);

        if (shadow.enable) {
            const shadowColor = ColorUtils.colorToRgb(shadow.color);

            if (shadowColor) {
                context.shadowBlur = shadow.blur;
                context.shadowColor = ColorUtils.getStyleFromRgb(shadowColor);
            }
        }

        context.stroke();
    }

    public static drawLinkTriangle(
        context: CanvasRenderingContext2D,
        width: number,
        pos1: ICoordinates,
        pos2: ICoordinates,
        pos3: ICoordinates,
        backgroundMask: boolean,
        colorTriangle: IRgb,
        opacityTriangle: number
    ): void {
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */

        CanvasUtils.drawTriangle(context, pos1, pos2, pos3);

        context.lineWidth = width;

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        context.fillStyle = ColorUtils.getStyleFromRgb(colorTriangle, opacityTriangle);

        context.fill();
    }

    public static drawConnectLine(
        context: CanvasRenderingContext2D,
        width: number,
        lineStyle: CanvasGradient,
        begin: ICoordinates,
        end: ICoordinates
    ): void {
        context.save();

        CanvasUtils.drawLine(context, begin, end);

        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    }

    public static gradient(
        context: CanvasRenderingContext2D,
        p1: IParticle,
        p2: IParticle,
        opacity: number
    ): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.size.value / p1.size.value);
        const color1 = p1.getFillColor();
        const color2 = p2.getFillColor();

        if (!color1 || !color2) {
            return;
        }

        const sourcePos = p1.getPosition();
        const destPos = p2.getPosition();
        const midRgb = ColorUtils.mix(color1, color2, p1.size.value, p2.size.value);
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, ColorUtils.getStyleFromHsl(color1, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils.getStyleFromRgb(midRgb, opacity));
        grad.addColorStop(1, ColorUtils.getStyleFromHsl(color2, opacity));

        return grad;
    }

    public static drawGrabLine(
        context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        colorLine: IRgb,
        opacity: number
    ): void {
        context.save();

        CanvasUtils.drawLine(context, begin, end);

        context.strokeStyle = ColorUtils.getStyleFromRgb(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }

    public static drawLight(container: Container, context: CanvasRenderingContext2D, mousePos: ICoordinates): void {
        context.beginPath();
        context.arc(
            mousePos.x,
            mousePos.y,
            Math.max(container.canvas.size.height, container.canvas.size.width),
            0,
            2 * Math.PI
        );

        const gradientAmbientLight = context.createRadialGradient(
            mousePos.x,
            mousePos.y,
            0,
            mousePos.x,
            mousePos.y,
            1000
        );

        gradientAmbientLight.addColorStop(0, "#3b4654");
        gradientAmbientLight.addColorStop(1, "#2c343f");
        context.fillStyle = gradientAmbientLight;
        context.fill();

        /*context.beginPath();
        context.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI);

        const gradientPointerLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 5);
        gradientPointerLight.addColorStop(0, "#fff");
        gradientPointerLight.addColorStop(1, "#3b4654");
        context.fillStyle = gradientPointerLight;
        context.fill();*/
    }

    public static drawParticleShadow(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: Particle,
        radius: number,
        mousePos: ICoordinates
    ): void {
        const pos = particle.getPosition();

        context.save();

        const full = (Math.PI * 2) / 4;
        const angle = -particle.angle + Math.PI / 4;
        const factor = 1; //Math.sqrt(2);

        const p1 = {
            x: pos.x + radius * Math.sin(angle) * factor,
            y: pos.y + radius * Math.cos(angle) * factor,
        };

        const p2 = {
            x: pos.x + radius * Math.sin(angle + full) * factor,
            y: pos.y + radius * Math.cos(angle + full) * factor,
        };

        const p3 = {
            x: pos.x + radius * Math.sin(angle + full * 2) * factor,
            y: pos.y + radius * Math.cos(angle + full * 2) * factor,
        };

        const p4 = {
            x: pos.x + radius * Math.sin(angle + full * 3) * factor,
            y: pos.y + radius * Math.cos(angle + full * 3) * factor,
        };

        const dots = [p1, p2, p3, p4];

        const points = [];

        const shadowLength = 2000;

        for (const dot in dots) {
            const angle = Math.atan2(mousePos.y - dots[dot].y, mousePos.x - dots[dot].x);
            const endX = dots[dot].x + shadowLength * Math.sin(-angle - Math.PI / 2);
            const endY = dots[dot].y + shadowLength * Math.cos(-angle - Math.PI / 2);

            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y,
            });
        }

        for (let i = points.length - 1; i >= 0; i--) {
            const n = i == 3 ? 0 : i + 1;

            context.beginPath();

            context.moveTo(points[i].startX, points[i].startY);

            context.lineTo(points[n].startX, points[n].startY);
            context.lineTo(points[n].endX, points[n].endY);
            context.lineTo(points[i].endX, points[i].endY);

            context.fillStyle = "#2c343f";

            context.fill();
        }

        context.restore();
    }

    public static drawParticle(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        delta: IDelta,
        fillColorValue: string | undefined,
        strokeColorValue: string | undefined,
        backgroundMask: boolean,
        radius: number,
        opacity: number,
        shadow: IShadow
    ): void {
        const pos = particle.getPosition();

        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();

        if (particle.angle !== 0) {
            if (particle.particlesOptions.rotate.path) {
                context.rotate(particle.angle + particle.pathAngle);
            } else {
                context.rotate(particle.angle);
            }
        }

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        const shadowColor = particle.shadowColor;

        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils.getStyleFromRgb(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }

        if (fillColorValue) {
            context.fillStyle = fillColorValue;
        }

        const stroke = particle.stroke;

        context.lineWidth = particle.strokeWidth;

        if (strokeColorValue) {
            context.strokeStyle = strokeColorValue;
        }

        CanvasUtils.drawShape(container, context, particle, radius, opacity, delta);

        if (stroke.width > 0) {
            context.stroke();
        }

        if (particle.close) {
            context.closePath();
        }

        if (particle.fill) {
            context.fill();
        }

        context.restore();

        context.save();
        context.translate(pos.x, pos.y);

        if (particle.angle !== 0) {
            context.rotate(particle.angle);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }

        CanvasUtils.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);

        context.restore();
    }

    public static drawShape(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        radius: number,
        opacity: number,
        delta: IDelta
    ): void {
        if (!particle.shape) {
            return;
        }

        const drawer = container.drawers.get(particle.shape);

        if (!drawer) {
            return;
        }

        drawer.draw(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
    }

    public static drawShapeAfterEffect(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        radius: number,
        opacity: number,
        delta: IDelta
    ): void {
        if (!particle.shape) {
            return;
        }

        const drawer = container.drawers.get(particle.shape);

        if (!drawer?.afterEffect) {
            return;
        }

        drawer.afterEffect(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
    }

    public static drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
        if (plugin.draw !== undefined) {
            context.save();
            plugin.draw(context, delta);
            context.restore();
        }
    }

    private static drawLine(context: CanvasRenderingContext2D, begin: ICoordinates, end: ICoordinates): void {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
    }

    private static drawTriangle(
        context: CanvasRenderingContext2D,
        p1: ICoordinates,
        p2: ICoordinates,
        p3: ICoordinates
    ): void {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
    }
}
