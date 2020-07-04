import type { Particle } from "../Particle";
import type { INoiseValue } from "./INoiseValue";

export interface INoise {
    init: () => void;

    update: () => void;

    generate: (particle: Particle) => INoiseValue;
}
