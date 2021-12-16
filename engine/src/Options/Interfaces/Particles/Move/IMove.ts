import type { IAttract } from "./IAttract";
import type { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import type { ITrail } from "./ITrail";
import type { IPath } from "./Path/iPath";
import type { IMoveAngle } from "./IMoveAngle";
import type { IMoveGravity } from "./IMoveGravity";
import type { IOutModes } from "./IOutModes";
import type { RangeValue } from "../../../../Types";
import { ICoordinates, IDistance } from "../../../../Core/Interfaces";
import { ISpin } from "./ISpin";

/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export interface IMove {
    angle: number | IMoveAngle;
    attract: IAttract;
    center: Partial<ICoordinates & { radius: number }>;
    decay: number;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    distance: number | Partial<IDistance>;
    drift: RangeValue;
    enable: boolean;
    gravity: IMoveGravity;
    outModes: IOutModes | OutMode | keyof typeof OutMode | OutModeAlt;
    path: IPath;
    random: boolean;
    size: boolean;
    speed: RangeValue;
    spin: ISpin;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
    warp: boolean;
}
