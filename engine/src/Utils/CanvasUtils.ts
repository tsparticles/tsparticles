import type { IEffectDrawer, IShapeDrawData, IShapeDrawer } from "../export-types.js";
import { defaultZoom, minStrokeWidth, originPoint } from "../Core/Utils/Constants.js";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IDimension } from "../Core/Interfaces/IDimension.js";
import type { IDrawParticleParams } from "../Core/Interfaces/IDrawParticleParams.js";
import type { Particle } from "../Core/Particle.js";

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

  const prevAlpha = context.globalAlpha;

  context.globalAlpha = opacity;

  context.drawImage(image, originPoint.x, originPoint.y, dimension.width, dimension.height);

  context.globalAlpha = prevAlpha;
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
    { effectDrawers, shapeDrawers } = container.particles,
    pos = particle.getPosition(),
    transformData = particle.getTransformData(transform),
    drawScale = defaultZoom,
    drawPosition = {
      x: pos.x,
      y: pos.y,
    };

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
    drawRadius: radius * drawScale,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    fill: particle.shapeFill,
    stroke: strokeWidth > minStrokeWidth || !particle.shapeFill,
    transformData,
    position: { ...pos },
    drawPosition,
    drawScale,
  };

  for (const plugin of container.plugins) {
    plugin.drawParticleTransform?.(drawData);
  }

  const effect = particle.effect ? effectDrawers.get(particle.effect) : undefined,
    shape = particle.shape ? shapeDrawers.get(particle.shape) : undefined;

  drawBeforeEffect(effect, drawData);
  drawShapeBeforeDraw(shape, drawData);
  drawShape(shape, drawData);
  drawShapeAfterDraw(shape, drawData);
  drawAfterEffect(effect, drawData);

  context.resetTransform();
}

/**
 * Draws the particle effect using the plugin's shape renderer.
 * @param drawer - the particle effect drawer.
 * @param data - the function parameters.
 */
export function drawAfterEffect(drawer: IEffectDrawer | undefined, data: IShapeDrawData): void {
  if (!drawer?.drawAfter) {
    return;
  }

  const { particle } = data;

  if (!particle.effect) {
    return;
  }

  drawer.drawAfter(data);
}

/**
 * Draws the particle effect using the plugin's shape renderer.
 * @param drawer - the particle effect drawer.
 * @param data - the function parameters.
 */
export function drawBeforeEffect(drawer: IEffectDrawer | undefined, data: IShapeDrawData): void {
  if (!drawer?.drawBefore) {
    return;
  }

  const { particle } = data;

  if (!particle.effect) {
    return;
  }

  drawer.drawBefore(data);
}

/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param drawer - the particle shape drawer.
 * @param data - the function parameters.
 */
export function drawShape(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
  if (!drawer) {
    return;
  }

  const { context, particle, stroke } = data;

  if (!particle.shape) {
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
 * @param drawer - the particle shape drawer.
 * @param data - the function parameters.
 */
export function drawShapeAfterDraw(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
  if (!drawer?.afterDraw) {
    return;
  }

  const { particle } = data;

  if (!particle.shape) {
    return;
  }

  drawer.afterDraw(data);
}

/**
 * Calls the beforeDraw function of the plugin's shape renderer, this is called before drawShape.'
 * @param drawer - the particle shape drawer.
 * @param data - the function parameters.
 */
export function drawShapeBeforeDraw(drawer: IShapeDrawer | undefined, data: IShapeDrawData): void {
  if (!drawer?.beforeDraw) {
    return;
  }

  const { particle } = data;

  if (!particle.shape) {
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
