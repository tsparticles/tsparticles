import type { Container, IDelta, IParticleUpdater, IParticleValueAnimation, Particle } from "tsparticles-engine";
import type { IHslAnimation } from "tsparticles-engine/Options/Interfaces/IHslAnimation";
import { randomInRange } from "tsparticles-engine";
import type { IAnimatableColor } from "tsparticles-engine/Options/Interfaces/IAnimatableColor";
import type { IColorAnimation } from "tsparticles-engine/Options/Interfaces/IColorAnimation";

export class StrokeColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        const color = particle.stroke.color;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            color !== undefined &&
            ((particle.strokeColor?.h.value !== undefined && color.animation.h.enable) ||
                (particle.strokeColor?.s.value !== undefined && color.animation.s.enable) ||
                (particle.strokeColor?.l.value !== undefined && color.animation.l.enable))
        );
    }

    public update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        const animationOptions = (particle.stroke.color as IAnimatableColor).animation;
        const valueAnimations = animationOptions as IColorAnimation;

        if (valueAnimations.enable !== undefined) {
            const hue = particle.strokeColor?.h ?? particle.color?.h;

            if (hue) {
                this.updateValue(particle, delta, hue, valueAnimations, 360);
            }
        } else {
            const hslAnimations = animationOptions as IHslAnimation;

            const h = particle.strokeColor?.h ?? particle.color?.h;

            if (h) {
                this.updateValue(particle, delta, h, hslAnimations.h, 360);
            }

            const s = particle.strokeColor?.s ?? particle.color?.s;

            if (s) {
                this.updateValue(particle, delta, s, hslAnimations.s, 100);
            }

            const l = particle.strokeColor?.l ?? particle.color?.l;

            if (l) {
                this.updateValue(particle, delta, l, hslAnimations.l, 100);
            }
        }
    }

    public updateValue(
        particle: Particle,
        delta: IDelta,
        value: IParticleValueAnimation<number>,
        valueAnimation: IColorAnimation,
        max: number
    ): void {
        const colorValue = value;

        if (!colorValue) {
            return;
        }

        const offset = randomInRange(valueAnimation.offset);

        colorValue.value += (value.velocity ?? 0) * delta.factor + offset * 3.6;

        if (colorValue.value > max) {
            colorValue.value %= max;
        }
    }
}
