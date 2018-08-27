import { hexToRgb, IParams, ParticlesLibrary, getColor } from ".";
import {
	MoveDirection,
	ShapeType,
	PolygonType,
	PolygonInlineArrangementType,
	IParticleSizeDefinition,
	IParticleColorDefinition,
	IParticleOpacityDefinition,
	IParticleMoveDefinition,
	IPolygonDefinition,
	IParticleShapeDefinition
} from "./IParams";
import { IParsedColor, TPoint, deepAssign } from "./Utils";
import {
	ImageManager,
	IShapeDefinitionEnhanced,
	IImageDefinitionEnhanced
} from "./ImageManager";

export type ParticleParams = {
	color?: IParticleColorDefinition;
	move?: IParticleMoveDefinition;
	opacity?: IParticleOpacityDefinition;
	polygon?: IPolygonDefinition;
	position?: TPoint;
	shape?: IParticleShapeDefinition;
	size?: IParticleSizeDefinition;
};

export default class Particle {
	library: ParticlesLibrary;

	radius: number;
	radius_bubble: number;
	size_status: boolean;
	vs: number;

	x: number;
	y: number;

	color: IParsedColor;

	opacityValue: number;
	bubbleOpacity: number;
	opacity_status: boolean;
	vo: number;

	vx: number;
	vy: number;

	vx_i: number;
	vy_i: number;

	shapeImage: IImageDefinitionEnhanced;

	initialPosition: TPoint;
	shape: IParticleShapeDefinition;

	constructor(
		library: ParticlesLibrary,
		{
			color,
			move,
			opacity,
			polygon,
			position,
			shape,
			size
		}: ParticleParams = {}
	) {
		this.library = library;
		this.setupSize(size);
		this.setupPosition(move, polygon, position);
		this.setupColor(color);
		this.setupOpacity(opacity);
		this.setupAnimation(move);
		this.setupShape(shape);
	}

	setupSize(size?: IParticleSizeDefinition): void {
		const defaultSize = this.library.getParameter(p => p.particles.size);
		size = deepAssign({}, defaultSize, size);
		this.radius = (size.random ? Math.random() : 1) * size.value;
		if (size.anim.enable) {
			this.size_status = false;
			this.vs = size.anim.speed / 100;
			if (!size.anim.sync) this.vs = this.vs * Math.random();
		}
	}

	setupPosition(
		move?: IParticleMoveDefinition,
		polygon?: IPolygonDefinition,
		position?: TPoint
	): void {
		this.initialPosition = position;
		const defaultMove = this.library.getParameter(p => p.particles.move);
		move = deepAssign({}, defaultMove, move);
		const defaultPolygon = this.library.getParameter(p => p.polygon);
		polygon = deepAssign({}, defaultPolygon, polygon);
		const particlesArray = this.library.getParameter(p => p.particles.array);

		const { canvas, vendors } = this.library;

		if (position) {
			this.x = position.x;
			this.y = position.y;
		} else {
			if (polygon.enable) {
				let randomPosition: TPoint;
				switch (polygon.type) {
					case PolygonType.INLINE:
						switch (polygon.inline.arrangement) {
							case PolygonInlineArrangementType.RANDOM_POINT:
								randomPosition = this.library.polygonMask.getRandomPointOnPolygonPath();
								break;
							case PolygonInlineArrangementType.RANDOM_LENGTH:
								randomPosition = this.library.polygonMask.getRandomPointOnPolygonPathByLength();
								break;
							case PolygonInlineArrangementType.EQUIDISTANT:
								randomPosition = this.library.polygonMask.getEquidistantPoingOnPolygonPathByIndex(
									particlesArray.length
								);
								break;
							case PolygonInlineArrangementType.ONE_PER_POINT:
							default:
								randomPosition = this.library.polygonMask.getPoingOnPolygonPathByIndex(
									particlesArray.length
								);
						}
						break;
					case PolygonType.INSIDE:
						randomPosition = this.library.polygonMask.getRandomPointInsidePolygonPath();
						break;
					case PolygonType.OUTSIDE:
						randomPosition = this.library.polygonMask.getRandomPointOutsidePolygonPath();
						break;
				}
				if (randomPosition) {
					this.x = randomPosition.x;
					this.y = randomPosition.y;
					this.initialPosition = { x: this.x, y: this.y };
				}
			}
		}

		if (this.x === undefined || this.y === undefined) {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
		}

		if (this.x > canvas.width - this.radius * 2) {
			this.x = this.x - this.radius;
		} else if (this.x < this.radius * 2) {
			this.x = this.x + this.radius;
		}
		if (this.y > canvas.height - this.radius * 2) {
			this.y = this.y - this.radius;
		} else if (this.y < this.radius * 2) {
			this.y = this.y + this.radius;
		}

		if (move.bounce) {
			vendors.checkOverlap(this, { x: this.x, y: this.y });
		}
	}

	setupColor(color?: IParticleColorDefinition) {
		const defaultColor = this.library.getParameter(p => p.particles.color);
		color = deepAssign({}, color, defaultColor);

		this.color = getColor(color.value);
	}

	setupOpacity(opacity?: IParticleOpacityDefinition) {
		const defaultOpacity = this.library.getParameter(p => p.particles.opacity);
		opacity = deepAssign({}, defaultOpacity, opacity);

		this.opacityValue = (opacity.random ? Math.random() : 1) * opacity.value;
		if (opacity.anim.enable) {
			this.opacity_status = false;
			this.vo = opacity.anim.speed / 100;
			if (!opacity.anim.sync) {
				this.vo = this.vo * Math.random();
			}
		}
	}

