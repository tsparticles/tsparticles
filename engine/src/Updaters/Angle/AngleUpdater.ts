import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import { Particle } from "../../Core/Particle";
import { AnimationStatus, RotateDirection } from "../../Enums";
import { getRangeValue } from "../../Utils";
import { Container } from "../../Core/Container";

function updateAngle(particle: Particle, delta: IDelta): void {
    const rotate = particle.rotate;

    if (!rotate) {
        return;
    }

    const rotateOptions = particle.options.rotate;
    const rotateAnimation = rotateOptions.animation;
    const speed = (rotate.velocity ?? 0) * delta.factor;
    const max = 2 * Math.PI;

    if (!rotateAnimation.enable) {
        return;
    }

    switch (rotate.status) {
        case AnimationStatus.increasing:
            rotate.value += speed;

            if (rotate.value > max) {
                rotate.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            rotate.value -= speed;

            if (rotate.value < 0) {
                rotate.value += max;
            }

            break;
    }
}

export class AngleUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        const rotateOptions = particle.options.rotate;

        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: (getRangeValue(rotateOptions.value) * Math.PI) / 180,
        };

        let rotateDirection = rotateOptions.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }

        switch (rotateDirection) {
            case RotateDirection.counterClockwise:
            case "counterClockwise":
                particle.rotate.status = AnimationStatus.decreasing;
                break;
            case RotateDirection.clockwise:
                particle.rotate.status = AnimationStatus.increasing;
                break;
        }

        const rotateAnimation = particle.options.rotate.animation;

        if (rotateAnimation.enable) {
            particle.rotate.velocity = (rotateAnimation.speed / 360) * this.container.retina.reduceFactor;

            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= Math.random();
            }
        }
    }

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
