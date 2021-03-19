import type { Particle } from "../Particle";
import type { IPathValue } from "./IPathValue";

/**
 * @category Interfaces
 */
export interface IMovePathGenerator {
    init: () => void;

    update: () => void;

    generate: (particle: Particle) => IPathValue;
}
