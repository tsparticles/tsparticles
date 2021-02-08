import type { IBounds, ICoordinates, IDimension, Particle } from "tsparticles-core";
import type { OutMode, OutModeAlt, OutModeDirection } from "tsparticles-core";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
