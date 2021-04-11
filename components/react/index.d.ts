// Type definitions for react-tsparticles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import type { Container, ISourceOptions, Main } from "tsparticles";

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
    init?: (tsParticles: Main) => void;
    loaded?: (container: Container) => void;
}


export type IParticlesParams = IParticlesProps;
export type ParticlesProps = IParticlesProps;

export * from "tsparticles";

type Particles = React.ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
