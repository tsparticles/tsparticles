import { Utils } from "../Utils/Utils";
import { Particle } from "../Particle";
import { Container } from "../Container";

export class Collider {
	public static collide(p1: Particle, container: Container): void {

		for (const p2 of container.particles.spatialGrid.queryRadius(p1.position, (p1.sizeValue ?? container.retina.sizeValue) * 2)) {

			if (!p2 || p1 === p2 || !p2.particlesOptions.move.collisions) continue;

			const dist = Utils.getDistanceBetweenCoordinates(p1.position, p2.position);
			const distP = (p1.bubble.radius || p1.sizeValue || container.retina.sizeValue) + (p2.bubble.radius || p2.sizeValue || container.retina.sizeValue);

			if (dist <= distP) {
				p1.resetVelocity();
				p2.resetVelocity();
			}
		}
	}
}
