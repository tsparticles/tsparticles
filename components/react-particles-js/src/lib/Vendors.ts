import { IParams, Particle, hexToRgb, ParticlesLibrary } from ".";
import { ImageManager } from "./ImageManager";
import { PolygonInlineArrangementType } from "./IParams";

export default class Vendors {
	params: IParams;
	library: ParticlesLibrary;
	lastDraw: number;
	private initialized: boolean = false;

	constructor(
		private imageManager: ImageManager,
		params: IParams,
		library: ParticlesLibrary
	) {
		this.params = params;
		this.library = library;
		if (typeof performance !== "undefined") {
			this.lastDraw = performance.now();
		}
		this.draw = this.draw.bind(this);
	}

	densityAutoParticles(): void {
		let { canvas, modes } = this.library;
		let { particles } = this.params;

		const density = particles.number.density;
		let densityValueArea = density.value_area;

		if (density.enable) {
			let area = (canvas.element.width * canvas.element.height) / 1000;
			if (this.library.retina) {
				area = area / canvas.pxratio * 2;
			}
			const nb_particles = area * particles.number.value / densityValueArea;
			const missing_particles = particles.array.length - nb_particles;
			if (missing_particles < 0) {
				modes.pushParticles(Math.abs(missing_particles));
			} else {
				modes.removeParticles(missing_particles);
			}
		}
	}

	checkOverlap(p1: Particle, position?: { x: number; y: number }): void {
		let { canvas, vendors } = this.library;

		// Hot fix: maximum call stack due to not rendered canvas.
		// https://github.com/Wufe/react-particles-js/issues/49
		if (!canvas.width || !canvas.height) return;

		let { particles } = this.params;

		particles.array.forEach((particle: Particle) => {
			let p2: Particle = particle;

			let dx: number = p1.x - p2.x;
			let dy: number = p1.y - p2.y;
			let dist: number = Math.sqrt(dx * dx + dy * dy);
			if (dist <= p1.radius + p2.radius) {
				if (!this.library.params.polygon.enable) {
					p1.x = position ? position.x : Math.random() * canvas.width;
					p1.y = position ? position.y : Math.random() * canvas.height;
					vendors.checkOverlap(p1);
				} else {
					// If disposition is random, we cannot check if the point is used by another particle
					switch (this.library.params.polygon.inline.arrangement) {
						case PolygonInlineArrangementType.RANDOM_LENGTH:
						case PolygonInlineArrangementType.RANDOM_POINT:
						default:
						// Let the particle be overlapped
					}
				}
			}
		});
	}

	destroy(): void {
		cancelAnimationFrame(this.library.drawAnimFrame);
		this.library.canvas.element.remove();
	}

	drawShape(
		c: CanvasRenderingContext2D,
		startX: number,
		startY: number,
		sideLength: number,
		sideCountNumerator: number,
		sideCountDenominator: number
	): void {
		let sideCount: number = sideCountNumerator * sideCountDenominator;
		let decimalSides: number = sideCountNumerator / sideCountDenominator;
		let interiorAngleDegrees: number =
			(180 * (decimalSides - 2)) / decimalSides;
		let interiorAngle: number =
			Math.PI - (Math.PI * interiorAngleDegrees) / 180;
		c.save();
		c.beginPath();
		c.translate(startX, startY);
		c.moveTo(0, 0);
		for (let i = 0; i < sideCount; i++) {
			c.lineTo(sideLength, 0);
			c.translate(sideLength, 0);
			c.rotate(interiorAngle);
		}
		c.fill();
		c.restore();
	}

	exportImg(): void {
		let { canvas } = this.library;
		window.open(canvas.element.toDataURL("image/png"), "_blank");
	}

	draw(): void {
		let shouldDraw = true;
		let { manager, vendors } = this.library;
		let { particles } = this.params;
		if (performance !== undefined) {
			let thisDraw = performance.now();
			if (thisDraw - this.lastDraw < 1000 / this.params.fps_limit) {
				shouldDraw = false;
			} else {
				this.lastDraw = performance.now();
			}
		}
		if (shouldDraw) {
			manager.particlesDraw();
		}
		if (!particles.move.enable) {
			cancelAnimationFrame(this.library.drawAnimFrame);
		} else {
			this.library.drawAnimFrame = requestAnimationFrame(vendors.draw);
		}
	}

	init(): void {
		if (this.initialized) return;
		this.initialized = true;
		let { library } = this;
		let { manager, vendors } = library;
		let { particles } = this.params;
		library.retinaInit();
		library.canvasInit();
		library.canvasSize();
		library.polygonMask
			.initialize(this.library.getParameter(p => p.polygon))
			.then(() => {
				manager.particlesCreate();
				vendors.densityAutoParticles();
				this.library.setParameters({
					particles: {
						line_linked: {
							color_rgb_line: hexToRgb(particles.line_linked.color)
						}
					}
				});
				this.draw();
			});
	}

	start(): void {
		let { particles } = this.params;

		this.imageManager.parseShape(particles.shape).then(shape => {
			this.init();
		});
	}
}
