import type { ILinksShadow } from "../Options/Interfaces/Particles/Links/ILinksShadow";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Container } from "../Core/Container";
import { getDistance, getDistances } from "./NumberUtils";
import { colorMix, colorToRgb, getStyleFromHsl, getStyleFromRgb } from "./ColorUtils";
import { IContainerPlugin, ICoordinates, IDelta, IDimension, IParticle, IRgb } from "../Core/Interfaces";

function drawLine(context: CanvasRenderingContext2D, begin: ICoordinates, end: ICoordinates): void {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}

function drawTriangle(context: CanvasRenderingContext2D, p1: ICoordinates, p2: ICoordinates, p3: ICoordinates): void {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}

export function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
    context.save();
    context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
}

export function clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
    context.clearRect(0, 0, dimension.width, dimension.height);
}

export function drawLinkLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    maxDistance: number,
    canvasSize: IDimension,
    warp: boolean,
    backgroundMask: boolean,
    composite: string,
    colorLine: IRgb,
    opacity: number,
    shadow: ILinksShadow
): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    let drawn = false;

    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);

        drawn = true;
    } else if (warp) {
        let pi1: ICoordinates | undefined;
        let pi2: ICoordinates | undefined;

        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };

        const d1 = getDistances(begin, endNE);

        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;

            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        } else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            };

            const d2 = getDistances(begin, endSW);

            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                const xi = -yi / (d2.dy / d2.dx);

                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            } else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                };

                const d3 = getDistances(begin, endSE);

                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);

                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }

        if (pi1 && pi2) {
            drawLine(context, begin, pi1);
            drawLine(context, end, pi2);

            drawn = true;
        }
    }

    if (!drawn) {
        return;
    }

    context.lineWidth = width;

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);

    if (shadow.enable) {
        const shadowColor = colorToRgb(shadow.color);

        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = getStyleFromRgb(shadowColor);
        }
    }

    context.stroke();
}

export function drawLinkTriangle(
    context: CanvasRenderingContext2D,
    pos1: ICoordinates,
    pos2: ICoordinates,
    pos3: ICoordinates,
    backgroundMask: boolean,
    composite: string,
    colorTriangle: IRgb,
    opacityTriangle: number
): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    drawTriangle(context, pos1, pos2, pos3);

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);

    context.fill();
}

export function drawConnectLine(
    context: CanvasRenderingContext2D,
    width: number,
    lineStyle: CanvasGradient,
    begin: ICoordinates,
    end: ICoordinates
): void {
    context.save();

    drawLine(context, begin, end);

    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
}

export function gradient(
    context: CanvasRenderingContext2D,
    p1: IParticle,
    p2: IParticle,
    opacity: number
): CanvasGradient | undefined {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
    const color1 = p1.getFillColor();
    const color2 = p2.getFillColor();

    if (!color1 || !color2) {
        return;
    }

    const sourcePos = p1.getPosition();
    const destPos = p2.getPosition();
    const midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius());
    const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

    grad.addColorStop(0, getStyleFromHsl(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(1, getStyleFromHsl(color2, opacity));

    return grad;
}

export function drawGrabLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    colorLine: IRgb,
    opacity: number
): void {
    context.save();

    drawLine(context, begin, end);

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
    context.restore();
}

