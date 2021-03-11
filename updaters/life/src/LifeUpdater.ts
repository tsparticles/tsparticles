import type { Container, IDelta, IParticleUpdater, Particle } from "tsparticles-engine";
import { getRangeValue, randomInRange, setRangeValue } from "tsparticles-engine";

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

        const canvasSize = this.container.canvas.size,
            widthRange = setRangeValue(0, canvasSize.width),
            heightRange = setRangeValue(0, canvasSize.width);

        particle.position.x = randomInRange(widthRange);
        particle.position.y = randomInRange(heightRange);
        particle.spawning = true;
        life.delayTime = 0;
        life.time = 0;
        particle.reset();

        const lifeOptions = particle.options.life;

        life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
        life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
    }
}
