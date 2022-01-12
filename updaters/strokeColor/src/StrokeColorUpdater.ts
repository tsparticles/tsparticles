import type {
    Container,
    IColorAnimation,
    IDelta,
    IParticleUpdater,
    IParticleValueAnimation,
    Particle,
} from "tsparticles-engine";
import { AnimationStatus, colorToHsl, getHslAnimationFromHsl, itemFromArray, randomInRange } from "tsparticles-engine";

function updateColorValue(
    delta: IDelta,
    value: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean
): void {
    const colorValue = value;

    if (!colorValue || !colorValue.enable) {
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

function updateStrokeColor(particle: Particle, delta: IDelta): void {
    if (!particle.stroke?.color) {
        return;
    }

    const animationOptions = particle.stroke.color.animation;
    const h = particle.strokeColor?.h ?? particle.color?.h;

    if (h) {
        updateColorValue(delta, h, animationOptions.h, 360, false);
    }

    const s = particle.strokeColor?.s ?? particle.color?.s;

    if (s) {
        updateColorValue(delta, s, animationOptions.s, 100, true);
    }

    const l = particle.strokeColor?.l ?? particle.color?.l;

    if (l) {
        updateColorValue(delta, l, animationOptions.l, 100, true);
    }
}

export class StrokeColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        const container = this.container;

        /* strokeColor */
        particle.stroke =
            particle.options.stroke instanceof Array
                ? itemFromArray(particle.options.stroke, particle.id, particle.options.reduceDuplicates)
                : particle.options.stroke;

        particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;

        const strokeHslColor = colorToHsl(particle.stroke.color) ?? particle.getFillColor();

        if (strokeHslColor) {
            particle.strokeColor = getHslAnimationFromHsl(
                strokeHslColor,
                particle.stroke.color?.animation,
                container.retina.reduceFactor
            );
        }
    }

    isEnabled(particle: Particle): boolean {
        const color = particle.stroke?.color;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((particle.strokeColor?.h.value !== undefined && color.animation.h.enable) ||
                (particle.strokeColor?.s.value !== undefined && color.animation.s.enable) ||
                (particle.strokeColor?.l.value !== undefined && color.animation.l.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateStrokeColor(particle, delta);
    }
}