export function drawParticle(
    container: Container,
    context: CanvasRenderingContext2D,
    particle: IParticle,
    delta: IDelta,
    fillColorValue: string | undefined,
    strokeColorValue: string | undefined,
    backgroundMask: boolean,
    composite: string,
    radius: number,
    opacity: number,
    shadow: IShadow
): void {
    const pos = particle.getPosition();
    const tiltOptions = particle.options.tilt;
    const rollOptions = particle.options.roll;

    context.save();
    if (tiltOptions.enable || rollOptions.enable) {
        context.setTransform(
            rollOptions.enable ? Math.cos(particle.rollAngle) : 1,
            tiltOptions.enable ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0,
            tiltOptions.enable ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0,
            rollOptions.enable ? Math.sin(particle.rollAngle) : 1,
            pos.x,
            pos.y
        );
    } else {
        context.translate(pos.x, pos.y);
    }
    context.beginPath();

    const angle = particle.rotate.value + (particle.options.rotate.path ? particle.velocity.angle : 0);

    if (angle !== 0) {
        context.rotate(angle);
    }

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    const shadowColor = particle.shadowColor;

    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = getStyleFromRgb(shadowColor);
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

    drawShape(container, context, particle, radius, opacity, delta);

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
    if (tiltOptions.enable) {
        context.setTransform(
            1,
            Math.cos(particle.tilt.value) * particle.tilt.cosDirection,
            Math.sin(particle.tilt.value) * particle.tilt.sinDirection,
            1,
            pos.x,
            pos.y
        );
    } else {
        context.translate(pos.x, pos.y);
    }

    if (angle !== 0) {
        context.rotate(angle);
    }

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);

    context.restore();
}

export function drawShape(
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

    drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

export function drawShapeAfterEffect(
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

    drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

export function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
    if (!plugin.draw) {
        return;
    }

    context.save();
    plugin.draw(context, delta);
    context.restore();
}

/**
 * @category Utils
 */
export class CanvasUtils {
    static paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
        paintBase(context, dimension, baseColor);
    }

    static clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
        clear(context, dimension);
    }

    static drawLinkLine(
        context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        maxDistance: number,
        canvasSize: IDimension,
        warp: boolean,
        backgroundMask: boolean,
        composite: string,
        colorLine: IRgb,
        opacity: number,
        shadow: ILinksShadow
    ): void {
        drawLinkLine(
            context,
            width,
            begin,
            end,
            maxDistance,
            canvasSize,
            warp,
            backgroundMask,
            composite,
            colorLine,
            opacity,
            shadow
        );
    }

    static drawLinkTriangle(
        context: CanvasRenderingContext2D,
        pos1: ICoordinates,
        pos2: ICoordinates,
        pos3: ICoordinates,
        backgroundMask: boolean,
        composite: string,
        colorTriangle: IRgb,
        opacityTriangle: number
    ): void {
        drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle);
    }

    static drawConnectLine(
        context: CanvasRenderingContext2D,
        width: number,
        lineStyle: CanvasGradient,
        begin: ICoordinates,
        end: ICoordinates
    ): void {
        drawConnectLine(context, width, lineStyle, begin, end);
    }

    static gradient(
        context: CanvasRenderingContext2D,
        p1: IParticle,
        p2: IParticle,
        opacity: number
    ): CanvasGradient | undefined {
        return gradient(context, p1, p2, opacity);
    }

    static drawGrabLine(
        context: CanvasRenderingContext2D,
        width: number,
        begin: ICoordinates,
        end: ICoordinates,
        colorLine: IRgb,
        opacity: number
    ): void {
        drawGrabLine(context, width, begin, end, colorLine, opacity);
    }

    static drawParticle(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        delta: IDelta,
        fillColorValue: string | undefined,
        strokeColorValue: string | undefined,
        backgroundMask: boolean,
        composite: string,
        radius: number,
        opacity: number,
        shadow: IShadow
    ): void {
        drawParticle(
            container,
            context,
            particle,
            delta,
            fillColorValue,
            strokeColorValue,
            backgroundMask,
            composite,
            radius,
            opacity,
            shadow
        );
    }

    static drawShape(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        radius: number,
        opacity: number,
        delta: IDelta
    ): void {
        drawShape(container, context, particle, radius, opacity, delta);
    }

    static drawShapeAfterEffect(
        container: Container,
        context: CanvasRenderingContext2D,
        particle: IParticle,
        radius: number,
        opacity: number,
        delta: IDelta
    ): void {
        drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
    }

    static drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
        drawPlugin(context, plugin, delta);
    }
}
