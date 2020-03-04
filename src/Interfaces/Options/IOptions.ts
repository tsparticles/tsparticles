"use strict";

import {IInteractivity} from "./Interactivity/IInteractivity";
import {IParticles} from "./Particles/IParticles";
import {IPolygonMask} from "./PolygonMask/IPolygonMask";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 * @deprecated this interface is deprecated, use the new Options class
 */
export interface IOptions {
    /**
     * The F(rame)P(er)S(econd) limit applied to all particles animations.
     */
    fps_limit: number;
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
     */
    retina_detect: boolean;
}
