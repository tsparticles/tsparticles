import { type IShapeDrawData, double, doublePI, identity, none } from "@tsparticles/engine";
import type { SquircleParticle } from "./SquircleParticle.js";

export const defaultExponent = 4,
  defaultSteps = 64;

/**
 * @param v -
 * @returns -
 */
function sign(v: number): number {
  return v < none ? -identity : identity;
}

/**
 * @param data -
 */
export function drawSquircle(data: IShapeDrawData<SquircleParticle>): void {
  const { context, particle, radius } = data;

  if (particle.squircleExponent === undefined || particle.squircleSteps === undefined) {
    return;
  }

  const steps = particle.squircleSteps,
    step = doublePI / steps,
    exponent = double / particle.squircleExponent;

  context.save();
  context.scale(radius, radius);
  context.beginPath();

  for (let i = 0; i <= steps; i++) {
    const t = i * step,
      cos = Math.cos(t),
      sin = Math.sin(t),
      x = sign(cos) * Math.pow(Math.abs(cos), exponent),
      y = sign(sin) * Math.pow(Math.abs(sin), exponent);

    if (i) {
      context.lineTo(x, y);
    } else {
      context.moveTo(x, y);
    }
  }

  context.closePath();
  context.restore();
}
