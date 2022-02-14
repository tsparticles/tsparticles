import type { Particle } from "tsparticles-engine";
import { clamp } from "tsparticles-engine";

export function absorb(p1: Particle, p2: Particle, fps: number, pixelRatio: number): void {
    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        if (p1.getRadius() >= p2.getRadius()) {
            const factor = clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;

            p1.size.value += factor;
            p2.size.value -= factor;

            if (p2.getRadius() <= pixelRatio) {
                p2.size.value = 0;
                p2.destroy();
            }
        } else {
            const factor = clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;

            p1.size.value -= factor;
            p2.size.value += factor;

            if (p1.getRadius() <= pixelRatio) {
                p1.size.value = 0;
                p1.destroy();
            }
        }
    }
}
