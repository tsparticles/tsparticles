// Type definitions for react-particles-js v3.0.0
// Project: https://github.com/wufe/react-particles-js
// Definitions by: Simone Bembi <https://github.com/wufe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import { ComponentClass } from "react";
import { Container } from "tsparticles/Core/Container";
import { ISourceOptions } from "tsparticles";

export type IParticlesParams = ISourceOptions;

export * from 'tsparticles/Enums';
export * from "tsparticles/Plugins/Absorbers/Enums";
export * from "tsparticles/Plugins/Emitters/Enums";
export * from "tsparticles/Plugins/PolygonMask/Enums";

export interface ParticlesProps {
    width?: string;
    height?: string;
    params?: IParticlesParams;
    style?: any;
    className?: string;
    canvasClassName?: string;
    particlesRef?: React.RefObject<Container>;
}

type Particles = ComponentClass<ParticlesProps>;

declare const Particles: Particles;
export default Particles;
