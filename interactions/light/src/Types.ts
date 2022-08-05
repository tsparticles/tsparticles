import type { Container, IRgb, Particle } from "tsparticles-engine";
import type { LightOptions, LightParticlesOptions } from "./Options/Classes/LightOptions";
import type { Light } from "./Options/Classes/Light";

export type LightInteractivity = {
    modes?: {
        light?: Light;
    };
};

export type LightContainer = Container & {
    actualOptions: LightOptions;
    canvas: {
        mouseLight?: { start?: IRgb; stop?: IRgb };
    };
    interactivity?: LightInteractivity;
};

export type LightParticle = Particle & {
    interactivity?: LightInteractivity;
    lightShadow?: IRgb;
    options: LightParticlesOptions;
};
