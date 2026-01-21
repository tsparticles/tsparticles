import { lFactor, minStrokeWidth, originPoint } from "../Core/Utils/Constants.js";
import { AlterType } from "../Enums/Types/AlterType.js";
import type { Container } from "../Core/Container.js";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IDimension } from "../Core/Interfaces/IDimension.js";
import type { IDrawParticleParams } from "../Core/Interfaces/IDrawParticleParams.js";
import type { IHsl } from "../Core/Interfaces/Colors.js";
import type { IShapeDrawData } from "../export-types.js";
import type { Particle } from "../Core/Particle.js";

/**
 * Draws a line between two points using canvas API in the given context.
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
 * Fills a rectangle with the given color for the whole canvas.
 * @param context - The canvas context to draw on.
 * @param dimension - The dimension of the rectangle.
 * @param baseColor - The base color of the rectangle, if not specified a transparent color will be used.
 */
export function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
    context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
    context.fillRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}

/**
 * Fills a rectangle with the given color for the whole canvas.
 * @param context - The canvas context to draw on.
 * @param dimension - The dimension of the rectangle.
 * @param image - The image to draw on the rectangle.
 * @param opacity - The opacity of the image.
 */
export function paintImage(
    context: CanvasRenderingContext2D,
    dimension: IDimension,
    image: HTMLImageElement | undefined,
    opacity: number,
): void {
    if (!image) {
        return;
    }

    context.globalAlpha = opacity;
    context.drawImage(image, originPoint.x, originPoint.y, dimension.width, dimension.height);
    context.globalAlpha = 1;
}

/**
 * Clears the canvas.
 * @param context - The canvas context to clear.
 * @param dimension - The dimension of the canvas.
 */
export function clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
    context.clearRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}

/**
 * Draws the particle using canvas API in the given context.
 * @param data - The function parameters.
 */
export function drawParticle(data: IDrawParticleParams): void {
    const { container, context, particle, delta, colorStyles, radius, opacity, transform } = data,
        pos = particle.getPosition(),
        transformData = particle.getTransformData(transform);

    context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);

    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }

    const strokeWidth = particle.strokeWidth ?? minStrokeWidth;

    context.lineWidth = strokeWidth;

    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }

    const drawData: IShapeDrawData = {
        context,
        particle,
        radius,
        opacity,
        delta,
        pixelRatio: container.retina.pixelRatio,
        fill: particle.shapeFill,
        stroke: strokeWidth > minStrokeWidth || !particle.shapeFill,
        transformData,
    };

    drawBeforeEffect(container, drawData);
    drawShapeBeforeDraw(container, drawData);
    drawShape(container, drawData);
    drawShapeAfterDraw(container, drawData);
    drawAfterEffect(container, drawData);
    context.resetTransform();
}

/**
 * Draws the particle effect using the plugin's shape renderer.
 * @param container - the container of the particle.
 * @param data - the function parameters.
 */
export function drawAfterEffect(container: Container, data: IShapeDrawData): void {
    const { particle } = data;

    if (!particle.effect) {
        return;
    }

    const drawer = container.effectDrawers.get(particle.effect),
        drawFunc = drawer?.drawAfter;

    if (!drawFunc) {
        return;
    }

    drawFunc(data);
}

/**
 * Draws the particle effect using the plugin's shape renderer.
 * @param container - the container of the particle.
 * @param data - the function parameters.
 */
export function drawBeforeEffect(container: Container, data: IShapeDrawData): void {
    const { particle } = data;

    if (!particle.effect) {
        return;
    }

    const drawer = container.effectDrawers.get(particle.effect);

    if (!drawer?.drawBefore) {
        return;
    }

    drawer.drawBefore(data);
}

/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param container - the container of the particle.
 * @param data - the function parameters.
 */
export function drawShape(container: Container, data: IShapeDrawData): void {
    const { context, particle, stroke } = data;

    if (!particle.shape) {
        return;
    }

    const drawer = container.shapeDrawers.get(particle.shape);

    if (!drawer) {
        return;
    }

    context.beginPath();

    drawer.draw(data);

    if (particle.shapeClose) {
        context.closePath();
    }

    if (stroke) {
        context.stroke();
    }

    if (particle.shapeFill) {
        context.fill();
    }
}

/**
 * Calls the afterDraw function of the plugin's shape renderer, this is called after drawShape.
 * @param container - the container of the particle.
 * @param data - the function parameters.
 */
export function drawShapeAfterDraw(container: Container, data: IShapeDrawData): void {
    const { particle } = data;

    if (!particle.shape) {
        return;
    }

    const drawer = container.shapeDrawers.get(particle.shape);

    if (!drawer?.afterDraw) {
        return;
    }

    drawer.afterDraw(data);
}

/**
 * Calls the beforeDraw function of the plugin's shape renderer, this is called before drawShape.'
 * @param container - the container of the particle.
 * @param data - the function parameters.
 */
export function drawShapeBeforeDraw(container: Container, data: IShapeDrawData): void {
    const { particle } = data;

    if (!particle.shape) {
        return;
    }

    const drawer = container.shapeDrawers.get(particle.shape);

    if (!drawer?.beforeDraw) {
        return;
    }

    drawer.beforeDraw(data);
}

/**
 * Draws the given particle plugin in the canvas.
 * @param context - The canvas context.
 * @param plugin - The particle plugin to draw.
 * @param particle - The particle to draw.
 * @param delta - this variable contains the delta between the current frame and the previous frame
 */
export function drawParticlePlugin(
    context: CanvasRenderingContext2D,
    plugin: IContainerPlugin,
    particle: Particle,
    delta: IDelta,
): void {
    if (!plugin.drawParticle) {
        return;
    }

    plugin.drawParticle(context, particle, delta);
}

/**
 * Alters HSL values for enlighten or darken the given color.
 * @param color - The color to enlighten or darken.
 * @param type - The type of alteration.
 * @param value - The value of the alteration.
 * @returns the altered {@link IHsl} color
 */
export function alterHsl(color: IHsl, type: AlterType, value: number): IHsl {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === AlterType.darken ? -lFactor : lFactor) * value,
    };
}
