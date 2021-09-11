import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import type { Particle } from "../../Core/Particle";
import { AnimationStatus } from "../../Enums";

function updateTilt(particle: Particle, delta: IDelta): void {
    const tilt = particle.options.tilt;
    const tiltAnimation = tilt.animation;
    const speed = (particle.tilt.velocity ?? 0) * delta.factor;
    const max = 2 * Math.PI;

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
}

export class TiltUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        const tilt = particle.options.tilt;
        const tiltAnimation = tilt.animation;

        return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateTilt(particle, delta);
    }
}
