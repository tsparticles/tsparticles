// Type definitions for react-particles-js v2.4.0-beta.8
// Project: https://github.com/wufe/react-particles-js
// Definitions by: Simone Bembi <https://github.com/wufe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />

type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
	? RecursivePartial<U>[]
	: T[P] extends object ? RecursivePartial<T[P]> : T[P]
};

import { ComponentClass } from "react";

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

export type IParticlesParams = RecursivePartial<{
	particles: {
		number: {
			value: number;
			max: number;
			density: {
				enable: boolean;
				value_area: number;
			};
		};
		color: {
			value: string | string[] | RGB | HSL | 'random';
		};
		shape: {
			type: ShapeType | ShapeType[];
			stroke: {
				width: number;
				color: string;
			};
			polygon: {
				nb_sides: number;
			};
			image: IImageDefinition;
			images: IImageDefinition[];
		};
		opacity: {
			value: number;
			random: boolean;
			anim: {
				enable: boolean;
				speed: number;
				opacity_min: number;
				sync: boolean;
			};
		};
		size: {
			value: number;
			random: boolean;
			anim: {
				enable: boolean;
				speed: number;
				size_min: number;
				sync: boolean;
			};
		};
		line_linked: {
			enable: boolean;
			distance: number;
			color: string;
			opacity: number;
			width: number;
			shadow: {
				enable: boolean;
				blur: number;
				color: string;
			};
		};
		move: {
			enable: boolean;
			speed: number;
			direction: MoveDirection;
			random: boolean;
			straight: boolean;
			out_mode: MoveOutMode;
			bounce: boolean;
			attract: {
				enable: boolean;
				rotateX: number;
				rotateY: number;
			};
		};
	};
	interactivity: {
		detect_on: string;
		events: {
			onhover: {
				enable: boolean;
				mode: InteractivityMode | InteractivityMode[];
			};
			onclick: {
				enable: boolean;
				mode: InteractivityMode | InteractivityMode[];
			};
			resize: boolean;
		};
		modes: {
			grab: {
				distance: number;
				line_linked: {
					opacity: number;
				};
			};
			bubble: {
				distance: number;
				size: number;
				duration: number;
				opacity: number;
			};
			repulse: {
				distance: number;
				duration: number;
			};
			push: {
				particles_nb: number;
			};
			remove: {
				particles_nb: number;
			};
		};
	};
	retina_detect: boolean;
	fps_limit: number;
	polygon: IPolygonDefinition;
}>;

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
