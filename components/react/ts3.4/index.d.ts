// Type definitions for react-tsparticles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import { ComponentClass } from "react";
import { IParticlesProps, IParticlesState, ParticlesProps } from "../src";
import { ISourceOptions } from "tsparticles";

type IParticlesParams = IParticlesProps

export { ISourceOptions, IParticlesProps, ParticlesProps, IParticlesParams };

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
