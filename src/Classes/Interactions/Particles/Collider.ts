import { Utils } from "../../Utils/Utils";
import { Particle } from "../../Particle";
import { Container } from "../../Container";
import { IParticle } from "../../../Interfaces/IParticle";

export class Collider {
	public static collide(p1: Particle, container: Container): void {
		for (const p2 of container.particles.spatialGrid.queryRadius(p1.position, (p1.sizeValue ?? container.retina.sizeValue) * 2)) {

			if (!p2 || p1 === p2 || !p2.particlesOptions.move.collisions) continue;

			const dist = Utils.getDistanceBetweenCoordinates(p1.position, p2.position);
			const defaultSize = container.retina.sizeValue;
			const radius1 = this.getRadius(p1, defaultSize);
			const radius2 = this.getRadius(p2, defaultSize);
			const distP = radius1 + radius2;

			if (dist <= distP) {
				p1.resetVelocity();
				p2.resetVelocity();
			}
		}
	}

	private static getRadius(particle: IParticle, fallback: number): number {
		return particle.bubble.radius || particle.sizeValue || fallback;
	}
}
