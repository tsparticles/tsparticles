// Type definitions for preact-particles v1.15.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import { PureComponent } from "preact/compat";
import type { IParticlesProps, ParticlesProps } from "./src/";
import type { ISourceOptions } from "tsparticles";

export type IParticlesParams = IParticlesProps;
export * from "tsparticles/dist/Enums";


export type { ISourceOptions, IParticlesProps, ParticlesProps };

type Particles = PureComponent<IParticlesProps>;

declare const Particles: Particles;

export default Particles;
