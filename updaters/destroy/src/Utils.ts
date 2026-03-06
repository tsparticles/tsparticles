import {
  AnimatableColor,
  type Container,
  type Engine,
  type IParticlesOptions,
  type Particle,
  PixelMode,
  type RecursivePartial,
  getRangeValue,
  identity,
  isNumber,
  itemFromSingleOrMultiple,
  loadParticlesOptions,
  randomInRangeValue,
  setRangeValue,
} from "@tsparticles/engine";
import type { DestroyParticle } from "./Types.js";

const defaultOffset = 0,
  minDestroySize = 0.5,
  defaultSplitCount = 0,
  increment = 1,
  unbreakableTime = 500,
  minSplitCount = 0;

/**
 * @param engine -
 * @param container -
 * @param parent -
 * @param splitParticlesOptions -
 * @returns the added particle if any
 */
function addSplitParticle(
  engine: Engine,
  container: Container,
  parent: DestroyParticle,
  splitParticlesOptions?: RecursivePartial<IParticlesOptions>,
): Particle | undefined {
  const destroyOptions = parent.options.destroy;

  if (!destroyOptions) {
    return;
  }

  const splitOptions = destroyOptions.split,
    options = loadParticlesOptions(engine, container, parent.options),
    fillOptions = itemFromSingleOrMultiple(options.fill),
    strokeOptions = itemFromSingleOrMultiple(options.stroke);

  if (fillOptions?.enable) {
    const fillColor = AnimatableColor.create(undefined, fillOptions.color),
      parentFillColor = parent.getFillColor();

    if (fillColor.value) {
      fillColor.load(splitOptions.fillColor);
    } else if (splitOptions.fillColorOffset && parentFillColor) {
      fillColor.load({
        value: {
          hsl: {
            h: parentFillColor.h + getRangeValue(splitOptions.fillColorOffset.h ?? defaultOffset),
            s: parentFillColor.s + getRangeValue(splitOptions.fillColorOffset.s ?? defaultOffset),
            l: parentFillColor.l + getRangeValue(splitOptions.fillColorOffset.l ?? defaultOffset),
          },
        },
      });
    } else {
      fillColor.load({
        value: {
          hsl: parent.getFillColor(),
        },
      });
    }
  }

  if (strokeOptions?.width) {
    const strokeColor = AnimatableColor.create(undefined, strokeOptions.color),
      parentStrokeColor = parent.getStrokeColor();

    if (strokeColor.value) {
      strokeColor.load(splitOptions.strokeColor);
    } else if (splitOptions.strokeColorOffset && parentStrokeColor) {
      strokeColor.load({
        value: {
          hsl: {
            h: parentStrokeColor.h + getRangeValue(splitOptions.strokeColorOffset.h ?? defaultOffset),
            s: parentStrokeColor.s + getRangeValue(splitOptions.strokeColorOffset.s ?? defaultOffset),
            l: parentStrokeColor.l + getRangeValue(splitOptions.strokeColorOffset.l ?? defaultOffset),
          },
        },
      });
    } else {
      strokeColor.load({
        value: {
          hsl: parent.getStrokeColor(),
        },
      });
    }
  }

  options.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: PixelMode.precise,
    },
  });

  const factor = identity / getRangeValue(splitOptions.factor.value);

  if (isNumber(options.size.value)) {
    options.size.value *= factor;
  } else {
    options.size.value.min *= factor;
    options.size.value.max *= factor;
  }

  options.load(splitParticlesOptions);

  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : defaultOffset,
    position = {
      x: parent.position.x + randomInRangeValue(offset),
      y: parent.position.y + randomInRangeValue(offset),
    };

  return container.particles.addParticle(position, options, parent.group, (particle: DestroyParticle) => {
    if (particle.size.value < minDestroySize) {
      return false;
    }

    particle.velocity.length = randomInRangeValue(setRangeValue(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? defaultSplitCount) + increment;
    particle.unbreakable = true;
    particle.unbreakableUntil = performance.now() + unbreakableTime;

    return true;
  });
}

/**
 *
 * @param engine -
 * @param container -
 * @param particle -
 */
export function split(engine: Engine, container: Container, particle: DestroyParticle): void {
  const destroyOptions = particle.options.destroy;

  if (!destroyOptions) {
    return;
  }

  const splitOptions = destroyOptions.split;

  if (splitOptions.count >= minSplitCount) {
    if (particle.splitCount === undefined || particle.splitCount > splitOptions.count) {
      return;
    }

    particle.splitCount++;
  }

  const rate = getRangeValue(splitOptions.rate.value),
    particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);

  for (let i = 0; i < rate; i++) {
    addSplitParticle(engine, container, particle, particlesSplitOptions);
  }
}
