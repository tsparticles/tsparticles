import {
    AnimationStatus,
    GradientType,
    type ICoordinates,
    type IDelta,
    type IParticleColorStyle,
    type IParticleUpdater,
    type RecursivePartial,
    RotateDirection,
    StartValueType,
    executeOnSingleOrMultiple,
    getHslAnimationFromHsl,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getStyleFromHsl,
    halfRandom,
    itemFromSingleOrMultiple,
    millisecondsToSeconds,
    percentDenominator,
    randomInRange,
    rangeColorToHsl,
} from "@tsparticles/engine";
import type { GradientParticle, GradientParticlesOptions, IGradientParticlesOptions } from "./Types.js";
import { AnimatableGradient } from "./Options/Classes/AnimatableGradient.js";
import { updateGradient } from "./Utils.js";

const double = 2,
    doublePI = Math.PI * double;

export class GradientUpdater implements IParticleUpdater {
    getColorStyles(
        particle: GradientParticle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number,
    ): IParticleColorStyle {
        const gradient = particle.gradient;

        if (!gradient) {
            return {};
        }

        const gradientAngle = gradient.angle.value,
            origin: ICoordinates = { x: 0, y: 0 },
            minRadius = 0,
            fillGradient =
                gradient.type === GradientType.radial
                    ? context.createRadialGradient(origin.x, origin.y, minRadius, origin.x, origin.y, radius)
                    : context.createLinearGradient(
                          Math.cos(gradientAngle) * -radius,
                          Math.sin(gradientAngle) * -radius,
                          Math.cos(gradientAngle) * radius,
                          Math.sin(gradientAngle) * radius,
                      );

        for (const { stop, value, opacity: cOpacity } of gradient.colors) {
            fillGradient.addColorStop(
                stop,
                getStyleFromHsl(
                    {
                        h: value.h.value,
                        s: value.s.value,
                        l: value.l.value,
                    },
                    cOpacity?.value ?? opacity,
                ),
            );
        }

        return { fill: fillGradient };
    }

    init(particle: GradientParticle): void {
        const gradient = itemFromSingleOrMultiple(particle.options.gradient);

        if (!gradient) {
            return;
        }

        const { angle } = gradient,
            speedFactor = 360,
            delayOffset = 1;

        particle.gradient = {
            angle: {
                value: getRangeValue(angle.value),
                enable: angle.animation.enable,
                velocity: (getRangeValue(angle.animation.speed) / speedFactor) * particle.container.retina.reduceFactor,
                decay: delayOffset - getRangeValue(angle.animation.decay),
                delayTime: getRangeValue(angle.animation.delay) * millisecondsToSeconds,
                max: doublePI,
                min: 0,
                time: 0,
            },
            type: gradient.type,
            colors: [],
        };

        let rotateDirection = gradient.angle.direction;

        if (rotateDirection === RotateDirection.random) {
            rotateDirection = getRandom() > halfRandom ? RotateDirection.counterClockwise : RotateDirection.clockwise;
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
                    particle.container.retina.reduceFactor,
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
                                  (getRangeValue(grColor.opacity.animation.speed) / percentDenominator) *
                                  particle.container.retina.reduceFactor,
                              decay: delayOffset - getRangeValue(grColor.opacity.animation.decay),
                              delayTime: getRangeValue(grColor.opacity.animation.delay) * millisecondsToSeconds,
                              time: 0,
                          }
                        : undefined,
                };

            const { opacity: addOpacity } = addColor;

            if (grColor.opacity && addOpacity) {
                const opacityRange = grColor.opacity.value;

                addOpacity.min = getRangeMin(opacityRange);
                addOpacity.max = getRangeMax(opacityRange);

                const opacityAnimation = grColor.opacity.animation;

                switch (opacityAnimation.startValue) {
                    case StartValueType.min:
                        addOpacity.value = addOpacity.min;
                        addOpacity.status = AnimationStatus.increasing;

                        break;

                    case StartValueType.max:
                        addOpacity.value = addOpacity.max;
                        addOpacity.status = AnimationStatus.decreasing;

                        break;

                    case StartValueType.random:
                    default:
                        addOpacity.value = randomInRange(addOpacity);
                        addOpacity.status =
                            getRandom() >= halfRandom ? AnimationStatus.increasing : AnimationStatus.decreasing;

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
            (!!particle.gradient?.angle.enable ||
                (particle.gradient?.colors.some(c => c.value.h.enable || c.value.s.enable || c.value.l.enable) ??
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

            options.gradient = executeOnSingleOrMultiple(gradientToLoad, gradient => {
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
