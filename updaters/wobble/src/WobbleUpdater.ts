import type { Container, IDelta, IParticleUpdater, Particle } from "tsparticles-engine";
import { getRangeValue } from "tsparticles-engine";

type WobbleParticle = Particle & {
    retina: {
        wobbleDistance?: number;
    };
};

function updateWobble(particle: WobbleParticle, delta: IDelta): void {
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
    constructor(private readonly container: Container) {}

    init(particle: WobbleParticle): void {
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

        particle.retina.wobbleDistance = getRangeValue(wobbleOpt.distance) * this.container.retina.pixelRatio;
    }

    isEnabled(particle: WobbleParticle): boolean {
        return !particle.destroyed && !particle.spawning && particle.options.wobble.enable;
    }

    update(particle: WobbleParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateWobble(particle, delta);
    }
}
