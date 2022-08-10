import { AnimationStatus, getRandom, getRangeValue } from "tsparticles-engine";
import type {
    Container,
    IDelta,
    IParticleTransformValues,
    IParticleUpdater,
    IParticleValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import type { ITilt } from "./Options/Interfaces/ITilt";
import { Tilt } from "./Options/Classes/Tilt";
import { TiltDirection } from "./TiltDirection";

export interface IParticleTiltValueAnimation extends IParticleValueAnimation<number> {
    cosDirection: number;
    sinDirection: number;
}

type TiltParticle = Particle & {
    options: TiltParticlesOptions;
    tilt?: IParticleTiltValueAnimation;
};

type ITiltParticlesOptions = IParticlesOptions & {
    tilt?: ITilt;
};

type TiltParticlesOptions = ParticlesOptions & {
    tilt?: Tilt;
};

function updateTilt(particle: TiltParticle, delta: IDelta): void {
    if (!particle.tilt || !particle.options.tilt) {
        return;
    }

    const tilt = particle.options.tilt,
        tiltAnimation = tilt.animation,
        speed = (particle.tilt.velocity ?? 0) * delta.factor,
        max = 2 * Math.PI,
        decay = particle.tilt.decay ?? 1;

    if (!tiltAnimation.enable) {
        return;
    }

    switch (particle.tilt.status) {
        case AnimationStatus.increasing:
            particle.tilt.value += speed;

            if (particle.tilt.value > max) {
                particle.tilt.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            particle.tilt.value -= speed;

            if (particle.tilt.value < 0) {
                particle.tilt.value += max;
            }

            break;
    }

    if (particle.tilt.velocity && decay !== 1) {
        particle.tilt.velocity *= decay;
    }
}

export class TiltUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    getTransformValues(particle: TiltParticle): IParticleTransformValues {
        const tilt = particle.tilt?.enable && particle.tilt;

        return {
            b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
            c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined,
        };
    }

    init(particle: TiltParticle): void {
        const tiltOptions = particle.options.tilt;

        if (!tiltOptions) {
            return;
        }

        particle.tilt = {
            enable: tiltOptions.enable,
            value: (getRangeValue(tiltOptions.value) * Math.PI) / 180,
            sinDirection: getRandom() >= 0.5 ? 1 : -1,
            cosDirection: getRandom() >= 0.5 ? 1 : -1,
        };

        let tiltDirection = tiltOptions.direction;

        if (tiltDirection === TiltDirection.random) {
            const index = Math.floor(getRandom() * 2);

            tiltDirection = index > 0 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
        }

        switch (tiltDirection) {
            case TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = AnimationStatus.decreasing;
                break;
            case TiltDirection.clockwise:
                particle.tilt.status = AnimationStatus.increasing;
                break;
        }

        const tiltAnimation = particle.options.tilt?.animation;

        if (tiltAnimation?.enable) {
            particle.tilt.decay = 1 - getRangeValue(tiltAnimation.decay);
            particle.tilt.velocity = (getRangeValue(tiltAnimation.speed) / 360) * this.container.retina.reduceFactor;

            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= getRandom();
            }
        }
    }

    isEnabled(particle: TiltParticle): boolean {
        const tiltAnimation = particle.options.tilt?.animation;

        return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
    }

    loadOptions(
        options: TiltParticlesOptions,
        ...sources: (RecursivePartial<ITiltParticlesOptions> | undefined)[]
    ): void {
        if (!options.tilt) {
            options.tilt = new Tilt();
        }

        for (const source of sources) {
            options.tilt.load(source?.tilt);
        }
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateTilt(particle, delta);
    }
}
