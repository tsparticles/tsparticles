import type { OutMode, OutModeAlt } from "../../Enums/Modes/OutMode";
import type { IBounds } from "../../Core/Interfaces/IBounds";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IDimension } from "../../Core/Interfaces/IDimension";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection";
import type { Particle } from "../../Core/Particle";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}
