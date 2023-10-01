import type { Particle } from "../Core/Particle";
import type { IOpacityAnimation } from "../Options/Interfaces/Particles/Opacity/IOpacityAnimation";

/**
 * The OpacityUpdater class handles the opacity updates of the particles.
 */
export class OpacityUpdater {
    /**
     * The update method uses the easing function from the opacity.animation options to calculate the new opacity of the particle.
     * @param particle The particle to update.
     */
    public static update(particle: Particle): void {
        const opacityOpt = particle.options.opacity;
        const opacityAnim = opacityOpt.animation as IOpacityAnimation;
        const opacityEasing = opacityAnim.easing;

        // Use the easing function to calculate the new opacity
        const newOpacity = opacityEasing(particle.opacity.value);

        // Update the opacity of the particle
        particle.opacity.value = newOpacity;
    }
}
