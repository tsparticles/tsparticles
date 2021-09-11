import type { IDelta, IParticleUpdater, Particle } from "tsparticles";

export class OrbitUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        const orbitAnimations = particle.options.orbit.animation;

        return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
    }

    update(particle: Particle, delta: IDelta): void {
        const orbitAnimations = particle.options.orbit.animation;

        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.orbitRotation === undefined) {
            particle.orbitRotation = 0;
        }

        particle.orbitRotation += (orbitAnimations.speed / (Math.PI * 2)) * delta.factor;
    }
}
