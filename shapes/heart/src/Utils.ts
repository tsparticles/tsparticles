import { type IShapeDrawData, double, half } from "@tsparticles/engine";

/**
 *
 * @param data -
 */
export function drawHeart(data: IShapeDrawData): void {
  const { context, radius } = data,
    diameter = radius * double,
    halfRadius = radius * half,
    radiusAndHalf = radius + halfRadius,
    x = -radius,
    y = -radius;

  context.moveTo(x, y + halfRadius);
  context.quadraticCurveTo(x, y, x + halfRadius, y);
  context.quadraticCurveTo(x + radius, y, x + radius, y + halfRadius);
  context.quadraticCurveTo(x + radius, y, x + radiusAndHalf, y);
  context.quadraticCurveTo(x + diameter, y, x + diameter, y + halfRadius);
  context.quadraticCurveTo(x + diameter, y + radius, x + radiusAndHalf, y + radiusAndHalf);
  context.lineTo(x + radius, y + diameter);
  context.lineTo(x + halfRadius, y + radiusAndHalf);
  context.quadraticCurveTo(x, y + radius, x, y + halfRadius);
}
