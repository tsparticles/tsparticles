import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import { AnimationStatus } from "../Enums";
import { NumberUtils, Utils } from "../Utils";

export class OpacityUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public isEnabled(): boolean {
        const particle = this.particle;
        const sizeOpt = particle.particlesOptions.size;
        const sizeAnim = sizeOpt.animation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            sizeAnim.enable &&
            (sizeAnim.count <= 0 || particle.loops.size < sizeAnim.count)
        );
    }

    public update(delta: IDelta): void {
        const container = this.container;
        const particle = this.particle;
        const sizeOpt = particle.particlesOptions.size;
        const sizeAnim = sizeOpt.animation;
        const sizeVelocity = (particle.size.velocity ?? 0) * delta.factor;
        const maxValue = particle.sizeValue ?? container.retina.sizeValue;
        const minValue = sizeAnim.minimumValue * container.retina.pixelRatio;

        if (!this.isEnabled()) {
            return;
        }

        switch (particle.size.status) {
            case AnimationStatus.increasing:
                if (particle.size.value >= maxValue) {
                    particle.size.status = AnimationStatus.decreasing;
                    particle.loops.size++;
                } else {
                    particle.size.value += sizeVelocity;
                }
                break;
            case AnimationStatus.decreasing:
                if (particle.size.value <= minValue) {
                    particle.size.status = AnimationStatus.increasing;
                    particle.loops.size++;
                } else {
                    particle.size.value -= sizeVelocity;
                }
        }

        Utils.checkDestroy(particle, sizeAnim.destroy, particle.size.value, minValue, maxValue);

        if (!particle.destroyed) {
            particle.size.value = NumberUtils.clamp(particle.size.value, minValue, maxValue);
        }
    }
}
