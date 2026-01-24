import { type IShapeDrawData, double, half, originPoint } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";

const defaultHeightFactor = half,
  defaultHeadWidthFactor = 0.2,
  defaultBodyHeightFactor = half;

/**
 * @param data -
 */
export function drawArrow(data: IShapeDrawData<ArrowParticle>): void {
  const { context, particle, radius } = data,
    width = radius * double,
    heightFactor = particle.heightFactor ?? defaultHeightFactor,
    headWidthFactor = particle.headWidthFactor ?? defaultHeadWidthFactor,
    bodyHeightFactor = particle.bodyHeightFactor ?? defaultBodyHeightFactor,
    height = width * heightFactor,
    headWidth = width * headWidthFactor,
    bodyHeight = height * bodyHeightFactor;

  context.moveTo(-width * half, originPoint.y);
  context.lineTo(-width * half, -bodyHeight * half);
  context.lineTo(width * half - headWidth, -bodyHeight * half);
  context.lineTo(width * half - headWidth, -height * half);
  context.lineTo(width * half + headWidth, originPoint.y);
  context.lineTo(width * half - headWidth, height * half);
  context.lineTo(width * half - headWidth, bodyHeight * half);
  context.lineTo(-width * half, bodyHeight * half);
  context.lineTo(-width * half, originPoint.y);
}
