import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import type { Particle } from "../../Core/Particle";

function updateRoll(particle: Particle, delta: IDelta): void {
    const roll = particle.options.roll;
    const speed = particle.rollSpeed * delta.factor;
    const max = 2 * Math.PI;

    if (!roll.enable) {
        return;
    }

    particle.rollAngle += speed;

    if (particle.rollAngle > max) {
        particle.rollAngle -= max;
    }
}

export class RollUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;

        return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateRoll(particle, delta);
    }
}
