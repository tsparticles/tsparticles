// Type definitions for inferno-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="inferno" />
import { IParticlesProps, IParticlesState, ParticlesProps } from "../src/";
import { ISourceOptions } from "tsparticles";
import { Component } from "inferno";

type IParticlesParams = IParticlesProps;

export * from "tsparticles";
export { ISourceOptions, IParticlesProps, ParticlesProps, IParticlesParams };

type Particles = Component<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
