import type { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection.js";
import type { OutMode, OutModeAlt } from "../../../../Enums/Modes/OutMode.js";
import type { IDistance } from "../../../../Core/Interfaces/IDistance.js";
import type { IMoveAngle } from "./IMoveAngle.js";
import type { IMoveAttract } from "./IMoveAttract.js";
import type { IMoveCenter } from "./IMoveCenter.js";
import type { IMoveGravity } from "./IMoveGravity.js";
import type { IMovePath } from "./Path/IMovePath.js";
import type { IMoveTrail } from "./IMoveTrail.js";
import type { IOutModes } from "./IOutModes.js";
import type { ISpin } from "./ISpin.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

/**
 * [[include:Options/Particles/Move.md]]
 */
export interface IMove {
    angle: number | IMoveAngle;
    attract: IMoveAttract;
    center: IMoveCenter;
    decay: RangeValue;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    distance: number | Partial<IDistance>;
    drift: RangeValue;
    enable: boolean;
    gravity: IMoveGravity;
    outModes: IOutModes | OutMode | keyof typeof OutMode | OutModeAlt;
    path: IMovePath;
    random: boolean;
    size: boolean;
    speed: RangeValue;
    spin: ISpin;
    straight: boolean;
    trail: IMoveTrail;
    vibrate: boolean;
    warp: boolean;
}
