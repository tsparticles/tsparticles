import type {
    Container,
    IDelta,
    IParticleUpdater,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import { getRandom, getRangeValue, randomInRange, setRangeValue } from "tsparticles-engine";
import type { ILife } from "./Options/Interfaces/ILife";
import { Life } from "./Options/Classes/Life";

interface IParticleLife {
    count: number;
    delay: number;
    delayTime: number;
    duration: number;
    time: number;
}

type ILifeParticlesOptions = IParticlesOptions & {
    life?: ILife;
};

type LifeParticlesOptions = ParticlesOptions & {
    life?: Life;
};

type LifeParticle = Particle & {
    life?: IParticleLife;
    options: LifeParticlesOptions;
};

export class LifeUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: LifeParticle): void {
        const container = this.container,
            particlesOptions = particle.options,
            lifeOptions = particlesOptions.life;

        if (!lifeOptions) {
            return;
        }

        particle.life = {
            delay: container.retina.reduceFactor
                ? ((getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : getRandom())) /
                      container.retina.reduceFactor) *
                  1000
                : 0,
            delayTime: 0,
            duration: container.retina.reduceFactor
                ? ((getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : getRandom())) /
                      container.retina.reduceFactor) *
                  1000
                : 0,
            time: 0,
            count: lifeOptions.count,
        };

        if (particle.life.duration <= 0) {
            particle.life.duration = -1;
        }

        if (particle.life.count <= 0) {
            particle.life.count = -1;
        }

        if (particle.life) {
            particle.spawning = particle.life.delay > 0;
        }
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
                life.delayTime = 0;
                life.time = 0;
            } else {
                return;
            }
        }

        if (life.duration === -1) {
            return;
        }

        if (particle.spawning) {
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

        if (lifeOptions) {
            life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
            life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
        }
    }
}
