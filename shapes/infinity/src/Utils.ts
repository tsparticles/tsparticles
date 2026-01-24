import { type IShapeDrawData, originPoint } from "@tsparticles/engine";

const loopSizeFactor = 0.55;

/**
 * @param data -
 */
export function drawInfinity(data: IShapeDrawData): void {
  const { context, radius } = data,
    loopControl = radius * loopSizeFactor;

  context.moveTo(originPoint.x, originPoint.y);
  context.bezierCurveTo(loopControl, -radius, loopControl, radius, originPoint.x, originPoint.y);
  context.moveTo(originPoint.x, originPoint.y);
  context.bezierCurveTo(-loopControl, -radius, originPoint.x - loopControl, radius, originPoint.x, originPoint.y);
}
