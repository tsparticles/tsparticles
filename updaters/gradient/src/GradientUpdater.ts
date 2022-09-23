import {
    AnimationStatus,
    GradientType,
    RotateDirection,
    StartValueType,
    executeOnSingleOrMultiple,
    getHslAnimationFromHsl,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getStyleFromHsl,
    itemFromSingleOrMultiple,
    randomInRange,
    rangeColorToHsl,
} from "tsparticles-engine";
import type {
    IDelta,
    IParticleColorStyle,
    IParticleHslAnimation,
    IParticleNumericValueAnimation,
    IParticleUpdater,
    IParticleValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import { AnimatableGradient } from "./Options/Classes/AnimatableGradient";
import type { IAnimatableGradient } from "./Options/Interfaces/IAnimatableGradient";

interface IParticleGradientColorAnimation {
    opacity?: IParticleNumericValueAnimation;
    stop: number;
    value: IParticleHslAnimation;
}

interface IParticleGradientAnimation {
    angle: IParticleValueAnimation<number>;
    colors: IParticleGradientColorAnimation[];
    type: GradientType;
}

type GradientParticle = Particle & {
    /**
     * Gets the particle gradient options
     */
    gradient?: IParticleGradientAnimation;
    options: GradientParticlesOptions;
};

type IGradientParticlesOptions = IParticlesOptions & {
    gradient?: SingleOrMultiple<IAnimatableGradient>;
};

type GradientParticlesOptions = ParticlesOptions & {
    gradient?: SingleOrMultiple<AnimatableGradient>;
};

function updateColorOpacity(delta: IDelta, value: IParticleNumericValueAnimation): void {
    if (!value.enable) {
        return;
    }

    const decay = value.decay ?? 1;

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

    if (value.velocity && decay !== 1) {
        value.velocity *= decay;
    }
}

function updateColorValue(delta: IDelta, value: IParticleValueAnimation<number>, max: number, decrease: boolean): void {
    const colorValue = value;

    if (!colorValue || !colorValue.enable) {
        return;
    }

    //const offset = NumberUtils.randomInRange(valueAnimation.offset);
    const velocity = (value.velocity ?? 0) * delta.factor,
        decay = value.decay ?? 1; // + offset * 3.6;

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

    if (value.velocity && decay !== 1) {
        value.velocity *= decay;
    }
}

function updateAngle(delta: IDelta, angle: IParticleValueAnimation<number>): void {
    const speed = (angle.velocity ?? 0) * delta.factor,
        max = 2 * Math.PI,
        decay = angle.decay ?? 1;

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

    if (angle.velocity && decay !== 1) {
        angle.velocity *= decay;
    }
}

function updateGradient(particle: GradientParticle, delta: IDelta): void {
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
    getColorStyles(
        particle: GradientParticle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number
    ): IParticleColorStyle {
        const gradient = particle.gradient;

        if (!gradient) {
            return {};
        }

        const gradientAngle = gradient.angle.value,
            fillGradient =
                gradient.type === GradientType.radial
                    ? context.createRadialGradient(0, 0, 0, 0, 0, radius)
                    : context.createLinearGradient(
                          Math.cos(gradientAngle) * -radius,
                          Math.sin(gradientAngle) * -radius,
                          Math.cos(gradientAngle) * radius,
                          Math.sin(gradientAngle) * radius
                      );

        for (const color of gradient.colors) {
            fillGradient.addColorStop(
                color.stop,
                getStyleFromHsl(
                    {
                        h: color.value.h.value,
                        s: color.value.s.value,
                        l: color.value.l.value,
                    },
                    color.opacity?.value ?? opacity
                )
            );
        }

        return { fill: fillGradient };
    }

    init(particle: GradientParticle): void {
        const gradient = itemFromSingleOrMultiple(particle.options.gradient);

        if (!gradient) {
            return;
        }

        particle.gradient = {
            angle: {
                value: gradient.angle.value,
                enable: gradient.angle.animation.enable,
                velocity:
                    (getRangeValue(gradient.angle.animation.speed) / 360) * particle.container.retina.reduceFactor,
                decay: 1 - getRangeValue(gradient.angle.animation.decay),
            },
            type: gradient.type,
            colors: [],
        };

        let rotateDirection = gradient.angle.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(getRandom() * 2);

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
            const grHslColor = rangeColorToHsl(grColor.value, particle.id, reduceDuplicates);

            if (!grHslColor) {
                continue;
            }

            const grHslAnimation = getHslAnimationFromHsl(
                    grHslColor,
                    grColor.value.animation,
                    particle.container.retina.reduceFactor
                ),
                addColor = {
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
                                  (getRangeValue(grColor.opacity.animation.speed) / 100) *
                                  particle.container.retina.reduceFactor,
                              decay: 1 - getRangeValue(grColor.opacity.animation.decay),
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
                            getRandom() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

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

    isEnabled(particle: GradientParticle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            (particle.gradient?.angle.enable ||
                (particle.gradient?.colors.some((c) => c.value.h.enable || c.value.s.enable || c.value.l.enable) ??
                    false))
        );
    }

    loadOptions(
        options: GradientParticlesOptions,
        ...sources: (RecursivePartial<IGradientParticlesOptions> | undefined)[]
    ): void {
        for (const source of sources) {
            if (!source?.gradient) {
                continue;
            }

            const gradientToLoad = source.gradient;

            if (!gradientToLoad) {
                continue;
            }

            options.gradient = executeOnSingleOrMultiple(gradientToLoad, (gradient) => {
                const tmp = new AnimatableGradient();

                tmp.load(gradient);

                return tmp;
            });
        }
    }

    update(particle: GradientParticle, delta: IDelta): void {
        updateGradient(particle, delta);
    }
}
