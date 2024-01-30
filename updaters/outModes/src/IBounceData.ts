import type { IBounds, ICoordinates, IDimension, OutMode, OutModeDirection, Particle } from "@tsparticles/engine";

export interface IBounceData {
    bounds: IBounds;
    canvasSize: IDimension;
    direction: OutModeDirection;
    offset: ICoordinates;
    outMode: OutMode | keyof typeof OutMode;
    particle: Particle;
    size: number;
}
