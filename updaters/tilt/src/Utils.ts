import { AnimationStatus, type IDelta } from "tsparticles-engine";
import type { TiltParticle } from "./Types";

/**
 * @param particle -
 * @param delta -
 */
export function updateTilt(particle: TiltParticle, delta: IDelta): void {
    if (!particle.tilt || !particle.options.tilt) {
        return;
    }

    const tilt = particle.options.tilt,
        tiltAnimation = tilt.animation,
        speed = (particle.tilt.velocity ?? 0) * delta.factor,
        max = 2 * Math.PI,
        decay = particle.tilt.decay ?? 1;

    if (!tiltAnimation.enable) {
        return;
    }

    switch (particle.tilt.status) {
        case AnimationStatus.increasing:
            particle.tilt.value += speed;

            if (particle.tilt.value > max) {
                particle.tilt.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            particle.tilt.value -= speed;

            if (particle.tilt.value < 0) {
                particle.tilt.value += max;
            }

            break;
    }

    if (particle.tilt.velocity && decay !== 1) {
        particle.tilt.velocity *= decay;
    }
}
