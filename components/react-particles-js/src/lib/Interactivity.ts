import { Particle, IParams, ParticlesLibrary, TPoint } from ".";
import { PolygonType, InteractivityMode } from "./IParams";

export enum MouseInteractivityStatus {
	MOUSEMOVE = "mousemove",
	MOUSELEAVE = "mouseleave"
}

export default class Interact {
	interactionElement: EventTarget;
	mouseMovePosition: TPoint = {
		x: 0,
		y: 0
	};
	mouseClickPosition: TPoint = {
		x: 0,
		y: 0
	};
	mouseStatus: MouseInteractivityStatus;
	mouseClickTime: number = 0;

	constructor(private library: ParticlesLibrary) {
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseClick = this.onMouseClick.bind(this);
	}

	attachEventHandlers() {
		const interactivity = this.library.getParameter(p => p.interactivity);

		if (interactivity.detect_on === "window") {
			this.interactionElement = window;
		} else {
			this.interactionElement = this.library.canvas.element;
		}

		if (
			interactivity.events.onhover.enable ||
			interactivity.events.onclick.enable
		) {
			this.interactionElement.addEventListener("mousemove", this.onMouseMove);
			this.interactionElement.addEventListener("mouseleave", this.onMouseLeave);
		}

		if (interactivity.events.onclick.enable) {
			this.interactionElement.addEventListener("click", this.onMouseClick);
		}
	}

	detachEventHandlers() {
		const interactivity = this.library.getParameter(p => p.interactivity);
		if (!this.interactionElement) return;

		if (
			interactivity.events.onhover.enable ||
			interactivity.events.onclick.enable
		) {
			this.interactionElement.removeEventListener(
				"mousemove",
				this.onMouseMove
			);
			this.interactionElement.removeEventListener(
				"mouseleave",
				this.onMouseLeave
			);
		}

		if (interactivity.events.onclick.enable) {
			this.interactionElement.removeEventListener("click", this.onMouseClick);
		}
	}

	onMouseMove(event: MouseEvent) {
		const position: TPoint = {
			x: 0,
			y: 0
		};

		if (this.interactionElement === window) {
			position.x = event.clientX;
			position.y = event.clientY;
		} else {
			position.x = event.offsetX || event.clientX;
			position.y = event.offsetY || event.clientY;
		}

		this.mouseMovePosition = position;

		if (this.library.retina) {
			this.mouseMovePosition.x *= this.library.canvas.pxratio;
			this.mouseMovePosition.y *= this.library.canvas.pxratio;
		}

		this.mouseStatus = MouseInteractivityStatus.MOUSEMOVE;
	}

	onMouseLeave() {
		this.mouseMovePosition.x = 0;
		this.mouseMovePosition.y = 0;

		this.mouseStatus = MouseInteractivityStatus.MOUSELEAVE;
	}

	onMouseClick() {
		const interactivity = this.library.getParameter(p => p.interactivity);
		const particles = this.library.getParameter(p => p.particles);
		const polygon = this.library.getParameter(p => p.polygon);

		this.mouseClickPosition = { ...this.mouseMovePosition };

		if (
			polygon.enable &&
			[PolygonType.INSIDE, PolygonType.OUTSIDE].indexOf(polygon.type) > -1
		) {
			const isInside = this.library.polygonMask.isPointInsidePolygon(
				this.mouseClickPosition
			);
			if (polygon.type === PolygonType.INSIDE && !isInside) return;
			if (polygon.type === PolygonType.OUTSIDE && isInside) return;
		}

		this.mouseClickTime = new Date().getTime();

		if (interactivity.events.onclick.enable) {
			switch (interactivity.events.onclick.mode) {
				case InteractivityMode.PUSH:
					if (particles.move.enable) {
						this.library.modes.pushParticles(
							interactivity.modes.push.particles_nb,
							this.mouseClickPosition
						);
					} else {
						if (interactivity.modes.push.particles_nb == 1) {
							this.library.modes.pushParticles(
								interactivity.modes.push.particles_nb,
								this.mouseClickPosition
							);
						} else if (interactivity.modes.push.particles_nb > 1) {
							this.library.modes.pushParticles(
								interactivity.modes.push.particles_nb
							);
						}
					}
					break;

				case InteractivityMode.REMOVE:
					this.library.modes.removeParticles(
						interactivity.modes.remove.particles_nb
					);
					break;

				case InteractivityMode.BUBBLE:
					this.library.modes.bubble_clicking = true;
					break;

				case InteractivityMode.REPULSE:
					this.library.modes.repulse_clicking = true;
					this.library.modes.repulse_count = 0;
					this.library.modes.repulse_finish = false;
					setTimeout(() => {
						this.library.modes.repulse_clicking = false;
					}, interactivity.modes.repulse.duration * 1000);
					break;
			}
		}
	}

	linkParticles(p1: Particle, p2: Particle): void {
		const distance = this.library.manager.getDistance(p1, p2);
		const canvas = this.library.canvas;
		const lineLinked = this.library.getParameter(p => p.particles.line_linked);

		if (distance <= lineLinked.distance) {
			const lineOpacity =
				lineLinked.opacity -
				distance / (1 / lineLinked.opacity) / lineLinked.distance;
			if (lineOpacity > 0) {
				let lineColor = lineLinked.color_rgb_line;
				let { r, g, b } = lineColor;
				canvas.ctx.save();
				canvas.ctx.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${lineOpacity} )`;
				canvas.ctx.lineWidth = lineLinked.width;

				canvas.ctx.beginPath();
				if (lineLinked.shadow.enable) {
					canvas.ctx.shadowBlur = lineLinked.shadow.blur;
					canvas.ctx.shadowColor = lineLinked.shadow.color;
				}

				canvas.ctx.moveTo(p1.x, p1.y);
				canvas.ctx.lineTo(p2.x, p2.y);
				canvas.ctx.stroke();
				canvas.ctx.closePath();
				canvas.ctx.restore();
			}
		}
	}

	attractParticles(p1: Particle, p2: Particle): void {
		const {
			distance,
			distanceX,
			distanceY
		} = this.library.manager.getDistances(p1, p2);

		const line_linked = this.library.getParameter(p => p.particles.line_linked);
		const attract = this.library.getParameter(p => p.particles.move.attract);

		if (distance <= line_linked.distance) {
			const accelerationX = distanceX / (attract.rotateX * 1000);
			const accelerationY = distanceY / (attract.rotateY * 1000);

			p1.vx -= accelerationX;
			p1.vy -= accelerationY;

			p2.vx += accelerationX;
			p2.vy += accelerationY;
		}
	}

	bounceParticles(p1: Particle, p2: Particle): void {
		const distance = this.library.manager.getDistance(p1, p2);
		let minimumDistance = p1.radius + p2.radius;

		if (distance <= minimumDistance) {
			p1.vx = -p1.vx;
			p1.vy = -p1.vy;
			p2.vx = -p2.vx;
			p2.vy = -p2.vy;
		}
	}
}
