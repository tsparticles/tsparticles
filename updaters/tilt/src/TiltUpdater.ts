import { AnimationStatus, TiltDirection, getRangeValue } from "tsparticles-engine";
import type { Container, IDelta, IParticleUpdater, Particle } from "tsparticles-engine";

function updateTilt(particle: Particle, delta: IDelta): void {
    if (!particle.tilt) {
        return;
    }

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
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        const tiltOptions = particle.options.tilt;

        particle.tilt = {
            enable: tiltOptions.enable,
            value: (getRangeValue(tiltOptions.value) * Math.PI) / 180,
            sinDirection: Math.random() >= 0.5 ? 1 : -1,
            cosDirection: Math.random() >= 0.5 ? 1 : -1,
        };

        let tiltDirection = tiltOptions.direction;

        if (tiltDirection === TiltDirection.random) {
            const index = Math.floor(Math.random() * 2);

            tiltDirection = index > 0 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
        }

        switch (tiltDirection) {
            case TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = AnimationStatus.decreasing;
                break;
            case TiltDirection.clockwise:
                particle.tilt.status = AnimationStatus.increasing;
                break;
        }

        const tiltAnimation = particle.options.tilt.animation;

        if (tiltAnimation.enable) {
            particle.tilt.velocity = (tiltAnimation.speed / 360) * this.container.retina.reduceFactor;

            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= Math.random();
            }
        }
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
