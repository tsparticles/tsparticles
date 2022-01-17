import type { IBounds, ICoordinates, IDimension, OutMode, OutModeAlt, OutModeDirection } from "tsparticles-engine";
import type { Particle } from "tsparticles-engine";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
