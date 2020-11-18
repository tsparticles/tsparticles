import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { IAnimatableColor } from "../Options/Interfaces/IAnimatableColor";
import { NumberUtils } from "../Utils";

export class StrokeColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public isEnabled(): boolean {
        const particle = this.particle;
        const color = particle.stroke.color;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            color !== undefined &&
            typeof color !== "string" &&
            particle.strokeColor.value !== undefined &&
            color.animation.enable
        );
    }

    public update(delta: IDelta): void {
        const particle = this.particle;

        if (!this.isEnabled()) {
            return;
        }

        const animationOptions = (particle.stroke.color as IAnimatableColor).animation;
        const offset = NumberUtils.randomInRange(animationOptions.offset.min, animationOptions.offset.max);
        const colorValue = particle.strokeColor.value;

        if (!colorValue) {
            return;
        }

        colorValue.h += (particle.strokeColor.velocity ?? particle.color.velocity ?? 0) * delta.factor + offset * 3.6;

        if (colorValue.h > 360) {
            colorValue.h -= 360;
        }
    }
}