	setupAnimation(move?: IParticleMoveDefinition) {
		const defaultMove = this.library.getParameter(p => p.particles.move);
		move = deepAssign({}, defaultMove, move);

		let baseVelocity: TPoint;
		switch (move.direction) {
			case MoveDirection.TOP:
				baseVelocity = { x: 0, y: -1 };
				break;
			case MoveDirection.TOP_RIGHT:
				baseVelocity = { x: 0.5, y: -0.5 };
				break;
			case MoveDirection.RIGHT:
				baseVelocity = { x: 1, y: 0 };
				break;
			case MoveDirection.BOTTOM_RIGHT:
				baseVelocity = { x: 0.5, y: 0.5 };
				break;
			case MoveDirection.BOTTOM:
				baseVelocity = { x: 0, y: 1 };
				break;
			case MoveDirection.BOTTOM_LEFT:
				baseVelocity = { x: -0.5, y: 1 };
				break;
			case MoveDirection.LEFT:
				baseVelocity = { x: -1, y: 0 };
				break;
			case MoveDirection.TOP_LEFT:
				baseVelocity = { x: -0.5, y: -0.5 };
				break;
			default:
				baseVelocity = { x: 0, y: 0 };
				break;
		}
		if (move.straight) {
			this.vx = baseVelocity.x;
			this.vy = baseVelocity.y;
			if (move.random) {
				this.vx = this.vx * Math.random();
				this.vy = this.vy * Math.random();
			}
		} else {
			this.vx = baseVelocity.x + Math.random() - 0.5;
			this.vy = baseVelocity.y + Math.random() - 0.5;
		}

		this.vx_i = this.vx;
		this.vy_i = this.vy;
	}

	setupShape(shape?: IParticleShapeDefinition) {
		const defaultShape = this.library.getParameter(p => p.particles.shape);
		shape = deepAssign({}, defaultShape, shape);
		const particlesArray = this.library.getParameter(p => p.particles.array);

		if (Array.isArray(shape.type)) {
			let selectedShape =
				shape.type[Math.floor(Math.random() * shape.type.length)];
			shape = deepAssign({}, shape, { type: selectedShape });
		}

		this.shape = shape;

		if (shape.type === ShapeType.IMAGE || shape.type === ShapeType.IMAGES) {
			if (shape.type === ShapeType.IMAGES) {
				this.shapeImage = this.library.imageManager.getImage(
					particlesArray.length
				);
			} else {
				this.shapeImage = this.library.imageManager.getImage();
			}
			if (
				this.shapeImage.type === "svg" &&
				this.shapeImage.svgData !== undefined
			) {
				this.library.imageManager
					.createSvgImage(this.shapeImage.svgData, {
						color: this.color,
						opacity: this.opacityValue
					})
					.then(image => {
						this.shapeImage.elementData = image;
						this.shapeImage.loaded = true;
					});
			}
		}
	}

	draw(): void {
		let { canvas, vendors } = this.library;

		let radius: number;
		if (this.radius_bubble !== undefined) {
			radius = this.radius_bubble;
		} else {
			radius = this.radius;
		}

		let opacityValue: number;
		if (this.bubbleOpacity !== undefined) {
			opacityValue = this.bubbleOpacity;
		} else {
			opacityValue = this.opacityValue;
		}

		let colorValue: string;
		if (this.color.rgb) {
			let { r, g, b } = this.color.rgb;
			colorValue = `rgba( ${r}, ${g}, ${b}, ${opacityValue} )`;
		} else {
			let { h, s, l } = this.color.hsl;
			colorValue = `hsla( ${h}, ${s}, ${l}, ${opacityValue} )`;
		}

		canvas.ctx.fillStyle = colorValue;
		canvas.ctx.beginPath();

		switch (this.shape.type) {
			case ShapeType.CIRCLE:
				canvas.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
				break;

			case ShapeType.EDGE:
				canvas.ctx.rect(
					this.x - radius,
					this.y - radius,
					radius * 2,
					radius * 2
				);
				break;

			case ShapeType.TRIANGLE:
				vendors.drawShape(
					canvas.ctx,
					this.x - radius,
					this.y + radius / 1.66,
					radius * 2,
					3,
					2
				);
				break;

			case ShapeType.POLYGON:
				vendors.drawShape(
					canvas.ctx,
					this.x - radius / (this.shape.polygon.nb_sides / 3.5),
					this.y - radius / (2.66 / 3.5),
					(radius * 2.66) / (this.shape.polygon.nb_sides / 3),
					this.shape.polygon.nb_sides,
					1
				);
				break;

			case ShapeType.STAR:
				vendors.drawShape(
					canvas.ctx,
					this.x - (radius * 2) / (this.shape.polygon.nb_sides / 4),
					this.y - radius / ((2 * 2.66) / 3.5),
					(radius * 2 * 2.66) / (this.shape.polygon.nb_sides / 3),
					this.shape.polygon.nb_sides,
					2
				);
				break;

			case ShapeType.IMAGES:
			case ShapeType.IMAGE:
				if (this.shapeImage.elementData) {
					canvas.ctx.drawImage(
						this.shapeImage.elementData,
						this.x - radius,
						this.y - radius,
						radius * 2,
						(radius * 2) / this.shapeImage.ratio
					);
				}
				break;
		}

		canvas.ctx.closePath();

		if (this.shape.stroke.width > 0) {
			canvas.ctx.strokeStyle = this.shape.stroke.color;
			canvas.ctx.lineWidth = this.shape.stroke.width;
			canvas.ctx.stroke();
		}

		canvas.ctx.fill();
	}
}
