import type { IDelta, OutMode, OutModeAlt, OutModeDirection, Particle } from "tsparticles-engine";

export interface IOutModeManager {
    modes: (OutMode | OutModeAlt | keyof typeof OutMode)[];

    update(
        particle: Particle,
        direction: OutModeDirection,
        delta: IDelta,
        outMode: OutMode | OutModeAlt | keyof typeof OutMode
    ): void;
}
