import type { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection";
import type { OutMode, OutModeAlt } from "../../../../Enums/Modes/OutMode";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IDistance } from "../../../../Core/Interfaces/IDistance";
import type { IMoveAngle } from "./IMoveAngle";
import type { IMoveAttract } from "./IMoveAttract";
import type { IMoveGravity } from "./IMoveGravity";
import type { IMovePath } from "./Path/IMovePath";
import type { IMoveTrail } from "./IMoveTrail";
import type { IOutModes } from "./IOutModes";
import type { ISpin } from "./ISpin";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export interface IMove {
    /**
     * @deprecated use the new collisions property on particles instead
     */
    bounce: boolean;

    /**
     * @deprecated use the new collisions property on particles instead
     */
    collisions: boolean;

    /**
     * @deprecated use the new outModes instead
     */
    out_mode: OutMode | keyof typeof OutMode | OutModeAlt;

    /**
     * @deprecated use the new outModes instead
     */
    outMode: OutMode | keyof typeof OutMode | OutModeAlt;

    /**
     * @deprecated use the new [[path]] property instead
     */
    noise: IMovePath;

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
