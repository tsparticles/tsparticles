// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Container } from "../../Core/Container.js";
import type { IBackground } from "./Background/IBackground.js";
import type { IFullScreen } from "./FullScreen/IFullScreen.js";
import type { IInteractivity } from "./Interactivity/IInteractivity.js";
import type { IManualParticle } from "./IManualParticle.js";
import type { IParticlesOptions } from "./Particles/IParticlesOptions.js";
import type { ITheme } from "./Theme/ITheme.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 * [[include:Options.md]]
 */
export interface IOptions {
    /**
     * More custom options for external plugins or customizations
     */
    [name: string]: unknown;

    /**
     * Sets if the animations should start automatically or manually
     */
    autoPlay: boolean;

    /**
     * Background options, these background options will be used to the canvas element, they are all CSS properties
     */
    background: IBackground;

    /**
     * Clears the canvas on every frame if enabled
     */
    clear: boolean;

    /**
     * The initial delay before starting the animation
     */
    delay: RangeValue;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    detectRetina: boolean;

    /**
     * The Particles effect duration in seconds, then the container will be destroyed
     */
    duration: RangeValue;

    /**
     * The FPS (Frame Per Second) limit applied to all particles animations.
     */
    fpsLimit: number;

    /**
     * Sets the animated background mode for particles canvas bringing it to the back
     */
    fullScreen: RecursivePartial<IFullScreen> | boolean;

    /**
     * Enables or disables the HDR mode, if enabled the particles will be rendered in a higher color precision
     */
    hdr: boolean;

    /**
     * The particles interaction options
     */
    interactivity: IInteractivity;

    /**
     * The key used to store the options in the {@link Engine.configs} collection
     */
    key?: string;

    /**
     * Particles inserted at load time with a specific position
     */
    manualParticles: IManualParticle[];

    /**
     * The name of the config, if it needs to be shown to the user, used also if key is missing
     */
    name?: string;

    /**
     * The particles options
     */
    particles: IParticlesOptions;

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
     * Enables a smooth effect, by default it's disabled
     * When enabled the animation will speed up or slow down depending on fps
     * The {@link IOptions.fpsLimit} field will be used as a reference for the animation speed
     * Some examples:
     *      - with a {@link IOptions.fpsLimit} of 60 the animation will be twice faster on 120 fps devices
     *      - with a {@link IOptions.fpsLimit} of 120 the animation will be twice slower on 60 fps devices
     * The animation will be always smooth, but the behavior could be affected by the user screen refresh rate
     * It's recommended to keep this disabled, be careful.
     */
    smooth: boolean;

    style: RecursivePartial<CSSStyleDeclaration>;

    /**
     * User-defined themes that can be retrieved by the particles {@link Container}
     */
    themes: ITheme[];

    /**
     * The maximum layers used in the z-axis
     */
    zLayers: number;
}
