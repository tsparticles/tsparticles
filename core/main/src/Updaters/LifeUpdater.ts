import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { Particle } from "../Core/Particle";
import type { Container } from "../Core/Container";
import { NumberUtils } from "../Utils";

export class LifeUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public isEnabled(): boolean {
        return !this.particle.destroyed;
    }

    public update(delta: IDelta): void {
        if (!this.isEnabled()) {
            return;
        }

        const particle = this.particle;
        let justSpawned = false;

        if (particle.spawning) {
            particle.lifeDelayTime += delta.value;

            if (particle.lifeDelayTime >= particle.lifeDelay) {
                justSpawned = true;
                particle.spawning = false;
                particle.lifeDelayTime = 0;
                particle.lifeTime = 0;
            } else {
                return;
            }
        }

        if (particle.lifeDuration === -1) {
            return;
        }

        if (justSpawned) {
            particle.lifeTime = 0;
        } else {
            particle.lifeTime += delta.value;
        }

        if (particle.lifeTime < particle.lifeDuration) {
            return;
        }

        particle.lifeTime = 0;

        if (particle.livesRemaining > 0) {
            particle.livesRemaining--;
        }

        if (particle.livesRemaining === 0) {
            particle.destroy();
            return;
        }

        const canvasSize = this.container.canvas.size;

        particle.position.x = NumberUtils.randomInRange(0, canvasSize.width);
        particle.position.y = NumberUtils.randomInRange(0, canvasSize.height);
        particle.spawning = true;
        particle.lifeDelayTime = 0;
        particle.lifeTime = 0;
        particle.reset();

        const lifeOptions = particle.particlesOptions.life;

        particle.lifeDelay = NumberUtils.getValue(lifeOptions.delay) * 1000;
        particle.lifeDuration = NumberUtils.getValue(lifeOptions.duration) * 1000;
    }
}
