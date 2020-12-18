import type { Particle } from "../Particle";
import type { INoiseValue } from "./INoiseValue";

/**
 * @category Interfaces
 */
export interface INoise {
    init: () => void;

    update: () => void;

    generate: (particle: Particle) => INoiseValue;
}
