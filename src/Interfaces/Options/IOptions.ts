"use strict";

import {IOptionsInteractivity} from "./Interactivity/IOptionsInteractivity";
import {IOptionsParticles} from "./Particles/IOptionsParticles";
import {IOptionsPolygonMask} from "./PolygonMask/IOptionsPolygonMask";

/**
 * The Options interface, defines all the options that can be used by `tsParticles`
 */
export interface IOptions {
    /**
     * The F(rame)P(er)S(econd) limit applied to all particles animations.
     */
    fps_limit: number;
    /**
     * The particles interaction options
     */
    interactivity: IOptionsInteractivity;
    /**
     * The particles options
     */
    particles: IOptionsParticles;
    /**
     * The polygon mask options.
     */
    polygon: IOptionsPolygonMask;
    /**
     * Enables the retina detection, if disabled the ratio used by canvas will be always 1 and not the device setting.
     */
    retina_detect: boolean;
}
