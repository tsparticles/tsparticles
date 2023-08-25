import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { ITwinkle } from "./Options/Interfaces/ITwinkle.js";
import type { Twinkle } from "./Options/Classes/Twinkle.js";

export type TwinkeParticle = Particle & {
    options: TwinkleParticlesOptions;
};

export type ITwinkleParticlesOptions = IParticlesOptions & {
    twinkle?: ITwinkle;
};

export type TwinkleParticlesOptions = ParticlesOptions & {
    twinkle?: Twinkle;
};
