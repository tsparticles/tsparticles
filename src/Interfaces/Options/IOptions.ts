import type { IInteractivity } from "./Interactivity/IInteractivity";
import type { IParticles } from "./Particles/IParticles";
import type { IPolygonMask } from "./PolygonMask/IPolygonMask";
import type { IOptionLoader } from "./IOptionLoader";
import type { IBackgroundMask } from "./BackgroundMask/IBackgroundMask";
import type { IBackground } from "./Background/IBackground";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import type { IEmitter } from "./Emitters/IEmitter";
import type { IAbsorber } from "./Absorbers/IAbsorber";
import { IInfection } from "./Infection/IInfection";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 */
export interface IOptions extends IOptionLoader<IOptions> {
    absorbers: SingleOrMultiple<IAbsorber>;

    background: IBackground;

    backgroundMask: IBackgroundMask;

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    detectRetina: boolean;

    emitters: SingleOrMultiple<IEmitter>;

    /**
     * The Frame Per Second limit applied to all particles animations.
     * @deprecated use the new fpsLimit instead
     */
    fps_limit: number;

    /**
     * The F(rame)P(er)S(econd) limit applied to all particles animations.
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

    pauseOnBlur: boolean;

    /**
     * The polygon mask options.
     */
    polygon: IPolygonMask;

    preset?: string | string[];

    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     * @deprecated use the new detectRetina instead
     */
    retina_detect: boolean;
}
