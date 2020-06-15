import type { IAttract } from "./IAttract";
import type { MoveDirection, OutMode } from "../../../Enums";
import type { IOptionLoader } from "../IOptionLoader";
import type { ITrail } from "./ITrail";
import { INoise } from "./Noise/INoise";

export interface IMove extends IOptionLoader<IMove> {
    angle: number;
    attract: IAttract;

    /**
     * @deprecated use the new collisions property on particles instead
     */
    bounce: boolean;

    /**
     * @deprecated use the new collisions property on particles instead
     */
    collisions: boolean;
    direction: MoveDirection;
    enable: boolean;
    noise: INoise;

    /**
     * @deprecated use the new outMode instead
     */
    out_mode: OutMode;

    outMode: OutMode;
    warp: boolean;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
}
