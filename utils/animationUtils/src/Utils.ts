import {
  AnimationMode,
  AnimationStatus,
  DestroyType,
  type IDelta,
  type IParticleNumericValueAnimation,
  type Particle,
  type RangedAnimationValueWithRandom,
  StartValueType,
  clamp,
  getRandom,
  getRangeMax,
  getRangeMin,
  getRangeValue,
  half,
  millisecondsToSeconds,
  randomInRangeValue,
} from "@tsparticles/engine";

/**
 * @param particle - The particle to process
 * @param destroyType - The destroyType
 * @param value - The value
 * @param minValue - The minValue
 * @param maxValue - The maxValue
 */
function checkDestroy(
  particle: Particle,
  destroyType: DestroyType | keyof typeof DestroyType,
  value: number,
  minValue: number,
  maxValue: number,
): void {
  switch (destroyType) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }

      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }

      break;
    default:
      break;
  }
}

/**
 * @param options - The options to handle
 * @param pxRatio - The pxRatio
 * @returns the animation init object
 */
export function initParticleNumericAnimationValue(
  options: RangedAnimationValueWithRandom,
  pxRatio: number,
): IParticleNumericValueAnimation {
  const valueRange = options.value,
    animationOptions = options.animation,
    res: IParticleNumericValueAnimation = {
      delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
      enable: animationOptions.enable,
      value: getRangeValue(options.value) * pxRatio,
      max: getRangeMax(valueRange) * pxRatio,
      min: getRangeMin(valueRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(animationOptions.count),
      time: 0,
    },
    decayOffset = 1;

  if (animationOptions.enable) {
    res.decay = decayOffset - getRangeValue(animationOptions.decay);

    switch (animationOptions.mode) {
      case AnimationMode.increase:
        res.status = AnimationStatus.increasing;

        break;
      case AnimationMode.decrease:
        res.status = AnimationStatus.decreasing;

        break;

      case AnimationMode.random:
        res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;

        break;
      default:
        break;
    }

    const autoStatus = animationOptions.mode === AnimationMode.auto;

    switch (animationOptions.startValue) {
      case StartValueType.min:
        res.value = res.min;

        if (autoStatus) {
          res.status = AnimationStatus.increasing;
        }

        break;

      case StartValueType.max:
        res.value = res.max;

        if (autoStatus) {
          res.status = AnimationStatus.decreasing;
        }

        break;

      case StartValueType.random:
      default:
        res.value = randomInRangeValue(res);

        if (autoStatus) {
          res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        }

        break;
    }
  }

  res.initialValue = res.value;

  return res;
}

/**
 * Updates a numeric particle animation state.
 * @param particle - Particle owning the animated value.
 * @param data - Numeric animation state.
 * @param changeDirection - Whether the animation should ping-pong.
 * @param destroyType - Destroy behavior applied at bounds.
 * @param delta - Frame delta data.
 */
export function updateAnimation(
  particle: Particle,
  data: IParticleNumericValueAnimation,
  changeDirection: boolean,
  destroyType: DestroyType | keyof typeof DestroyType,
  delta: IDelta,
): void {
  const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minDecay = 1;

  if (
    particle.destroyed ||
    !data.enable ||
    ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))
  ) {
    return;
  }

  const velocity = (data.velocity ?? minVelocity) * delta.factor,
    minValue = data.min,
    maxValue = data.max,
    decay = data.decay ?? minDecay;

  data.time ??= 0;

  const delayTime = data.delayTime ?? minDelay;

  if (delayTime > minDelay && data.time < delayTime) {
    data.time += delta.value;

    if (data.time < delayTime) {
      return;
    }
  }

  switch (data.status) {
    case AnimationStatus.increasing:
      data.value += velocity;
      break;
    case AnimationStatus.decreasing:
      data.value -= velocity;
      break;
    default:
      break;
  }

  if (data.velocity && decay !== identity) {
    data.velocity *= decay;
  }

  switch (data.status) {
    case AnimationStatus.increasing:
      if (data.value >= maxValue) {
        if (changeDirection) {
          data.status = AnimationStatus.decreasing;
        } else {
          data.value -= maxValue;
        }

        data.loops ??= minLoops;
        data.loops++;
      }
      break;
    case AnimationStatus.decreasing:
      if (data.value <= minValue) {
        if (changeDirection) {
          data.status = AnimationStatus.increasing;
        } else {
          data.value += maxValue;
        }

        data.loops ??= minLoops;
        data.loops++;
      }
      break;
    default:
      break;
  }

  checkDestroy(particle, destroyType, data.value, minValue, maxValue);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
