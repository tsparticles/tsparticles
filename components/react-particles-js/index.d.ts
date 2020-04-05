// Type definitions for react-particles-js v3.0.0
// Project: https://github.com/wufe/react-particles-js
// Definitions by: Simone Bembi <https://github.com/wufe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />

export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
	? RecursivePartial<U>[]
	: T[P] extends object ? RecursivePartial<T[P]> : T[P]
};

import { ComponentClass } from "react";
import { IOptions } from "tsparticles/dist/Interfaces/Options/IOptions";

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

type ShapeType =
	| "circle"
	| "edge"
	| "triangle"
	| "polygon"
	| "star"
	| "image"
	| "images";

type MoveDirection =
	| "top"
	| "top-right"
	| "right"
	| "bottom-right"
	| "bottom"
	| "bottom-left"
	| "left"
	| "top-left"
	| "none";

type MoveOutMode = "bounce" | "out";

type InteractivityMode = "grab" | "push" | "remove" | "bubble" | "repulse";

declare interface IImageDefinition {
	src?: string;
	width?: number;
	height?: number;
}

type RGB = {
	r: number;
	g: number;
	b: number;
};

type HSL = {
	h: number;
	s: number;
	l: number;
};

type PolygonType = "inline" | "inside" | "outside";

type PolygonInlineArrangementType =
	| "random-point"
	| "one-per-point"
	| "random-length"
	| "equidistant";

type PolygonMoveType = "path" | "radius";

declare interface IPolygonDefinition {
	enable: boolean;
	scale: number;
	type: PolygonType;
	move: {
		radius: number;
		type: PolygonMoveType;
	};
	inline: {
		arrangement: PolygonInlineArrangementType;
	};
	draw: {
		enable: boolean;
		stroke: {
			width: number;
			color: string;
		};
	};
	url: string;
}

export type IParticlesParams = RecursivePartial<IOptions>;

export interface ParticlesProps {
	width?: string;
	height?: string;
	params?: IParticlesParams;
	style?: any;
	className?: string;
	canvasClassName?: string;
}

type Particles = ComponentClass<ParticlesProps>;

declare const Particles: Particles;
export default Particles;
