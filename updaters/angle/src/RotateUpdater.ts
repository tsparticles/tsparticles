import { AnimationStatus, RotateDirection, getRandom, getRangeValue } from "tsparticles-engine";
import type {
    Container,
    IDelta,
    IParticleUpdater,
    IParticleValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import type { IRotate } from "./Options/Interfaces/IRotate";
import { Rotate } from "./Options/Classes/Rotate";

type RotateParticle = Particle & {
    options: RotateParticlesOptions;
    rotate?: IParticleValueAnimation<number>;
};

type IRotateParticlesOptions = IParticlesOptions & {
    rotate?: IRotate;
};

type RotateParticlesOptions = ParticlesOptions & {
    rotate?: Rotate;
};

function updateAngle(particle: RotateParticle, delta: IDelta): void {
    const rotate = particle.rotate,
        rotateOptions = particle.options.rotate;

    if (!rotate || !rotateOptions) {
        return;
    }

    const rotateAnimation = rotateOptions.animation,
        speed = (rotate.velocity ?? 0) * delta.factor,
        max = 2 * Math.PI,
        decay = rotate.decay ?? 1;

    if (!rotateAnimation.enable) {
        return;
    }

    switch (rotate.status) {
        case AnimationStatus.increasing:
            rotate.value += speed;

            if (rotate.value > max) {
                rotate.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            rotate.value -= speed;

            if (rotate.value < 0) {
                rotate.value += max;
            }

            break;
    }

    if (rotate.velocity && decay !== 1) {
        rotate.velocity *= decay;
    }
}

export class RotateUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: RotateParticle): void {
        const rotateOptions = particle.options.rotate;

        if (!rotateOptions) {
            return;
        }

        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: (getRangeValue(rotateOptions.value) * Math.PI) / 180,
        };

        particle.pathRotation = rotateOptions.path;

        let rotateDirection = rotateOptions.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(getRandom() * 2);

            rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }

        switch (rotateDirection) {
            case RotateDirection.counterClockwise:
            case "counterClockwise":
                particle.rotate.status = AnimationStatus.decreasing;
                break;
            case RotateDirection.clockwise:
                particle.rotate.status = AnimationStatus.increasing;
                break;
        }

        const rotateAnimation = rotateOptions.animation;

        if (rotateAnimation.enable) {
            particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
            particle.rotate.velocity =
                (getRangeValue(rotateAnimation.speed) / 360) * this.container.retina.reduceFactor;

            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= getRandom();
            }
        }

        particle.rotation = particle.rotate.value;
    }

    isEnabled(particle: RotateParticle): boolean {
        const rotate = particle.options.rotate;

        if (!rotate) {
            return false;
        }

        return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
    }

    loadOptions(
        options: RotateParticlesOptions,
        ...sources: (RecursivePartial<IRotateParticlesOptions> | undefined)[]
    ): void {
        if (!options.rotate) {
            options.rotate = new Rotate();
        }

        for (const source of sources) {
            options.rotate.load(source?.rotate);
        }
    }

    update(particle: RotateParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateAngle(particle, delta);

        particle.rotation = particle.rotate?.value ?? 0;
    }
}
