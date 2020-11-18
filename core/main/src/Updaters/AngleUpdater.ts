import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import { AnimationStatus } from "../Enums";

export class AngleUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public isEnabled(): boolean {
        const particle = this.particle;
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;

        return !particle.destroyed && !particle.spawning && (rotate.path || rotateAnimation.enable);
    }

    public update(delta: IDelta): void {
        if (!this.isEnabled()) {
            return;
        }

        const particle = this.particle;
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;
        const speed = (particle.rotate.velocity ?? 0) * delta.factor;
        const max = 2 * Math.PI;

        if (rotate.path) {
            particle.pathAngle = Math.atan2(particle.velocity.vertical, particle.velocity.horizontal);
        } else if (rotateAnimation.enable) {
            switch (particle.rotate.status) {
                case AnimationStatus.increasing:
                    particle.rotate.value += speed;

                    if (particle.rotate.value > max) {
                        particle.rotate.value -= max;
                    }
                    break;
                case AnimationStatus.decreasing:
                default:
                    particle.rotate.value -= speed;

                    if (particle.rotate.value < 0) {
                        particle.rotate.value += max;
                    }
                    break;
            }
        }
    }
}
