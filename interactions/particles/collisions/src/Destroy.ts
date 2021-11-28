import { bounce } from "./Bounce";
import type { Particle } from "tsparticles-engine";

export function destroy(p1: Particle, p2: Particle): void {
    if (!p1.unbreakable && !p2.unbreakable) {
        bounce(p1, p2);
    }

    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        if (p1.getRadius() >= p2.getRadius()) {
            p2.destroy();
        } else {
            p1.destroy();
        }
    }
}
