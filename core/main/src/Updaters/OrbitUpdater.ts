import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";

export class OrbitUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public isEnabled(): boolean {
        const particle = this.particle,
            orbitAnimations = particle.options.orbit.animation;

        return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
    }

    public update(delta: IDelta): void {
        const particle = this.particle,
            orbitAnimations = particle.options.orbit.animation;

        if (!this.isEnabled()) {
            return;
        }

        particle.orbitRotation += orbitAnimations.speed * delta.factor;
    }
}
