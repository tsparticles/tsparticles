import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Vector } from "../Particle/Vector";

/**
 * @category Interfaces
 */
export interface IMovePathGenerator {
    generate: (particle: Particle) => Vector;

    init: (container: Container) => void;

    update: () => void;
}
