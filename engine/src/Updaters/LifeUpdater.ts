import { Particle } from "../Core/Particle";
import { IDelta, IParticleUpdater } from "../Core/Interfaces";
import { Container } from "../Core/Container";
import { getRangeValue, randomInRange, setRangeValue } from "../Utils";

export class LifeUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        let justSpawned = false;

        if (particle.spawning) {
            particle.life.delayTime += delta.value;

            if (particle.life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                particle.life.delayTime = 0;
                particle.life.time = 0;
            }
        }

        if (particle.life.duration === -1) {
            return;
        }

        if (particle.spawning) {
            return;
        }

        if (justSpawned) {
            particle.life.time = 0;
        } else {
            particle.life.time += delta.value;
        }

        if (particle.life.time < particle.life.duration) {
            return;
        }

        particle.life.time = 0;

        if (particle.life.count > 0) {
            particle.life.count--;
        }

        if (particle.life.count === 0) {
            particle.destroy();
            return;
        }

        const canvasSize = this.container.canvas.size;

        particle.position.x = randomInRange(setRangeValue(0, canvasSize.width));
        particle.position.y = randomInRange(setRangeValue(0, canvasSize.height));
        particle.spawning = true;
        particle.life.delayTime = 0;
        particle.life.time = 0;
        particle.reset();

        const lifeOptions = particle.options.life;

        particle.life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
        particle.life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
    }
}
