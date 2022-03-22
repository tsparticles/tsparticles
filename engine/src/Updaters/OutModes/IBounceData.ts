import type { IBounds, ICoordinates, IDimension, Particle } from "../../Core";
import type { OutMode, OutModeAlt, OutModeDirection } from "../../Enums";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
