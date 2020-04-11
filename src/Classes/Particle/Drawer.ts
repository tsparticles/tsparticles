import type { Container } from "../Container";
import type { IParticle } from "../../Interfaces/IParticle";

/**
 * Particle draw manager
 */
export class Drawer {
	public static draw(particle: IParticle, container: Container): void {
		container.canvas.drawParticle(particle);
	}
}
