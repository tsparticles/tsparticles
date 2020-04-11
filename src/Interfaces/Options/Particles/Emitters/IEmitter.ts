import type { IOptionLoader } from "../../IOptionLoader";
import type { ICoordinates } from "../../../ICoordinates";
import type { MoveDirection } from "../../../../Enums/MoveDirection";

export interface IEmitter extends IOptionLoader<IEmitter> {
	autoStart: boolean;
	direction: MoveDirection;
	life?: number;
	position?: ICoordinates;
	quantity: number;
	speed: number;
}