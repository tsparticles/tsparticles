import {IAttract} from "./IAttract";
import {MoveDirection} from "../../../Enums/MoveDirection";
import {OutMode} from "../../../Enums/OutMode";

export interface IMove {
    attract: IAttract;
    bounce: boolean;
    direction: MoveDirection;
    enable: boolean;

    /**
     * @deprecated use the new outMode instead
     */
    out_mode: OutMode;

    outMode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
}
