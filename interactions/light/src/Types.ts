import type { Container, IRgb, Particle } from "tsparticles-engine";

export type LightContainer = Container & {
    canvas: {
        mouseLight?: { start?: IRgb; stop?: IRgb };
    };
};

export type LightParticle = Particle & {
    lightShadow?: IRgb;
};
