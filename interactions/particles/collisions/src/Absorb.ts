import { type IDelta, type Particle, clamp } from "@tsparticles/engine";

const half = 0.5,
    absorbFactor = 10,
    minAbsorbFactor = 0;

/**
 * @param p1 -
 * @param r1 -
 * @param p2 -
 * @param r2 -
 * @param delta -
 * @param pixelRatio -
 */
function updateAbsorb(p1: Particle, r1: number, p2: Particle, r2: number, delta: IDelta, pixelRatio: number): void {
    const factor = clamp((p1.options.collisions.absorb.speed * delta.factor) / absorbFactor, minAbsorbFactor, r2);

    p1.size.value += factor * half;
    p2.size.value -= factor;

    if (r2 <= pixelRatio) {
        p2.size.value = 0;
        p2.destroy();
    }
}

/**
 * @param p1 -
 * @param p2 -
 * @param delta -
 * @param pixelRatio -
 */
export function absorb(p1: Particle, p2: Particle, delta: IDelta, pixelRatio: number): void {
    const r1 = p1.getRadius(),
        r2 = p2.getRadius();

    if (r1 === undefined && r2 !== undefined) {
        p1.destroy();
    } else if (r1 !== undefined && r2 === undefined) {
        p2.destroy();
    } else if (r1 !== undefined && r2 !== undefined) {
        if (r1 >= r2) {
            updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
        } else {
            updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
        }
    }
}
