import type { ICoordinates, IShapeDrawData } from "@tsparticles/engine";
import type { StarParticle } from "./StarParticle.js";

const defaultInset = 2,
  origin: ICoordinates = { x: 0, y: 0 };

/**
 *
 * @param data -
 */
export function drawStar(data: IShapeDrawData<StarParticle>): void {
  const { context, particle, radius } = data,
    sides = particle.sides,
    inset = particle.starInset ?? defaultInset;

  context.moveTo(origin.x, origin.y - radius);

  for (let i = 0; i < sides; i++) {
    context.rotate(Math.PI / sides);
    context.lineTo(origin.x, origin.y - radius * inset);
    context.rotate(Math.PI / sides);
    context.lineTo(origin.x, origin.y - radius);
  }
}
