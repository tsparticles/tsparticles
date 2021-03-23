import type { IAttract } from "./IAttract";
import type { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import type { ITrail } from "./ITrail";
import type { IMovePath } from "./IMovePath";
import type { IMoveAngle } from "./IMoveAngle";
import type { IMoveGravity } from "./IMoveGravity";
import type { IOutModes } from "./IOutModes";
import type { ISpin } from "../ISpin";
import type { IDistance } from "../../../../Core/Interfaces";
import type { RangeValue } from "../../../../Types";

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
     * @deprecated use the new path instead
     */
    noise: IMovePath;

    angle: number | IMoveAngle;
    attract: IAttract;
    decay: number;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
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
    trail: ITrail;
    vibrate: boolean;
    warp: boolean;
}
