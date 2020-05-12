// Type definitions for react-tsparticles v1.14.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import { ComponentClass } from "react";
import type { IOptions } from "tsparticles/dist/Interfaces/Options/IOptions";
import { Container } from "tsparticles/dist/Classes/Container";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";

export * from 'tsparticles/dist/Enums/InteractivityDetect';
export * from 'tsparticles/dist/Enums/MoveDirection';
export * from 'tsparticles/dist/Enums/OutMode';
export * from 'tsparticles/dist/Enums/PolygonMaskInlineArrangement';
export * from 'tsparticles/dist/Enums/PolygonMaskMoveType';
export * from 'tsparticles/dist/Enums/PolygonMaskType';
export * from 'tsparticles/dist/Enums/ProcessBubbleType';
export * from 'tsparticles/dist/Enums/RotateDirection';
export * from 'tsparticles/dist/Enums/ShapeType';
export * from 'tsparticles/dist/Enums/Modes/ClickMode';
export * from 'tsparticles/dist/Enums/Modes/DivMode';
export * from 'tsparticles/dist/Enums/Modes/HoverMode';

export type IParticlesParams = RecursivePartial<IOptions>;

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
