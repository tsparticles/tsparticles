import {Container} from "../Container";
import {Particle} from "../Particle";
import { Utils } from "../Utils/Utils";

export class Bouncer {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public bounce(p2: Particle): void {
        const particle = this.particle;
        const dist = Utils.getDistanceBetweenCoordinates(particle.position, p2.position);
        const distP = particle.radius + p2.radius;

        if (dist <= distP) {
            particle.velocity.horizontal = -particle.velocity.horizontal;
            particle.velocity.vertical = -particle.velocity.vertical;
            p2.velocity.horizontal = -p2.velocity.horizontal;
            p2.velocity.vertical = -p2.velocity.vertical;
        }
    }
}
