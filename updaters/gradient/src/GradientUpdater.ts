import type {
    IDelta,
    IParticleUpdater,
    IParticleValueAnimation,
    Particle,
    IParticleNumericValueAnimation,
} from "tsparticles-engine";
import {
    AnimationStatus,
    RotateDirection,
    StartValueType,
    colorToHsl,
    getHslAnimationFromHsl,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    itemFromArray,
    randomInRange,
} from "tsparticles-engine";

function updateColorOpacity(delta: IDelta, value: IParticleNumericValueAnimation) {
    if (!value.enable) {
        return;
    }

    switch (value.status) {
        case AnimationStatus.increasing:
            if (value.value >= value.max) {
                value.status = AnimationStatus.decreasing;
            } else {
                value.value += (value.velocity ?? 0) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (value.value <= value.min) {
                value.status = AnimationStatus.increasing;
            } else {
                value.value -= (value.velocity ?? 0) * delta.factor;
            }

            break;
    }
}

function updateColorValue(delta: IDelta, value: IParticleValueAnimation<number>, max: number, decrease: boolean): void {
    const colorValue = value;

    if (!colorValue || !colorValue.enable) {
        return;
    }

    //const offset = NumberUtils.randomInRange(valueAnimation.offset);
    const velocity = (value.velocity ?? 0) * delta.factor; // + offset * 3.6;

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

function updateAngle(delta: IDelta, angle: IParticleValueAnimation<number>): void {
    const speed = (angle.velocity ?? 0) * delta.factor;
    const max = 2 * Math.PI;

    if (!angle.enable) {
        return;
    }

    switch (angle.status) {
        case AnimationStatus.increasing:
            angle.value += speed;

            if (angle.value > max) {
                angle.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            angle.value -= speed;

            if (angle.value < 0) {
                angle.value += max;
            }

            break;
    }
}

function updateGradient(particle: Particle, delta: IDelta): void {
    const gradient = particle.gradient;

    if (!gradient) {
        return;
    }

    updateAngle(delta, gradient.angle);

    for (const color of gradient.colors) {
        if (particle.color?.h !== undefined) {
            updateColorValue(delta, color.value.h, 360, false);
        }

        if (particle.color?.s !== undefined) {
            updateColorValue(delta, color.value.s, 100, true);
        }

        if (particle.color?.l !== undefined) {
            updateColorValue(delta, color.value.l, 100, true);
        }

        if (color.opacity) {
            updateColorOpacity(delta, color.opacity);
        }
    }
}

export class GradientUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        const gradient =
            particle.options.gradient instanceof Array
                ? itemFromArray(particle.options.gradient)
                : particle.options.gradient;

        if (gradient) {
            particle.gradient = {
                angle: {
                    value: gradient.angle.value,
                    enable: gradient.angle.animation.enable,
                    velocity: (gradient.angle.animation.speed / 360) * particle.container.retina.reduceFactor,
                },
                type: gradient.type,
                colors: [],
            };

            let rotateDirection = gradient.angle.direction;

            if (rotateDirection === RotateDirection.random) {
                const index = Math.floor(Math.random() * 2);

                rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
            }

            switch (rotateDirection) {
                case RotateDirection.counterClockwise:
                case "counterClockwise":
                    particle.gradient.angle.status = AnimationStatus.decreasing;
                    break;
                case RotateDirection.clockwise:
                    particle.gradient.angle.status = AnimationStatus.increasing;
                    break;
            }

            const reduceDuplicates = particle.options.reduceDuplicates;

            for (const grColor of gradient.colors) {
                const grHslColor = colorToHsl(grColor.value, particle.id, reduceDuplicates);

                if (grHslColor) {
                    const grHslAnimation = getHslAnimationFromHsl(
                        grHslColor,
                        grColor.value.animation,
                        particle.container.retina.reduceFactor
                    );

                    const addColor = {
                        stop: grColor.stop,
                        value: grHslAnimation,
                        opacity: grColor.opacity
                            ? {
                                  enable: grColor.opacity.animation.enable,
                                  max: getRangeMax(grColor.opacity.value),
                                  min: getRangeMin(grColor.opacity.value),
                                  status: AnimationStatus.increasing,
                                  value: getRangeValue(grColor.opacity.value),
                                  velocity:
                                      (grColor.opacity.animation.speed / 100) * particle.container.retina.reduceFactor,
                              }
                            : undefined,
                    };

                    if (grColor.opacity && addColor.opacity) {
                        const opacityRange = grColor.opacity.value;

                        addColor.opacity.min = getRangeMin(opacityRange);
                        addColor.opacity.max = getRangeMax(opacityRange);

                        const opacityAnimation = grColor.opacity.animation;

                        switch (opacityAnimation.startValue) {
                            case StartValueType.min:
                                addColor.opacity.value = addColor.opacity.min;
                                addColor.opacity.status = AnimationStatus.increasing;

                                break;

                            case StartValueType.random:
                                addColor.opacity.value = randomInRange(addColor.opacity);
                                addColor.opacity.status =
                                    Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                                break;

                            case StartValueType.max:
                            default:
                                addColor.opacity.value = addColor.opacity.max;
                                addColor.opacity.status = AnimationStatus.decreasing;

                                break;
                        }
                    }

                    particle.gradient.colors.push(addColor);
                }
            }
        }
    }

    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            (particle.gradient?.angle.enable ||
                (particle.gradient?.colors.some((c) => c.value.h.enable || c.value.s.enable || c.value.l.enable) ??
                    false))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        updateGradient(particle, delta);
    }
}
