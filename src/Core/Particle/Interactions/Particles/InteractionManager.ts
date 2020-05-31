import type { Container } from "../../../Container";
import type { Particle } from "../../../Particle";
import { Linker } from "./Linker";
import { Attractor } from "./Attractor";
import { Collider } from "./Collider";
import { Infecter } from "./Infecter";

export class InteractionManager {
    public static interact(p1: Particle, container: Container, delta: number): void {
        /* link particles */
        if (p1.particlesOptions.links.enable) {
            Linker.link(p1, container, delta);
        }

        /* attract particles */
        if (p1.particlesOptions.move.attract.enable) {
            Attractor.attract(p1, container, delta);
        }

        /* bounce particles */
        if (p1.particlesOptions.collisions.enable) {
            Collider.collide(p1, container, delta);
        }

        if (container.options.infection.enable) {
            Infecter.infect(p1, container, delta);
        }
    }
}
