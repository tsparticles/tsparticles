import type { IHsl, IRgb } from "../Core/Interfaces/Colors";
import { colorMix, getStyleFromHsl, getStyleFromRgb } from "./ColorUtils";
import { AlterType } from "../Enums/Types/AlterType";
import type { Container } from "../Core/Container";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IParticleColorStyle } from "../Core/Interfaces/IParticleColorStyle";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Particle } from "../Core/Particle";
import { RollMode } from "../Enums/Modes/RollMode";

/**
 * Draws a line between two points using canvas API in the given context.
 * @hidden
 * @param context - The canvas context to draw on.
 * @param begin - The begin point of the line.
 * @param end - The end point of the line.
 */
export function drawLine(context: CanvasRenderingContext2D, begin: ICoordinates, end: ICoordinates): void {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}

/**
 * Draws a triangle with three points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param p1 - The first point of the triangle.
 * @param p2 - The second point of the triangle.
 * @param p3 - The third point of the triangle.
 */
export function drawTriangle(
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

/**
 * Fills a rectangle with the given color for the whole canvas.
 * @param context - The canvas context to draw on.
 * @param dimension - The dimension of the rectangle.
 * @param baseColor - The base color of the rectangle, if not specified a transparent color will be used.
 */
export function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
    context.save();
    context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
}

/**
 * Clears the canvas.
 * @param context - The canvas context to clear.
 * @param dimension - The dimension of the canvas.
 */
export function clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
    context.clearRect(0, 0, dimension.width, dimension.height);
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

/**
 * Creates a gradient using two particles colors and opacity.
 * @param context - The canvas context to draw on.
 * @param p1 - The first particle.
 * @param p2 - The second particle.
 * @param opacity - The opacity of the gradient.
 */
export function gradient(
    context: CanvasRenderingContext2D,
    p1: IParticle,
    p2: IParticle,
    opacity: number
): CanvasGradient | undefined {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()),
        color1 = p1.getFillColor(),
        color2 = p2.getFillColor();

    if (!color1 || !color2) {
        return;
    }

    const sourcePos = p1.getPosition(),
        destPos = p2.getPosition(),
        midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()),
        grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

    grad.addColorStop(0, getStyleFromHsl(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(1, getStyleFromHsl(color2, opacity));

    return grad;
}

/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 */
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

/**
 * Draws the particle using canvas API in the given context.
 * @param container - The container of the particle.
 * @param context - The canvas context to draw on.
 * @param particle - The particle to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 * @param colorStyles - The color styles value.
 * @param backgroundMask - If enabled, the composite value will be used for blending the particle in the canvas.
 * @param composite - The composite value to use for blending the particle in the canvas.
 * @param radius - The radius of the particle.
 * @param opacity - The opacity of the particle.
 * @param shadow - The shadow of the particle.
 */
export function drawParticle(
    container: Container,
    context: CanvasRenderingContext2D,
    particle: IParticle,
    delta: IDelta,
    colorStyles: IParticleColorStyle,
    backgroundMask: boolean,
    composite: GlobalCompositeOperation,
    radius: number,
    opacity: number,
    shadow: IShadow
): void {
    const pos = particle.getPosition(),
        tiltOptions = particle.options.tilt,
        rollOptions = particle.options.roll;

    context.save();

    if (tiltOptions.enable || rollOptions.enable) {
        const roll = rollOptions.enable && particle.roll,
            tilt = tiltOptions.enable && particle.tilt,
            rollHorizontal = roll && (rollOptions.mode === RollMode.horizontal || rollOptions.mode === RollMode.both),
            rollVertical = roll && (rollOptions.mode === RollMode.vertical || rollOptions.mode === RollMode.both);

        context.setTransform(
            rollHorizontal ? Math.cos(particle.roll.angle) : 1,
            tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0,
            tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0,
            rollVertical ? Math.sin(particle.roll.angle) : 1,
            pos.x,
            pos.y
        );
    } else {
        context.translate(pos.x, pos.y);
    }

    context.beginPath();

    const angle = (particle.rotate?.value ?? 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);

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

    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }

    const stroke = particle.stroke;

    context.lineWidth = particle.strokeWidth ?? 0;

    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }

    drawShape(container, context, particle, radius, opacity, delta);

    if ((stroke?.width ?? 0) > 0) {
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

    if (tiltOptions.enable && particle.tilt) {
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

/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
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

/**
 * Draws the particle effect after the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
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

/**
 * Draws the given plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The plugin to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
    if (!plugin.draw) {
        return;
    }

    context.save();
    plugin.draw(context, delta);
    context.restore();
}

/**
 * Draws the given particle plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The particle plugin to draw.
 * @param particle The particle to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawParticlePlugin(
    context: CanvasRenderingContext2D,
    plugin: IContainerPlugin,
    particle: Particle,
    delta: IDelta
): void {
    if (!plugin.drawParticle) {
        return;
    }

    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
}

/**
 * Draws an ellipse for the given particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param fillColorValue The particle fill color.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param width The width of the particle.
 * @param rotation The rotation of the particle.
 * @param start The start angle of the particle.
 * @param end The end angle of the particle.
 */
export function drawEllipse(
    context: CanvasRenderingContext2D,
    particle: IParticle,
    fillColorValue: IHsl | undefined,
    radius: number,
    opacity: number,
    width: number,
    rotation: number,
    start: number,
    end: number
): void {
    if (width <= 0) {
        return;
    }

    const pos = particle.getPosition();

    if (fillColorValue) {
        context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
    }

    context.lineWidth = width;

    const rotationRadian = (rotation * Math.PI) / 180;

    context.beginPath();
    context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
    context.stroke();
}

/**
 * Alters HSL values for enlighten or darken the given color.
 * @param color The color to enlighten or darken.
 * @param type The type of alteration.
 * @param value The value of the alteration.
 */
export function alterHsl(color: IHsl, type: AlterType, value: number): IHsl {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === AlterType.darken ? -1 : 1) * value,
    };
}
