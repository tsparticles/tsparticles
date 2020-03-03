import {Container} from "../Container";
import {Particle} from "../Particle";

export class Bouncer {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public bounce(p2: Particle): void {
        const particle = this.particle;
        const dx = particle.position.x - p2.position.x;
        const dy = particle.position.y - p2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distP = particle.radius + p2.radius;

        if (dist <= distP) {
            particle.velocity.horizontal = -particle.velocity.horizontal;
            particle.velocity.vertical = -particle.velocity.vertical;
            p2.velocity.horizontal = -p2.velocity.horizontal;
            p2.velocity.vertical = -p2.velocity.vertical;
        }
    }
}
