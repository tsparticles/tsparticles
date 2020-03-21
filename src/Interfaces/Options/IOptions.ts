import type { IInteractivity } from "./Interactivity/IInteractivity";
import type { IParticles } from "./Particles/IParticles";
import type { IPolygonMask } from "./PolygonMask/IPolygonMask";
import type { IOptionLoader } from "./IOptionLoader";
import type { IBackgroundMask } from "./BackgroundMask/IBackgroundMask";
import type { PresetType } from "../../Enums/PresetType";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 */
export interface IOptions extends IOptionLoader<IOptions> {
    /**
     * The F(rame)P(er)S(econd) limit applied to all particles animations.
     * @deprecated use the new fpsLimit instead
     */
    fps_limit: number;

    /**
     * The F(rame)P(er)S(econd) limit applied to all particles animations.
     */
    fpsLimit: number;

    /**
     * The particles interaction options
     */
    interactivity: IInteractivity;

    /**
     * The particles options
     */
    particles: IParticles;

    /**
     * The polygon mask options.
     */
    polygon: IPolygonMask;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     * @deprecated use the new detectRetina instead
     */
    retina_detect: boolean;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    detectRetina: boolean;

    backgroundMask: IBackgroundMask;

    pauseOnBlur: boolean;

    preset?: PresetType | PresetType[];
}
