import type { IDelta, OutMode, OutModeDirection, Particle } from "@tsparticles/engine";

export interface IOutModeManager {
    modes: (OutMode | keyof typeof OutMode)[];

    update(
        particle: Particle,
        direction: OutModeDirection,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode,
    ): Promise<void>;
}
