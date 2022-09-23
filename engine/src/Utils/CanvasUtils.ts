import { AlterType } from "../Enums/Types/AlterType";
import type { Container } from "../Core/Container";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IHsl } from "../Core/Interfaces/Colors";
import type { IParticleColorStyle } from "../Core/Interfaces/IParticleColorStyle";
import type { IParticleTransformValues } from "../Core/Interfaces/IParticleTransformValues";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Particle } from "../Core/Particle";
import { getStyleFromRgb } from "./ColorUtils";

/**
 * Draws a line between two points using canvas API in the given context.
 * @hidden
 * @param context - The canvas context to draw on.
 * @param begin - The start point of the line.
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

interface DrawParticleParams {
    /**
     * If enabled, the composite value will be used for blending the particle in the canvas
     */
    backgroundMask: boolean;
    /**
     * The color styles value
     */
    colorStyles: IParticleColorStyle;
    /**
     * The composite value to use for blending the particle in the canvas
     */
    composite: GlobalCompositeOperation;
    /**
     * The container of the particle
     */
    container: Container;
    /**
     * The canvas context to draw on
     */
    context: CanvasRenderingContext2D;
    /**
     * This variable contains the delta between the current frame and the previous frame
     */
    delta: IDelta;
    /**
     * The opacity of the particle
     */
    opacity: number;
    /**
     * The particle to draw
     */
    particle: Particle;
    /**
     * The radius of the particle
     */
    radius: number;
    /**
     * The shadow of the particle
     */
    shadow: IShadow;
    /**
     * The particle transform values
     */
    transform: IParticleTransformValues;
}

/**
 * Draws the particle using canvas API in the given context.
 * @param data - The function parameters.
 */
export function drawParticle(data: DrawParticleParams): void {
    const {
        container,
        context,
        particle,
        delta,
        colorStyles,
        backgroundMask,
        composite,
        radius,
        opacity,
        shadow,
        transform,
    } = data;

    const pos = particle.getPosition();

    context.save();

    if (
        transform.a !== undefined ||
        transform.b !== undefined ||
        transform.c !== undefined ||
        transform.d !== undefined
    ) {
        context.setTransform(transform.a ?? 1, transform.b ?? 0, transform.c ?? 0, transform.d ?? 1, pos.x, pos.y);
    } else {
        context.translate(pos.x, pos.y);
    }

    context.beginPath();

    const angle = particle.rotation + (particle.options.rotate.path ? particle.velocity.angle : 0);

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

    if (
        transform.a !== undefined ||
        transform.b !== undefined ||
        transform.c !== undefined ||
        transform.d !== undefined
    ) {
        context.setTransform(transform.a ?? 1, transform.b ?? 0, transform.c ?? 0, transform.d ?? 1, pos.x, pos.y);
    } else {
        context.translate(pos.x, pos.y);
    }

    if (particle.rotation) {
        context.rotate(particle.rotation);
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
    particle: Particle,
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
    particle: Particle,
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
