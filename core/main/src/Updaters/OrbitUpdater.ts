import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";

export class OrbitUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        const orbitAnimations = particle.options.orbit.animation;

        return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
    }

    public update(particle: Particle, delta: IDelta): void {
        const orbitAnimations = particle.options.orbit.animation;

        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.orbitRotation === undefined) {
            particle.orbitRotation = 0;
        }

        particle.orbitRotation += orbitAnimations.speed * delta.factor;
    }
}
