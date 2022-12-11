import type { Container } from "../Container";
import type { Particle } from "../Particle";
import type { Vector } from "../Utils/Vector";

/**
 * @category Interfaces
 */
export interface IMovePathGenerator {
    generate: (particle: Particle) => Vector;

    init: (container: Container) => void;

    reset: (particle: Particle) => void;

    update: () => void;
}
