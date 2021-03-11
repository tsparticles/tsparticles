import type { Container, IDelta, IParticleUpdater, IParticleValueAnimation, Particle } from "tsparticles-engine";
import { AnimationStatus, randomInRange } from "tsparticles-engine";
import type { ColorAnimation } from "tsparticles-engine/Options/Classes/ColorAnimation";

export class ColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        const animationOptions = particle.options.color.animation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            ((particle.color?.h.value !== undefined && animationOptions.h.enable) ||
                (particle.color?.s.value !== undefined && animationOptions.s.enable) ||
                (particle.color?.l.value !== undefined && animationOptions.l.enable))
        );
    }

    public update(particle: Particle, delta: IDelta): void {
        const animationOptions = particle.options.color.animation;

        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.color?.h !== undefined) {
            this.updateValue(particle, delta, particle.color.h, animationOptions.h, 360, false);
        }

        if (particle.color?.s !== undefined) {
            this.updateValue(particle, delta, particle.color.s, animationOptions.s, 100, true);
        }

        if (particle.color?.l !== undefined) {
            this.updateValue(particle, delta, particle.color.l, animationOptions.l, 100, true);
        }
    }

    public updateValue(
        particle: Particle,
        delta: IDelta,
        value: IParticleValueAnimation<number>,
        valueAnimation: ColorAnimation,
        max: number,
        decrease: boolean
    ): void {
        const colorValue = value;

        if (!colorValue || !valueAnimation.enable) {
            return;
        }

        const offset = randomInRange(valueAnimation.offset);
        const velocity = (value.velocity ?? 0) * delta.factor + offset * 3.6;

        if (!decrease || colorValue.status === AnimationStatus.increasing) {
            colorValue.value += velocity;

            if (decrease && colorValue.value > max) {
                colorValue.status = AnimationStatus.decreasing;
                colorValue.value -= colorValue.value % max;
            }
        } else {
            colorValue.value -= velocity;

            if (colorValue.value < 0) {
                colorValue.status = AnimationStatus.increasing;
                colorValue.value += colorValue.value;
            }
        }

        if (colorValue.value > max) {
            colorValue.value %= max;
        }
    }
}
