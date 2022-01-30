// Type definitions for react-tsparticles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import type { Container, ISourceOptions, Engine } from "tsparticles-engine";

export interface IParticlesState {
    library?: Container;
}

export interface IParticlesProps {
    id?: string;
    width?: string;
    height?: string;
    options?: ISourceOptions;
    params?: ISourceOptions;
    url?: string;
    style?: React.CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: React.RefObject<Container>;
    init?: (engine: Engine) => Promise<void>;
    loaded?: (container: Container) => Promise<void>;
}


export type IParticlesParams = IParticlesProps;
export type ParticlesProps = IParticlesProps;

type Particles = React.ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
