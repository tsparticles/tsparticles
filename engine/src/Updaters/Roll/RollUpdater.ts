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
    init(particle: Particle): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        const roll = particle.options.roll;

        return !particle.destroyed && !particle.spawning && roll.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateRoll(particle, delta);
    }
}
