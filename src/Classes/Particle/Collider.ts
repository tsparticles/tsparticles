import { Utils } from "../Utils/Utils";
import { Particle } from "../Particle";
import { Container } from "../Container";

export class Collider {
	public static collide(p1: Particle, container: Container): void {

		for (const p2 of container.particles.spatialGrid.queryRadius(p1.position, p1.size.value * 2) as Particle[]) {

			if (p1 === p2 || !p2.particlesOptions.move.collisions) continue;

			const dist = Utils.getDistanceBetweenCoordinates(p1.position, p2.position);
			const distP = (p1.bubble.radius || p1.size.value) + (p2.bubble.radius || p2.size.value);

			if (dist <= distP) {
				p1.resetVelocity();
				p2.resetVelocity();
			}
		}
	}
}
