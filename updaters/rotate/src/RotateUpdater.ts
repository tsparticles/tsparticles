import {
    AnimationStatus,
    type Container,
    type IDelta,
    type IParticleUpdater,
    type IParticleValueAnimation,
    type IParticlesOptions,
    type Particle,
    type ParticlesOptions,
    type RecursivePartial,
    RotateDirection,
    degToRad,
    getRandom,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRotate } from "./Options/Interfaces/IRotate.js";
import { Rotate } from "./Options/Classes/Rotate.js";

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

const minVelocity = 0,
    defaultDecay = 1,
    double = 2,
    doublePI = Math.PI * double,
    identity = 1,
    minValue = 0,
    doublePIDeg = 360;

/**
 * @param particle -
 * @param delta -
 */
function updateRotate(particle: RotateParticle, delta: IDelta): void {
    const rotate = particle.rotate,
        rotateOptions = particle.options.rotate;

    if (!rotate || !rotateOptions) {
        return;
    }

    const rotateAnimation = rotateOptions.animation,
        speed = (rotate.velocity ?? minVelocity) * delta.factor,
        max = doublePI,
        decay = rotate.decay ?? defaultDecay;

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

            if (rotate.value < minValue) {
                rotate.value += max;
            }

            break;
    }

    if (rotate.velocity && decay !== identity) {
        rotate.velocity *= decay;
    }
}

export class RotateUpdater implements IParticleUpdater {
    private readonly container;

    constructor(container: Container) {
        this.container = container;
    }

    init(particle: RotateParticle): void {
        const rotateOptions = particle.options.rotate;

        if (!rotateOptions) {
            return;
        }

        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: degToRad(getRangeValue(rotateOptions.value)),
        };

        particle.pathRotation = rotateOptions.path;

        let rotateDirection = rotateOptions.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(getRandom() * double),
                minIndex = 0;

            rotateDirection = index > minIndex ? RotateDirection.counterClockwise : RotateDirection.clockwise;
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
            particle.rotate.decay = identity - getRangeValue(rotateAnimation.decay);
            particle.rotate.velocity =
                (getRangeValue(rotateAnimation.speed) / doublePIDeg) * this.container.retina.reduceFactor;

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

        updateRotate(particle, delta);

        particle.rotation = particle.rotate?.value ?? minValue;
    }
}
