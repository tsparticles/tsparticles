import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../ICoordinates";
import type { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../Particles/IParticles";

export interface IEmitter extends IOptionLoader<IEmitter> {
	autoStart: boolean;
	direction: MoveDirection;
	life?: number;
	particles?: IParticles;
	position?: ICoordinates;
	quantity: number;
	speed: number;
}