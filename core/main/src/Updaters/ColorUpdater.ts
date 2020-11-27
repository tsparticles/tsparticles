import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IDelta } from "../Core/Interfaces/IDelta";
import { NumberUtils } from "../Utils";
import type { ColorAnimation } from "../Options/Classes/ColorAnimation";
import type { IParticleValueAnimation } from "../Core/Interfaces/IParticleValueAnimation";

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
            this.updateValue(particle, delta, particle.color.h, animationOptions.h, 360);
        }

        if (particle.color?.s !== undefined) {
            this.updateValue(particle, delta, particle.color.s, animationOptions.s, 100);
        }

        if (particle.color?.l !== undefined) {
            this.updateValue(particle, delta, particle.color.l, animationOptions.l, 100);
        }
    }

    public updateValue(
        particle: Particle,
        delta: IDelta,
        value: IParticleValueAnimation<number>,
        valueAnimation: ColorAnimation,
        max: number
    ) {
        const colorValue = value;

        if (!colorValue || !valueAnimation.enable) {
            return;
        }

        const offset = NumberUtils.randomInRange(valueAnimation.offset.min, valueAnimation.offset.max);

        colorValue.value += (value.velocity ?? 0) * delta.factor + offset * 3.6;

        if (colorValue.value > max) {
            colorValue.value %= max;
        }
    }
}
