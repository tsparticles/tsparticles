import {
    type IDelta,
    type IDimension,
    getRangeValue,
    millisecondsToSeconds,
    randomInRange,
    setRangeValue,
} from "@tsparticles/engine";
import type { LifeParticle } from "./Types.js";

const noTime = 0,
    infiniteValue = -1,
    noLife = 0,
    minCanvasSize = 0;

/**
 *
 * @param particle
 * @param delta
 * @param canvasSize
 */
export function updateLife(particle: LifeParticle, delta: IDelta, canvasSize: IDimension): void {
    if (!particle.life) {
        return;
    }

    const life = particle.life;

    let justSpawned = false;

    if (particle.spawning) {
        life.delayTime += delta.value;

        if (life.delayTime >= particle.life.delay) {
            justSpawned = true;
            particle.spawning = false;
            life.delayTime = noTime;
            life.time = noTime;
        } else {
            return;
        }
    }

    if (life.duration === infiniteValue) {
        return;
    }

    if (justSpawned) {
        life.time = noTime;
    } else {
        life.time += delta.value;
    }

    if (life.time < life.duration) {
        return;
    }

    life.time = noTime;

    if (particle.life.count > noLife) {
        particle.life.count--;
    }

    if (particle.life.count === noLife) {
        particle.destroy();

        return;
    }

    const widthRange = setRangeValue(minCanvasSize, canvasSize.width),
        heightRange = setRangeValue(minCanvasSize, canvasSize.width);

    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = noTime;
    life.time = noTime;
    particle.reset();

    const lifeOptions = particle.options.life;

    if (lifeOptions) {
        life.delay = getRangeValue(lifeOptions.delay.value) * millisecondsToSeconds;
        life.duration = getRangeValue(lifeOptions.duration.value) * millisecondsToSeconds;
    }
}
