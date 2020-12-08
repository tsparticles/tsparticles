import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import { AnimationStatus } from "../Enums";
import { checkDestroy, clamp } from "../Utils";

export class OpacityUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        const opacityAnim = particle.options.opacity.anim;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            opacityAnim.enable &&
            (opacityAnim.count <= 0 || particle.loops.opacity < opacityAnim.count)
        );
    }

    public update(particle: Particle, delta: IDelta): void {
        const opacityOpt = particle.options.opacity;
        const opacityAnim = opacityOpt.anim;
        const value = opacityOpt.value;
        const minValue = typeof value === "number" ? value : value.min;
        const maxValue = typeof value === "number" ? value : value.max;

        if (!this.isEnabled(particle)) {
            return;
        }

        switch (particle.opacity.status) {
            case AnimationStatus.increasing:
                if (particle.opacity.value >= maxValue) {
                    particle.opacity.status = AnimationStatus.decreasing;
                    particle.loops.opacity++;
                } else {
                    particle.opacity.value += (particle.opacity.velocity ?? 0) * delta.factor;
                }
                break;
            case AnimationStatus.decreasing:
                if (particle.opacity.value <= minValue) {
                    particle.opacity.status = AnimationStatus.increasing;
                    particle.loops.opacity++;
                } else {
                    particle.opacity.value -= (particle.opacity.velocity ?? 0) * delta.factor;
                }
                break;
        }

        checkDestroy(particle, opacityAnim.destroy, particle.opacity.value, minValue, maxValue);

        if (!particle.destroyed) {
            particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
        }
    }
}
