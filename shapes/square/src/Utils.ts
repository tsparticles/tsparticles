import { type IShapeDrawData, double } from "@tsparticles/engine";

/**
 *
 * @param data -
 */
export function drawSquare(data: IShapeDrawData): void {
  const { context, radius } = data,
    fixedRadius = radius * Math.SQRT1_2,
    fixedDiameter = fixedRadius * double;

  context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
}
