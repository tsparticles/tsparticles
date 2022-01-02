// Type definitions for inferno-particles
// Project: https://github.com/matteobruni/tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="inferno" />
import type { Container, ISourceOptions, Main } from "tsparticles";
import type { Component } from "inferno";
import type { RefObject } from "inferno";

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
	init?: (tsParticles: Main) => void;
	loaded?: (container: Container) => void;
}

export interface IParticlesState {
	library?: Container;
}

export type IParticlesParams = IParticlesProps;
export type ParticlesProps = IParticlesProps;

type Particles = Component<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

export default Particles;
