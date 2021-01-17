import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface INoise {
    init: () => void;

    update: () => void;

    generate: (particle: Particle) => INoiseValue;
}

/**
 * @category Interfaces
 */
export interface INoiseValue {
    angle: number;
    length: number;
}
