// Type definitions for react-tsparticles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { ComponentClass } from "react";
import type { IParticlesProps, IParticlesState, ParticlesProps } from "./src/";
import type { ISourceOptions } from "tsparticles";

export type IParticlesParams = IParticlesProps;

export * from "tsparticles-engine/Enums";

export { ISourceOptions, IParticlesProps, ParticlesProps };

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
