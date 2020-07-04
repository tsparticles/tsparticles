import type { IInteractivity } from "./Interactivity/IInteractivity";
import type { IParticles } from "./Particles/IParticles";
import type { IBackgroundMask } from "./BackgroundMask/IBackgroundMask";
import type { IBackground } from "./Background/IBackground";
import type { IInfection } from "./Infection/IInfection";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 */
export interface IOptions {
    /**
     * Background options, these background options will be used to the canvas element, they are all CSS properties
     */
    background: IBackground;

    /**
     * Background Mask options, what's behind the canvas will become hidden and particles will uncover it
     */
    backgroundMask: IBackgroundMask;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    detectRetina: boolean;

    /**
     * The Frame Per Second limit applied to all particles animations.
     * @deprecated use the new fpsLimit instead
     */
    fps_limit: number;

    /**
     * The FPS (Frame Per Second) limit applied to all particles animations.
     */
    fpsLimit: number;

    /**
     * The infection options
     */
    infection: IInfection;

    /**
     * The particles interaction options
     */
    interactivity: IInteractivity;

    /**
     * The particles options
     */
    particles: IParticles;

    /**
     * Enables or disabled the animation on window blur
     */
    pauseOnBlur: boolean;

    /**
     * This property will be used to add specified presets to the options
     */
    preset?: string | string[];

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     * @deprecated use the new detectRetina instead
     */
    retina_detect: boolean;
}
