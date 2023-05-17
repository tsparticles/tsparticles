import {
    AnimationStatus,
    type Container,
    type IColorAnimation,
    type IDelta,
    type IParticleUpdater,
    type IParticleValueAnimation,
    type Particle,
    getHslAnimationFromHsl,
    randomInRange,
    rangeColorToHsl,
} from "tsparticles-engine";

/**
 * @param delta -
 * @param colorValue -
 * @param valueAnimation -
 * @param max -
 * @param decrease -
 */
function updateColorValue(
    delta: IDelta,
    colorValue: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean
): void {
    if (!colorValue) {
        return;
    }

    if (!colorValue.time) {
        colorValue.time = 0;
    }

    if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
        colorValue.time += delta.value;
    }

    if (
        !valueAnimation.enable ||
        ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) ||
        ((colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0))
    ) {
        return;
    }

    const offset = randomInRange(valueAnimation.offset),
        velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6,
        decay = colorValue.decay ?? 1;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (colorValue.value > max) {
            if (!colorValue.loops) {
                colorValue.loops = 0;
            }

            colorValue.loops++;

            if (decrease) {
                colorValue.status = AnimationStatus.decreasing;
                colorValue.value -= colorValue.value % max;
            }
        }
    } else {
        colorValue.value -= velocity;

        if (colorValue.value < 0) {
            if (!colorValue.loops) {
                colorValue.loops = 0;
            }

            colorValue.loops++;

            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.velocity && decay !== 1) {
        colorValue.velocity *= decay;
    }

    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}

/**
 * @param particle -
 * @param delta -
 */
function updateColor(particle: Particle, delta: IDelta): void {
    const animationOptions = particle.options.color.animation;

    const h = particle.color?.h,
        s = particle.color?.s,
        l = particle.color?.l;

    if (h) {
        updateColorValue(delta, h, animationOptions.h, 360, false);
    }

    if (s) {
        updateColorValue(delta, s, animationOptions.s, 100, true);
    }

    if (l) {
        updateColorValue(delta, l, animationOptions.l, 100, true);
    }
}

export class ColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        /* color */
        const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);

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
