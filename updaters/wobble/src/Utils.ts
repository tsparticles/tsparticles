import { type IDelta, doublePI, millisecondsToSeconds } from "@tsparticles/engine";
import type { WobbleParticle } from "./Types.js";

const defaultDistance = 0,
  distanceFactor = 60;

/**
 * Updates particle wobbling values
 * @param particle - the particle to update
 * @param delta - this variable contains the delta between the current frame and the previous frame
 */
export function updateWobble(particle: WobbleParticle, delta: IDelta): void {
  const { wobble: wobbleOptions } = particle.options,
    { container, wobble } = particle;

  if (!wobbleOptions?.enable || !wobble) {
    return;
  }

  const reduceFactor = container.retina.reduceFactor,
    angleSpeed = wobble.angleSpeed * delta.factor * reduceFactor,
    moveSpeed = wobble.moveSpeed * delta.factor * reduceFactor,
    distance =
      (moveSpeed * (particle.retina.wobbleDistance ?? defaultDistance)) / (millisecondsToSeconds / distanceFactor),
    max = doublePI,
    { position } = particle;

  wobble.angle += angleSpeed;

  if (wobble.angle > max) {
    wobble.angle -= max;
  }

  position.x += distance * Math.cos(wobble.angle);
  position.y += distance * Math.abs(Math.sin(wobble.angle));
}
