import type { IMoveAttract } from "./IMoveAttract";
import type { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import type { IMoveTrail } from "./IMoveTrail";
import type { IPath } from "./Path";
import type { IMoveAngle } from "./IMoveAngle";
import type { IMoveGravity } from "./IMoveGravity";
import type { IOutModes } from "./IOutModes";
import type { RangeValue } from "../../../../Types";
import { ICoordinates, IDistance } from "../../../../Core";
import { ISpin } from "./ISpin";

/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export interface IMove {
    angle: number | IMoveAngle;
    attract: IMoveAttract;
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
    trail: IMoveTrail;
    vibrate: boolean;
    warp: boolean;
}
