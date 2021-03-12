import type { IInteractivity } from "./Interactivity/IInteractivity";
import type { IParticles } from "./Particles/IParticles";
import type { IBackgroundMask } from "./BackgroundMask/IBackgroundMask";
import type { IBackground } from "./Background/IBackground";
import type { SingleOrMultiple } from "../../Types";
import type { ITheme } from "./Theme/ITheme";
import type { IFullScreen } from "./FullScreen/IFullScreen";
import type { IMotion } from "./Motion/IMotion";
import type { IManualParticle } from "./IManualParticle";
import { IResponsive } from "./IResponsive";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 * [[include:Options.md]]
 * @category Options
 */
export interface IOptions {
    /**
     * Sets the full screen mode for particles canvas
     * @deprecated use the new fullScreen instead
     */
    backgroundMode: IFullScreen;

    /**
     * The Frame Per Second limit applied to all particles animations.
     * @deprecated use the new fpsLimit instead
     */
    fps_limit: number;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     * @deprecated use the new detectRetina instead
     */
    retina_detect: boolean;

    /**
     * Sets if the animations should start automatically or manually
     */
    autoPlay: boolean;

    /**
     * Background options, these background options will be used to the canvas element, they are all CSS properties
     */
    background: IBackground;

    /**
     * Background Mask options, what's behind the canvas will become hidden and particles will uncover it
     */
    backgroundMask: IBackgroundMask;

    /**
     * Sets the full screen mode for particles canvas
     */
    fullScreen: IFullScreen;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    detectRetina: boolean;

    /**
     * The FPS (Frame Per Second) limit applied to all particles animations.
     */
    fpsLimit: number;

    /**
     * The particles interaction options
     */
    interactivity: IInteractivity;

    /**
     * Particles inserted at load time with a specific position
     */
    manualParticles: IManualParticle[];

    /**
     * Handles user's preferences about motion
     */
    motion: IMotion;

    /**
     * The particles options
     */
    particles: IParticles;

    /**
     * Enables or disabled the animation on window blur
     */
    pauseOnBlur: boolean;

    /**
     * Enable or disabled the animation if the element is outside the viewport
     */
    pauseOnOutsideViewport: boolean;

    /**
     * This property will be used to add specified presets to the options
     */
    preset?: SingleOrMultiple<string>;

    /**
     * This sets custom options based on canvas size
     */
    responsive: IResponsive[];

    /**
     * User-defined themes that can be retrieved by the particles [[Container]]
     */
    themes: ITheme[];

    /**
     * More custom options for external plugins or customizations
     */
    [name: string]: unknown;
}
