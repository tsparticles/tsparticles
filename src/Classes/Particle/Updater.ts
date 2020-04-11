import type { Container } from "../Container";
import { OutMode } from "../../Enums/OutMode";
import type { Particle } from "../Particle";
import { Utils } from "../Utils/Utils";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import { Mover } from "./Mover";
import { RotateDirection } from "../../Enums/RotateDirection";
import { IBounds } from "../../Interfaces/IBounds";

/**
 * Particle updater, it manages movement
 */
export class Updater {
	private readonly particle: Particle;
	private readonly container: Container;
	private readonly mover: Mover;

	constructor(container: Container, particle: Particle) {
		this.container = container;
		this.particle = particle;
		this.mover = new Mover(container, particle);
	}

	private static checkBounds(coordinate: number, radius: number, size: number, outside: () => void): void {
		if ((coordinate + radius > size) || (coordinate - radius < 0)) {
			outside();
		}
	}

	public update(delta: number): void {
		/* move the particle */
		this.mover.move(delta);

		/* change opacity status */
		this.updateOpacity();

		/* change size */
		this.updateSize();

		/* change size */
		this.updateAngle();

		/* change particle position if it is out of canvas */
		this.fixOutOfCanvasPosition();

		/* out of canvas modes */
		this.updateOutMode();
	}

	private updateOpacity(): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;

		if (options.particles.opacity.animation.enable) {
			if (particle.opacity.status) {
				if (particle.opacity.value >= options.particles.opacity.value) {
					particle.opacity.status = false;
				}

				particle.opacity.value += (particle.opacity.velocity || 0);
			} else {
				if (particle.opacity.value <= options.particles.opacity.animation.minimumValue) {
					particle.opacity.status = true;
				}

				particle.opacity.value -= (particle.opacity.velocity || 0);
			}

			if (particle.opacity.value < 0) {
				particle.opacity.value = 0;
			}
		}
	}

	private updateSize(): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;

		if (options.particles.size.animation.enable) {
			if (particle.size.status) {
				if (particle.radius >= container.retina.sizeValue) {
					particle.size.status = false;
				}

				particle.radius += (particle.size.velocity || 0);
			} else {
				if (particle.radius <= options.particles.size.animation.minimumValue) {
					particle.size.status = true;
				}

				particle.radius -= (particle.size.velocity || 0);
			}

			if (particle.radius < 0) {
				particle.radius = 0;
			}
		}
	}

	private updateAngle(): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;

		if (options.particles.rotate.animation.enable) {
			switch (particle.rotateDirection) {
				case RotateDirection.clockwise:
					particle.angle += options.particles.rotate.animation.speed * Math.PI / 18;

					if (particle.angle > 360) {
						particle.angle -= 360;
					}
					break;
				case RotateDirection.counterClockwise:
				default:
					particle.angle -= options.particles.rotate.animation.speed * Math.PI / 18;

					if (particle.angle < 0) {
						particle.angle += 360;
					}
					break;
			}
		}
	}

	private fixOutOfCanvasPosition(): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;
		const outMode = options.particles.move.outMode;
		const canvasSize = container.canvas.dimension;

		let newPos: IBounds;

		if (outMode === OutMode.bounce) {
			newPos = {
				bottom: canvasSize.height,
				left: particle.radius,
				right: canvasSize.width,
				top: particle.radius,
			};
		} else if (outMode === OutMode.bounceHorizontal) {
			newPos = {
				bottom: canvasSize.height + particle.radius - particle.offset.y,
				left: particle.radius,
				right: canvasSize.width,
				top: -particle.radius - particle.offset.y,
			};
		} else if (outMode === OutMode.bounceVertical) {
			newPos = {
				bottom: canvasSize.height,
				left: -particle.radius - particle.offset.x,
				right: canvasSize.width + particle.radius + particle.offset.x,
				top: particle.radius,
			};
		} else {
			newPos = {
				bottom: canvasSize.height + particle.radius - particle.offset.y,
				left: -particle.radius - particle.offset.x,
				right: canvasSize.width + particle.radius + particle.offset.x,
				top: -particle.radius - particle.offset.y,
			};
		}

		if (outMode === OutMode.destroy) {
			if (!Utils.isPointInside(particle.position, container.canvas.dimension, particle.radius)) {
				container.particles.remove(particle);
			}
		} else {
			const nextBounds = Utils.calculateBounds(particle.position, particle.radius);

			if (nextBounds.left > canvasSize.width - particle.offset.x) {
				particle.position.x = newPos.left;
				particle.position.y = Math.random() * canvasSize.height;
			} else if (nextBounds.right < -particle.offset.x) {
				particle.position.x = newPos.right;
				particle.position.y = Math.random() * canvasSize.height;
			}

			if (nextBounds.top > canvasSize.height - particle.offset.y) {
				particle.position.y = newPos.top;
				particle.position.x = Math.random() * canvasSize.width;
			} else if (nextBounds.bottom < -particle.offset.y) {
				particle.position.y = newPos.bottom;
				particle.position.x = Math.random() * canvasSize.width;
			}
		}
	}

	private updateOutMode(): void {
		const container = this.container;
		const options = container.options;

		switch (options.particles.move.outMode) {
			case OutMode.bounce:
			case OutMode.bounceVertical:
			case OutMode.bounceHorizontal:
				this.updateBounce();

				break;
		}
	}

	private updateBounce(): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;

		/* check bounce against polygon boundaries */
		if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
			options.polygon.type !== PolygonMaskType.inline) {
			if (!container.polygon.checkInsidePolygon(particle.position)) {
				this.polygonBounce();
			}
		} else if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
			if (particle.initialPosition) {
				const dist = Utils.getDistanceBetweenCoordinates(particle.initialPosition, particle.position);

				if (dist > container.retina.polygonMaskMoveRadius) {
					this.polygonBounce();
				}
			}
		} else {
			const outMode = options.particles.move.outMode;
			const x = particle.position.x + particle.offset.x;
			const y = particle.position.y + particle.offset.y;

			if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal) {
				Updater.checkBounds(x, particle.radius, container.canvas.dimension.width, () => {
					particle.velocity.horizontal = -particle.velocity.horizontal;
				});
			}

			if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
				Updater.checkBounds(y, particle.radius, container.canvas.dimension.height, () => {
					particle.velocity.vertical = -particle.velocity.vertical;
				});
			}
		}
	}

	private polygonBounce(): void {
		const particle = this.particle;

		particle.velocity.horizontal = -particle.velocity.horizontal + (particle.velocity.vertical / 2);
		particle.velocity.vertical = -particle.velocity.vertical + (particle.velocity.horizontal / 2);
	}
}
