import type { IDelta, IParticleUpdater } from "../Core/Interfaces";
import { Particle } from "../Core/Particle";
import { AnimationStatus } from "../Enums";

function updateAngle(particle: Particle, delta: IDelta): void {
    const rotate = particle.options.rotate;
    const rotateAnimation = rotate.animation;
    const speed = (particle.rotate.velocity ?? 0) * delta.factor;
    const max = 2 * Math.PI;

    if (!rotateAnimation.enable) {
        return;
    }

    switch (particle.rotate.status) {
        case AnimationStatus.increasing:
            particle.rotate.value += speed;

            if (particle.rotate.value > max) {
                particle.rotate.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            particle.rotate.value -= speed;

            if (particle.rotate.value < 0) {
                particle.rotate.value += max;
            }

            break;
    }
}

export class AngleUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;

        return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateAngle(particle, delta);
    }
}
