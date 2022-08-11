import type { Container, IRgb, Particle } from "tsparticles-engine";
import type { LightOptions, LightParticlesOptions } from "./Options/Classes/LightOptions";
import type { ILight } from "./Options/Interfaces/ILight";
import type { Light } from "./Options/Classes/Light";

export type ILightMode = {
    light?: ILight;
};

export type LightMode = {
    light?: Light;
};

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
