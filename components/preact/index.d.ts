// Type definitions for preact-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type { ComponentClass } from "react";
import type { CSSProperties, RefObject } from "react";
import type { Container, ISourceOptions, Engine } from "tsparticles";

export interface IParticlesProps {
    id?: string;
    width?: string;
    height?: string;
    options?: ISourceOptions;
    url?: string;
    params?: ISourceOptions;
    style?: CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
    init?: (tsParticles: Engine) => Promise<void>;
    loaded?: (container: Container) => Promise<void>;
}

export interface IParticlesState {
    library?: Container;
}

export type IParticlesParams = IParticlesProps;
export type ParticleProps = IParticlesProps;

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
