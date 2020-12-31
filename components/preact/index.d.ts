// Type definitions for preact-particles v1.15.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import type { IParticlesProps, IParticlesState, ParticlesProps } from "./src/";
import type { ISourceOptions } from "tsparticles";
import type { ComponentClass } from "react";

export * from "tsparticles-core/Enums";

export type IParticlesParams = IParticlesProps;
export type { ISourceOptions, IParticlesProps, ParticlesProps };

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
