import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { Particle } from "../Core/Particle";
import type { Container } from "../Core/Container";
import { NumberUtils } from "../Utils";

export class LifeUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        return !particle.destroyed;
    }

    public update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        const life = particle.life;

        let justSpawned = false;

        if (particle.spawning) {
            life.delayTime += delta.value;

            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = 0;
                life.time = 0;
            } else {
                return;
            }
        }

        if (life.duration === -1) {
            return;
        }

        if (justSpawned) {
            life.time = 0;
        } else {
            life.time += delta.value;
        }

        if (life.time < life.duration) {
            return;
        }

        life.time = 0;

        if (particle.life.count > 0) {
            particle.life.count--;
        }

        if (particle.life.count === 0) {
            particle.destroy();

            return;
        }

        const canvasSize = this.container.canvas.size;

        particle.position.x = NumberUtils.randomInRange(0, canvasSize.width);
        particle.position.y = NumberUtils.randomInRange(0, canvasSize.height);
        particle.spawning = true;
        life.delayTime = 0;
        life.time = 0;
        particle.reset();

        const lifeOptions = particle.options.life;

        life.delay = NumberUtils.getValue(lifeOptions.delay) * 1000;
        life.duration = NumberUtils.getValue(lifeOptions.duration) * 1000;
    }
}
