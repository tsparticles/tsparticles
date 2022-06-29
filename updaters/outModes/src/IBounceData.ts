import type { IBounds, ICoordinates, IDimension, OutMode, OutModeAlt, OutModeDirection } from "tsparticles-engine";
import type { Particle } from "tsparticles-engine";

export interface IBounceData {
    bounds: IBounds;
    canvasSize: IDimension;
    direction: OutModeDirection;
    offset: ICoordinates;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    particle: Particle;
    size: number;
}
