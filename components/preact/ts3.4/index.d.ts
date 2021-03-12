// Type definitions for preact-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { IParticlesProps, IParticlesState, ParticlesProps } from "../src/";
import { ISourceOptions } from "tsparticles";
import { ComponentClass } from "react";

export * from "tsparticles/dist/Enums";

type IParticlesParams = IParticlesProps;
export { ISourceOptions, IParticlesProps, ParticlesProps, IParticlesParams };

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
