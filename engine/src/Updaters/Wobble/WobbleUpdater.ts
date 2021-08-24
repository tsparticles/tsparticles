import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import type { Particle } from "../../Core/Particle";

function updateWobble(particle: Particle, delta: IDelta): void {
    const wobble = particle.options.wobble;
    const speed = particle.wobbleSpeed * delta.factor;
    const distance = (particle.wobbleDistance * delta.factor) / (1000 / 60);
    const max = 2 * Math.PI;

    if (!wobble.enable) {
        return;
    }

    particle.wobbleAngle += speed;

    if (particle.wobbleAngle > max) {
        particle.wobbleAngle -= max;
    }

    particle.position.x += distance * Math.cos(particle.wobbleAngle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobbleAngle));
}

export class WobbleUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const wobble = particle.options.wobble;

        return !particle.destroyed && !particle.spawning && wobble.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateWobble(particle, delta);
    }
}
