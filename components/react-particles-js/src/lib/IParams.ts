export interface ICanvasParam {
	element: HTMLCanvasElement;
	width: number;
	height: number;
	pxratio?: number;
	ctx?: CanvasRenderingContext2D;
}

export type RGB = {
	r: number;
	g: number;
	b: number;
};

export type HSL = {
	h: number;
	s: number;
	l: number;
};

export enum ShapeType {
	CIRCLE = "circle",
	EDGE = "edge",
	TRIANGLE = "triangle",
	POLYGON = "polygon",
	STAR = "star",
	IMAGE = "image",
	IMAGES = "images"
}

export enum MoveDirection {
	TOP = "top",
	TOP_RIGHT = "top-right",
	RIGHT = "right",
	BOTTOM_RIGHT = "bottom-right",
	BOTTOM = "bottom",
	BOTTOM_LEFT = "bottom-left",
	LEFT = "left",
	TOP_LEFT = "top-left",
	NONE = "none"
}

export enum MoveOutMode {
	BOUNCE = "bounce",
	OUT = "out"
}

export enum InteractivityMode {
	GRAB = "grab",
	PUSH = "push",
	REMOVE = "remove",
	BUBBLE = "bubble",
	REPULSE = "repulse"
}

export interface IImageDefinition {
	src: string;
	width: number;
	height: number;
}

export interface IParticleShapeDefinition {
	type: ShapeType;
	stroke: {
		width: number;
		color: any;
	};
	polygon: {
		nb_sides: number;
	};
	image: IImageDefinition;
	images: IImageDefinition[];
}

export enum PolygonType {
	INLINE = "inline",
	INSIDE = "inside",
	OUTSIDE = "outside"
}

export enum PolygonInlineArrangementType {
	RANDOM_POINT = "random-point",
	ONE_PER_POINT = "one-per-point", // Overrides particles number
	RANDOM_LENGTH = "random-length",
	EQUIDISTANT = "equidistant"
}

export enum PolygonMoveType {
	PATH = "path",
	RADIUS = "radius"
}

export interface IPolygonDefinition {
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

export interface IParticleSizeDefinition {
	value: number;
	random: boolean;
	anim: {
		enable: boolean;
		speed: number;
		size_min: number;
		sync: boolean;
	};
}

export type ParticleColorValueType = string | string[] | RGB | HSL | 'random';

export interface IParticleColorDefinition {
	value: ParticleColorValueType;
}

export interface IParticleOpacityDefinition {
	value: number;
	random: boolean;
	anim: {
		enable: boolean;
		speed: number;
		opacity_min: number;
		sync: boolean;
	};
}

export interface IParticleMoveDefinition {
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
}

export interface IParams {
	particles: {
		number: {
			value: number;
			/**
			 * The maximum number of particles that can be added via pushing.
			 * Set to <= 0 to have unlimited particles
			 */
			max: number;
			density: {
				enable: boolean;
				value_area: number;
			};
		};
		color: IParticleColorDefinition;
		shape: IParticleShapeDefinition;
		opacity: IParticleOpacityDefinition;
		size: IParticleSizeDefinition;
		line_linked: {
			enable: boolean;
			distance: number;
			color: any;
			opacity: number;
			width: number;
			color_rgb_line?: any;
			shadow: {
				enable: boolean;
				blur: number;
				color: string;
			};
		};
		move: IParticleMoveDefinition;
		array: any[];
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
				opacity?: number;
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
}
