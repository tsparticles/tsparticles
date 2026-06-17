import { DestroyType, type IDelta, updateColor } from "@tsparticles/engine";
import type { GradientParticle } from "./Types.js";
import { updateAnimation } from "@tsparticles/animation-utils";

/**
 * @param particle - The particle to process
 * @param delta - The delta time
 */
export function updateGradient(particle: GradientParticle, delta: IDelta): void {
  const { gradient } = particle;

  if (!gradient) {
    return;
  }

  updateAnimation(particle, gradient.angle, false, DestroyType.none, delta);

  for (const color of gradient.colors) {
    updateColor(color.value, delta);

    if (color.opacity) {
      updateAnimation(particle, color.opacity, true, DestroyType.none, delta);
    }
  }
}
