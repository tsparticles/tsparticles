// Type definitions for preact-particles v1.15.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="inferno" />
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { IPolygonMaskOptions } from "tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin";
import { IAbsorberOptions } from "tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin";
import { IEmitterOptions } from "tsparticles/dist/Plugins/Emitters/EmittersPlugin";
import { Component, RefObject } from "inferno";
import { Container } from "tsparticles/dist/Core/Container";

export type IParticlesParams = RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;

export * from "tsparticles/dist/Enums";

export interface ParticlesProps {
	width?: string;
	height?: string;
	params?: IParticlesParams;
	options?: IParticlesParams;
	style?: any;
	className?: string;
	canvasClassName?: string;
	container?: RefObject<Container>;
}

type Particles = Component<ParticlesProps>;

declare const Particles: Particles;

export default Particles;
