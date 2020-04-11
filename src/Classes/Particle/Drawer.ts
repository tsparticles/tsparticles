import type {Container} from "../Container";
import type {IParticle} from "../../Interfaces/IParticle";

/**
 * Particle draw manager
 */
export class Drawer {
    private readonly particle: IParticle;
    private readonly container: Container;

    constructor(container: Container, particle: IParticle) {
        this.container = container;
        this.particle = particle;
    }

    public draw(): void {
        const container = this.container;
        const particle = this.particle;

        container.canvas.drawParticle(particle);
    }
}
