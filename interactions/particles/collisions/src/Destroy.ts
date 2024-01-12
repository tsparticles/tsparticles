import type { Particle } from "@tsparticles/engine";

/**
 * @param p1 -
 * @param p2 -
 */
export async function destroy(p1: Particle, p2: Particle): Promise<void> {
    if (!p1.unbreakable && !p2.unbreakable) {
        const { bounce } = await import("./Bounce.js");

        await bounce(p1, p2);
    }

    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;

        deleteP.destroy();
    }
}
