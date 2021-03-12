// Type definitions for inferno-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type { IParticlesProps, IParticlesState, ParticlesProps } from "./src/";
import type { ISourceOptions } from "tsparticles";
import type { Component } from "inferno";

export type IParticlesParams = IParticlesProps;

export * from "tsparticles-engine/Enums";
export type { ISourceOptions, IParticlesProps, ParticlesProps };

type Particles = Component<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
