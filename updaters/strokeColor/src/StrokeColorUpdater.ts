import {
    AnimationStatus,
    getHslAnimationFromHsl,
    getRangeValue,
    itemFromSingleOrMultiple,
    randomInRange,
    rangeColorToHsl,
} from "tsparticles-engine";
import type {
    Container,
    HslAnimation,
    IColorAnimation,
    IDelta,
    IParticleUpdater,
    IParticleValueAnimation,
    Particle,
} from "tsparticles-engine";

function updateColorValue(
    delta: IDelta,
    value: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean
): void {
    const colorValue = value;

    if (
        !colorValue ||
        !colorValue.enable ||
        (colorValue.loops !== undefined &&
            colorValue.maxLoops !== undefined &&
            colorValue.maxLoops > 0 &&
            colorValue.loops >= colorValue.maxLoops)
    ) {
        return;
    }

    const offset = randomInRange(valueAnimation.offset),
        velocity = (value.velocity ?? 0) * delta.factor + offset * 3.6,
        decay = value.decay ?? 1;

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

function updateStrokeColor(particle: StrokeParticle, delta: IDelta): void {
    if (!particle.strokeColor || !particle.strokeAnimation) {
        return;
    }

    const h = particle.strokeColor.h;

    if (h) {
        updateColorValue(delta, h, particle.strokeAnimation.h, 360, false);
    }

    const s = particle.strokeColor.s;

    if (s) {
        updateColorValue(delta, s, particle.strokeAnimation.s, 100, true);
    }

    const l = particle.strokeColor.l;

    if (l) {
        updateColorValue(delta, l, particle.strokeAnimation.l, 100, true);
    }
}

type StrokeParticle = Particle & {
    strokeAnimation?: HslAnimation;
};

export class StrokeColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: StrokeParticle): void {
        const container = this.container;

        /* strokeColor */
        const stroke = itemFromSingleOrMultiple(
            particle.options.stroke,
            particle.id,
            particle.options.reduceDuplicates
        );

        particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
        particle.strokeOpacity = getRangeValue(stroke.opacity ?? 1);
        particle.strokeAnimation = stroke.color?.animation;

        const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();

        if (strokeHslColor) {
            particle.strokeColor = getHslAnimationFromHsl(
                strokeHslColor,
                particle.strokeAnimation,
                container.retina.reduceFactor
            );
        }
    }

    isEnabled(particle: StrokeParticle): boolean {
        const color = particle.strokeAnimation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((particle.strokeColor?.h.value !== undefined && particle.strokeColor.h.enable) ||
                (particle.strokeColor?.s.value !== undefined && particle.strokeColor.s.enable) ||
                (particle.strokeColor?.l.value !== undefined && particle.strokeColor.l.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateStrokeColor(particle, delta);
    }
}
