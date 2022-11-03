import type { Particle } from "tsparticles-engine";
import { bounce } from "./Bounce";

export function destroy(p1: Particle, p2: Particle): void {
    if (!p1.unbreakable && !p2.unbreakable) {
        bounce(p1, p2);
    }

    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        const deleteP = p1.getRadius() >= p2.getRadius() ? p1 : p2;

        deleteP.destroy();
    }
}
