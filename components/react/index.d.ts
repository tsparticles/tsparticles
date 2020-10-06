// Type definitions for react-tsparticles v1.15.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import { ComponentClass } from "react";
import type { IParticlesProps, IParticlesState, ParticlesProps } from "./src/";
import type { ISourceOptions } from "tsparticles";

export type IParticlesParams = IParticlesProps;

export * from "tsparticles/dist/Enums";

export { ISourceOptions, IParticlesProps, ParticlesProps };

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
