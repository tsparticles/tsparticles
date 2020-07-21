import type { IAttract } from "../IAttract";
import type { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import type { ITrail } from "../ITrail";
import type { INoise } from "../Noise/INoise";
import type { IMoveAngle } from "./IMoveAngle";

export interface IMove {
    angle: number | IMoveAngle;
    attract: IAttract;

    /**
     * @deprecated use the new collisions property on particles instead
     */
    bounce: boolean;

    /**
     * @deprecated use the new collisions property on particles instead
     */
    collisions: boolean;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    enable: boolean;
    noise: INoise;

    /**
     * @deprecated use the new outMode instead
     */
    out_mode: OutMode | keyof typeof OutMode | OutModeAlt;

    outMode: OutMode | keyof typeof OutMode | OutModeAlt;
    warp: boolean;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
}
