import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { LightOptions, LightParticlesOptions } from "./Options/Classes/LightOptions.js";
import type { ILight } from "./Options/Interfaces/ILight.js";
import type { IRgb } from "@tsparticles/engine";
import type { Light } from "./Options/Classes/Light.js";

export interface ILightMode {
    light?: ILight;
}

export interface LightMode {
    light?: Light;
}

export type LightContainer = InteractivityContainer & {
    actualOptions: LightOptions;
    canvas: {
        mouseLight?: { start?: IRgb; stop?: IRgb };
    };
};

export type LightParticle = InteractivityParticle & {
    interactivity: {
        modes: ILightMode;
    };
    lightShadow?: IRgb;
    options: LightParticlesOptions;
};
