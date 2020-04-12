import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Linker } from "./Linker";
import { Attracter } from "./Attracter";
import { Collider } from "./Collider";

export class InteractionManager {
	public static interact(p1: Particle, container: Container): void {
		const options = container.options;

		/* link particles */
		if (options.particles.lineLinked.enable) {
			Linker.link(p1, container);
		}

		/* attract particles */
		if (options.particles.move.attract.enable) {
			Attracter.attract(p1, container);
		}

		/* bounce particles */
		if (options.particles.move.collisions) {
			Collider.collide(p1, container);
		}
	}
}
