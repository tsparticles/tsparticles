import { AlterType } from "../Enums/Types/AlterType.js";
import type { Container } from "../Core/Container.js";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IDimension } from "../Core/Interfaces/IDimension.js";
import type { IDrawParticleParams } from "../Core/Interfaces/IDrawParticleParams.js";
import type { IHsl } from "../Core/Interfaces/Colors.js";
import type { Particle } from "../Core/Particle.js";
import { getStyleFromRgb } from "./ColorUtils.js";

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
    context.fillRect(0, 0, dimension.width, dimension.height);
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
    context.drawImage(image, 0, 0, dimension.width, dimension.height);
    context.globalAlpha = 1;
}

/**
 * Clears the canvas.
 * @param context - The canvas context to clear.
 * @param dimension - The dimension of the canvas.
 */
export function clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
    context.clearRect(0, 0, dimension.width, dimension.height);
}

/**
 * Draws the particle using canvas API in the given context.
 * @param data - The function parameters.
 */
export function drawParticle(data: IDrawParticleParams): void {
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

    const pos = particle.getPosition(),
        angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0),
        rotateData = {
            sin: Math.sin(angle),
            cos: Math.cos(angle),
        },
        transformData = {
            a: rotateData.cos * (transform.a ?? 1),
            b: rotateData.sin * (transform.b ?? 1),
            c: -rotateData.sin * (transform.c ?? 1),
            d: rotateData.cos * (transform.d ?? 1),
        };

    context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);

    context.beginPath();

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

    const strokeWidth = particle.strokeWidth ?? 0;

    context.lineWidth = strokeWidth;

    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }

    const drawData = { container, context, particle, radius, opacity, delta };

    drawShape(drawData);

    if (particle.close) {
        context.closePath();
    }

    if (strokeWidth > 0) {
        context.stroke();
    }

    if (particle.fill) {
        context.fill();
    }

    drawShapeAfterEffect(drawData);

    context.globalCompositeOperation = "source-over";
    context.setTransform(1, 0, 0, 1, 0, 0);
}

type DrawShapeData = {
    /**
     * the container of the particle.
     */
    container: Container;

    /**
     * the canvas context.
     */
    context: CanvasRenderingContext2D;

    /**
     * this variable contains the delta between the current frame and the previous frame
     */
    delta: IDelta;

    /**
     * the opacity of the particle.
     */
    opacity: number;

    /**
     * the particle to draw.
     */
    particle: Particle;

    /**
     * the radius of the particle.
     */
    radius: number;
};

/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param data - the function parameters.
 */
export function drawShape(data: DrawShapeData): void {
    const { container, context, particle, radius, opacity, delta } = data;

    if (!particle.shape) {
        return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!drawer) {
        return;
    }

    drawer.draw({ context, particle, radius, opacity, delta, pixelRatio: container.retina.pixelRatio });
}

/**
 * Draws the particle effect after the plugin's shape renderer.
 * @param data - the function parameters.
 */
export function drawShapeAfterEffect(data: DrawShapeData): void {
    const { container, context, particle, radius, opacity, delta } = data;

    if (!particle.shape) {
        return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!drawer || !drawer.afterEffect) {
        return;
    }

    drawer.afterEffect({ context, particle, radius, opacity, delta, pixelRatio: container.retina.pixelRatio });
}

/**
 * Draws the given plugin in the canvas.
 * @param context - The canvas context.
 * @param plugin - The plugin to draw.
 * @param delta - this variable contains the delta between the current frame and the previous frame
 */
export function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
    if (!plugin.draw) {
        return;
    }

    plugin.draw(context, delta);
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
        l: color.l + (type === AlterType.darken ? -1 : 1) * value,
    };
}
