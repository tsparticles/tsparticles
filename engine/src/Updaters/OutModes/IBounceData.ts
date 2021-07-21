import type { Particle } from "../../Core/Particle";
import type { OutMode, OutModeAlt, OutModeDirection } from "../../Enums";
import type { IBounds, ICoordinates, IDimension } from "../../Core/Interfaces";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
