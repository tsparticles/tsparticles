import type { IDelta, Particle } from "tsparticles-engine";
import { clamp } from "tsparticles-engine";

function updateAbsorb(p1: Particle, r1: number, p2: Particle, r2: number, delta: IDelta, pixelRatio: number): void {
    const factor = clamp((p1.options.collisions.absorb.speed * delta.factor) / 10, 0, r2);

    p1.size.value += factor / 2;
    p2.size.value -= factor;

    if (r2 <= pixelRatio) {
        p2.size.value = 0;
        p2.destroy();
    }
}

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
