import {
    type Container,
    type Engine,
    type IParticlesOptions,
    type Particle,
    PixelMode,
    type RecursivePartial,
    getRangeValue,
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
 *
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
        factor = getRangeValue(splitOptions.factor.value),
        parentColor = parent.getFillColor();

    if (splitOptions.color) {
        options.color.load(splitOptions.color);
    } else if (splitOptions.colorOffset && parentColor) {
        options.color.load({
            value: {
                hsl: {
                    h: parentColor.h + getRangeValue(splitOptions.colorOffset.h ?? defaultOffset),
                    s: parentColor.s + getRangeValue(splitOptions.colorOffset.s ?? defaultOffset),
                    l: parentColor.l + getRangeValue(splitOptions.colorOffset.l ?? defaultOffset),
                },
            },
        });
    } else {
        options.color.load({
            value: {
                hsl: parent.getFillColor(),
            },
        });
    }

    options.move.load({
        center: {
            x: parent.position.x,
            y: parent.position.y,
            mode: PixelMode.precise,
            // radius: parent.size.value,
        },
    });

    if (isNumber(options.size.value)) {
        options.size.value /= factor;
    } else {
        options.size.value.min /= factor;
        options.size.value.max /= factor;
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

        setTimeout(() => {
            particle.unbreakable = false;
        }, unbreakableTime);

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

    if (
        splitOptions.count >= minSplitCount &&
        (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)
    ) {
        return;
    }

    const rate = getRangeValue(splitOptions.rate.value),
        particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);

    for (let i = 0; i < rate; i++) {
        addSplitParticle(engine, container, particle, particlesSplitOptions);
    }
}
