import type { Container, IDelta, IParticleUpdater, Particle } from "tsparticles-engine";

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
