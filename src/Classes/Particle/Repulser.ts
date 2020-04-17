import { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import { HoverMode } from "../../Enums/Modes/HoverMode";
import { OutMode } from "../../Enums/OutMode";
import { Utils } from "../Utils/Utils";
import { DivMode } from "../../Enums/Modes/DivMode";
import { Constants } from "../Utils/Constants";
import type { IParticle } from "../../Interfaces/IParticle";
import { ICoordinates } from "../../Interfaces/ICoordinates";

/**
 * Particle repulse manager
 */
export class Repulser {
	private readonly particle: IParticle;
	private readonly container: Container;

	constructor(container: Container, particle: IParticle) {
		this.container = container;
		this.particle = particle;
	}

	public repulse(): void {
		const container = this.container;
		const options = container.options;
		const interactivity = options.interactivity;
		const hoverEnabled = interactivity.events.onHover.enable;
		const clickEnabled = interactivity.events.onClick.enable;
		const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
		const hoverMode = interactivity.events.onHover.mode;
		const clickMode = interactivity.events.onClick.mode;
		const divMode = interactivity.events.onDiv.mode;

		if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
			this.hoverRepulse();
		} else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
			this.clickRepulse();
		} else if (interactivity.events.onDiv.enable && Utils.isInArray(DivMode.repulse, divMode)) {
			this.divRepulse();
		}
	}

	private divRepulse(): void {
		const container = this.container;
		const options = container.options;
		const elem = document.getElementById(options.interactivity.events.onDiv.elementId);

		if (!elem) {
			return;
		}

		const pos = {
			x: (elem.offsetLeft + elem.offsetWidth / 2),
			y: (elem.offsetTop + elem.offsetHeight / 2),
		};

		let divWidth = elem.offsetWidth / 2;

		if (container.retina.isRetina) {
			pos.x *= container.retina.pixelRatio;
			pos.y *= container.retina.pixelRatio;
			divWidth *= container.retina.pixelRatio
		}

		const repulseRadius = divWidth;

		this.processRepulse(pos, repulseRadius);
	}

	private hoverRepulse(): void {
		const container = this.container;
		const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
		const repulseRadius = container.retina.repulseModeDistance;

		this.processRepulse(mousePos, repulseRadius);
	}

	private processRepulse(position: ICoordinates, repulseRadius: number) {
		const container = this.container;
		const particle = this.particle;

		const dx = particle.position.x - position.x;
		const dy = particle.position.y - position.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const normVec = {
			x: dx / dist,
			y: dy / dist,
		};

		const velocity = 100;
		const repulseFactor = Utils.clamp((1 - Math.pow(dist / repulseRadius, 2)) * velocity, 0, 50);
		const outMode = particle.particlesOptions.move.outMode;
		const sizeValue = particle.sizeValue ?? container.retina.sizeValue;
		const pos = {
			x: particle.position.x + normVec.x * repulseFactor,
			y: particle.position.y + normVec.y * repulseFactor,
		};

		if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical || outMode === OutMode.bounceHorizontal) {
			const isInside = {
				horizontal: pos.x - sizeValue > 0 && pos.x + sizeValue < container.canvas.dimension.width,
				vertical: pos.y - sizeValue > 0 && pos.y + sizeValue < container.canvas.dimension.height,
			};

			if (outMode === OutMode.bounceVertical || isInside.horizontal) {
				particle.position.x = pos.x;
			}

			if (outMode === OutMode.bounceHorizontal || isInside.vertical) {
				particle.position.y = pos.y;
			}
		} else {
			particle.position.x = pos.x;
			particle.position.y = pos.y;
		}
	}

	private clickRepulse(): void {
		const container = this.container;
		const particle = this.particle;

		if (!container.repulse.finish) {
			if (!container.repulse.count) {
				container.repulse.count = 0;
			}

			container.repulse.count++;

			if (container.repulse.count === container.particles.count) {
				container.repulse.finish = true;
			}
		}

		if (container.repulse.clicking) {
			const repulseDistance = container.retina.repulseModeDistance;
			const repulseRadius = Math.pow(repulseDistance / 6, 3);
			const mouseClickPos = container.interactivity.mouse.clickPosition || { x: 0, y: 0 };
			const dx = mouseClickPos.x - particle.position.x;
			const dy = mouseClickPos.y - particle.position.y;
			const d = dx * dx + dy * dy;
			const force = -repulseRadius / d;

			// default
			if (d <= repulseRadius) {
				this.processClickRepulse(dx, dy, force);
			}
			// bang - slow motion mode
			// if(!container.repulse_finish){
			//   if(d <= repulseRadius){
			//     process();
			//   }
			// }else{
			//   process();
			// }
		} else if (container.repulse.clicking === false) {
			particle.velocity.horizontal = particle.initialVelocity.horizontal;
			particle.velocity.vertical = particle.initialVelocity.vertical;
		}
	}

	private processClickRepulse(dx: number, dy: number, force: number): void {
		const container = this.container;
		const options = container.options;
		const particle = this.particle;
		const f = Math.atan2(dy, dx);

		particle.velocity.horizontal = force * Math.cos(f);
		particle.velocity.vertical = force * Math.sin(f);

		const outMode = options.particles.move.outMode;

		if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal || outMode === OutMode.bounceVertical) {
			const pos = {
				x: particle.position.x + particle.velocity.horizontal,
				y: particle.position.y + particle.velocity.vertical,
			};

			if (outMode !== OutMode.bounceVertical) {
				if (pos.x + particle.size.value > container.canvas.dimension.width ||
					pos.x - particle.size.value < 0) {
					particle.velocity.horizontal = -particle.velocity.horizontal;
				}
			}

			if (outMode !== OutMode.bounceHorizontal) {
				if (pos.y + particle.size.value > container.canvas.dimension.height ||
					pos.y - particle.size.value < 0) {
					particle.velocity.vertical = -particle.velocity.vertical;
				}
			}
		}
	}
}
