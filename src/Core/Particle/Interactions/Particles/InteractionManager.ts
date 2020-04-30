import type { Container } from "../../../Container";
import type { Particle } from "../../../Particle";
import { Linker } from "./Linker";
import { Attractor } from "./Attractor";
import { Collider } from "./Collider";
import { Infecter } from "./Infecter";

export class InteractionManager {
    public static interact(p1: Particle, container: Container): void {
        /* link particles */
        if (p1.particlesOptions.lineLinked.enable) {
            Linker.link(p1, container);
        }

        /* attract particles */
        if (p1.particlesOptions.move.attract.enable) {
            Attractor.attract(p1, container);
        }

        /* bounce particles */
        if (p1.particlesOptions.collisions.enable) {
            Collider.collide(p1, container);
        }

        if (container.options.infection.enable) {
            Infecter.infect(p1, container);
        }
    }
}
