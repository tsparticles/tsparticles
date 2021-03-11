import type { IBounds, ICoordinates, IDimension, Particle } from "tsparticles-engine";
import type { OutMode, OutModeAlt, OutModeDirection } from "tsparticles-engine";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
