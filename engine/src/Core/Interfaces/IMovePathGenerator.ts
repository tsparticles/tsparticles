import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Vector } from "../Utils";

/**
 * @category Interfaces
 */
export interface IMovePathGenerator {
    generate: (particle: Particle) => Vector;

    init: (container: Container) => void;

    update: () => void;
}
