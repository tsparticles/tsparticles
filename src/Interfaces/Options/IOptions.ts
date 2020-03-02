"use strict";

import {IOptionsInteractivity} from "./Interactivity/IOptionsInteractivity";
import {IOptionsParticles} from "./Particles/IOptionsParticles";
import {IOptionsPolygonMask} from "./PolygonMask/IOptionsPolygonMask";

export interface IOptions {
    fps_limit: number;
    interactivity: IOptionsInteractivity;
    particles: IOptionsParticles;
    polygon: IOptionsPolygonMask;
    retina_detect: boolean;
}
