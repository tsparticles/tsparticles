import { AnimationStatus, type IDelta } from "@tsparticles/engine";
import type { TiltParticle } from "./Types.js";

const defaultVelocity = 0,
    defaultDecay = 1,
    double = 2,
    doublePI = Math.PI * double,
    minValue = 0,
    identity = 1;

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
        speed = (particle.tilt.velocity ?? defaultVelocity) * delta.factor,
        max = doublePI,
        decay = particle.tilt.decay ?? defaultDecay;

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

            if (particle.tilt.value < minValue) {
                particle.tilt.value += max;
            }

            break;
    }

    if (particle.tilt.velocity && decay !== identity) {
        particle.tilt.velocity *= decay;
    }
}
