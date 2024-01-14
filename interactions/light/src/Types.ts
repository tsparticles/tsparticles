import type { Container, IRgb, Particle } from "@tsparticles/engine";
import type { LightOptions, LightParticlesOptions } from "./Options/Classes/LightOptions.js";
import type { ILight } from "./Options/Interfaces/ILight.js";
import type { Light } from "./Options/Classes/Light.js";

export interface ILightMode {
    light?: ILight;
}

export interface LightMode {
    light?: Light;
}

export type LightContainer = Container & {
    actualOptions: LightOptions;
    canvas: {
        mouseLight?: { start?: IRgb; stop?: IRgb };
    };
};

export type LightParticle = Particle & {
    interactivity: {
        modes: ILightMode;
    };
    lightShadow?: IRgb;
    options: LightParticlesOptions;
};
