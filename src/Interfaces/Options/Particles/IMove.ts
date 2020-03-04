import {IAttract} from "./IAttract";
import {MoveDirection} from "../../../Enums/MoveDirection";
import {OutMode} from "../../../Enums/OutMode";

export interface IMove {
    attract: IAttract;
    bounce: boolean;
    direction: MoveDirection;
    enable: boolean;
    out_mode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
}
