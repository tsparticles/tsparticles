import type { ISizeAnimation } from "../Options/Interfaces/Particles/Size/ISizeAnimation";
import type { Particle } from "../Core/Particle";

/**
 * The SizeUpdater class handles the size updates of the particles.
 */
export class SizeUpdater {
    /**
     * The update method uses the easing function from the size.animation options to calculate the new size of the particle.
     * @param particle The particle to update.
     */
    public static update(particle: Particle): void {
        const sizeOpt = particle.options.size;
        const sizeAnim = sizeOpt.animation as ISizeAnimation;
        const sizeEasing = sizeAnim.easing;

        // Use the easing function to calculate the new size
        const newSize = sizeEasing(particle.size.value);

        // Update the size of the particle
        particle.size.value = newSize;
    }
}
