import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
    getRandom,
    getRangeValue,
    millisecondsToSeconds,
    randomInRange,
    setRangeValue,
} from "@tsparticles/engine";
import type { ILifeParticlesOptions, LifeParticle, LifeParticlesOptions } from "./Types.js";
import { Life } from "./Options/Classes/Life.js";

const noTime = 0,
    identity = 1,
    infiniteValue = -1,
    noLife = 0,
    minCanvasSize = 0;

export class LifeUpdater implements IParticleUpdater {
    private readonly container;

    constructor(container: Container) {
        this.container = container;
    }

    async init(particle: LifeParticle): Promise<void> {
        const container = this.container,
            particlesOptions = particle.options,
            lifeOptions = particlesOptions.life;

        if (!lifeOptions) {
            return;
        }

        particle.life = {
            delay: container.retina.reduceFactor
                ? ((getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? identity : getRandom())) /
                      container.retina.reduceFactor) *
                  millisecondsToSeconds
                : noTime,
            delayTime: noTime,
            duration: container.retina.reduceFactor
                ? ((getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? identity : getRandom())) /
                      container.retina.reduceFactor) *
                  millisecondsToSeconds
                : noTime,
            time: noTime,
            count: lifeOptions.count,
        };

        if (particle.life.duration <= noTime) {
            particle.life.duration = infiniteValue;
        }

        if (particle.life.count <= noTime) {
            particle.life.count = infiniteValue;
        }

        if (particle.life) {
            particle.spawning = particle.life.delay > noTime;
        }

        await Promise.resolve();
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed;
    }

    loadOptions(
        options: LifeParticlesOptions,
        ...sources: (RecursivePartial<ILifeParticlesOptions> | undefined)[]
    ): void {
        if (!options.life) {
            options.life = new Life();
        }

        for (const source of sources) {
            options.life.load(source?.life);
        }
    }

    update(particle: LifeParticle, delta: IDelta): void {
        if (!this.isEnabled(particle) || !particle.life) {
            return;
        }

        const life = particle.life;

        let justSpawned = false;

        if (particle.spawning) {
            life.delayTime += delta.value;

            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = noTime;
                life.time = noTime;
            } else {
                return;
            }
        }

        if (life.duration === infiniteValue) {
            return;
        }

        if (particle.spawning) {
            return;
        }

        if (justSpawned) {
            life.time = noTime;
        } else {
            life.time += delta.value;
        }

        if (life.time < life.duration) {
            return;
        }

        life.time = noTime;

        if (particle.life.count > noLife) {
            particle.life.count--;
        }

        if (particle.life.count === noLife) {
            particle.destroy();

            return;
        }

        const canvasSize = this.container.canvas.size,
            widthRange = setRangeValue(minCanvasSize, canvasSize.width),
            heightRange = setRangeValue(minCanvasSize, canvasSize.width);

        particle.position.x = randomInRange(widthRange);
        particle.position.y = randomInRange(heightRange);
        particle.spawning = true;
        life.delayTime = noTime;
        life.time = noTime;
        particle.reset();

        const lifeOptions = particle.options.life;

        if (lifeOptions) {
            life.delay = getRangeValue(lifeOptions.delay.value) * millisecondsToSeconds;
            life.duration = getRangeValue(lifeOptions.duration.value) * millisecondsToSeconds;
        }
    }
}
