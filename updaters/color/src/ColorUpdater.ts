import type {
    Container,
    IColorAnimation,
    IDelta,
    IParticleUpdater,
    IParticleValueAnimation,
    Particle,
} from "tsparticles-engine";
import { AnimationStatus, colorToHsl, getHslAnimationFromHsl, randomInRange } from "tsparticles-engine";

function updateColorValue(
    delta: IDelta,
    value: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean
): void {
    const colorValue = value;

    if (!colorValue || !valueAnimation.enable) {
        return;
    }

    const offset = randomInRange(valueAnimation.offset);
    const velocity = (value.velocity ?? 0) * delta.factor + offset * 3.6;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (decrease && colorValue.value > max) {
            colorValue.status = AnimationStatus.decreasing;
            colorValue.value -= colorValue.value % max;
        }
    } else {
        colorValue.value -= velocity;

        if (colorValue.value < 0) {
            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}

function updateColor(particle: Particle, delta: IDelta): void {
    const animationOptions = particle.options.color.animation;

    if (particle.color?.h !== undefined) {
        updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
    }

    if (particle.color?.s !== undefined) {
        updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
    }

    if (particle.color?.l !== undefined) {
        updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
    }
}

export class ColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        /* color */
        const hslColor = colorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);

        if (hslColor) {
            particle.color = getHslAnimationFromHsl(
                hslColor,
                particle.options.color.animation,
                this.container.retina.reduceFactor
            );
        }
    }

    isEnabled(particle: Particle): boolean {
        const animationOptions = particle.options.color.animation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            ((particle.color?.h.value !== undefined && animationOptions.h.enable) ||
                (particle.color?.s.value !== undefined && animationOptions.s.enable) ||
                (particle.color?.l.value !== undefined && animationOptions.l.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        updateColor(particle, delta);
    }
}
