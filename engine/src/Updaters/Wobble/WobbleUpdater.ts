import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import type { Particle } from "../../Core/Particle";
import { getRangeValue } from "../../Utils";

function updateWobble(particle: Particle, delta: IDelta): void {
    const wobble = particle.options.wobble;

    if (!wobble.enable || !particle.wobble) {
        return;
    }

    const speed = particle.wobble.speed * delta.factor;
    const distance = ((particle.retina.wobbleDistance ?? 0) * delta.factor) / (1000 / 60);
    const max = 2 * Math.PI;

    particle.wobble.angle += speed;

    if (particle.wobble.angle > max) {
        particle.wobble.angle -= max;
    }

    particle.position.x += distance * Math.cos(particle.wobble.angle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}

export class WobbleUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        const wobbleOpt = particle.options.wobble;

        if (wobbleOpt.enable) {
            particle.wobble = {
                angle: Math.random() * Math.PI * 2,
                speed: getRangeValue(wobbleOpt.speed) / 360,
            };
        } else {
            particle.wobble = {
                angle: 0,
                speed: 0,
            };
        }
    }

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
