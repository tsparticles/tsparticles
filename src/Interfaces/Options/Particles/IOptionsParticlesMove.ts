import {IOptionsParticlesMoveAttract} from "./IOptionsParticlesMoveAttract";
import {MoveDirection} from "../../../Enums/MoveDirection";
import {OutMode} from "../../../Enums/OutMode";

export interface IOptionsParticlesMove {
    attract: IOptionsParticlesMoveAttract;
    bounce: boolean;
    direction: MoveDirection;
    enable: boolean;
    out_mode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
}
