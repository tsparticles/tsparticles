import type { Particle } from "tsparticles-engine";
import type { OutMode, OutModeAlt, OutModeDirection } from "tsparticles-engine";
import type { IBounds, ICoordinates, IDimension } from "tsparticles-engine";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
