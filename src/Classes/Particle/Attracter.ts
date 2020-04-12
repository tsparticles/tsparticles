import type { IParticle } from "../../Interfaces/IParticle";
import type { Container } from "../Container";

export class Attracter {
	public static attract(p1: IParticle, p2: IParticle, container: Container): void {
		const options = container.options;
		/* condensed particles */
		const dx = p1.position.x - p2.position.x;
		const dy = p1.position.y - p2.position.y;
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (dist <= (p1.lineLinkedDistance ?? container.retina.lineLinkedDistance)) {
			const ax = dx / (options.particles.move.attract.rotate.x * 1000);
			const ay = dy / (options.particles.move.attract.rotate.y * 1000);

			p1.velocity.horizontal -= ax;
			p1.velocity.vertical -= ay;
			p2.velocity.horizontal += ax;
			p2.velocity.vertical += ay;
		}
	}
}
