// Type definitions for preact-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type { ComponentClass } from "react";
import { CSSProperties, RefObject } from "react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

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
    particlesLoaded?: (container: Container) => Promise<void>;
}

export interface IParticlesState {
    library?: Container;
}

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

declare function initParticlesEngine(cb: (engine: Engine) => Promise<void>): Promise<void>;

export default Particles;
export { Particles, initParticlesEngine };
