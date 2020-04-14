import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../ICoordinates";
import type { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { IDimension } from "../../IDimension";

export interface IEmitter extends IOptionLoader<IEmitter> {
	size?: IDimension;
	direction: MoveDirection;
	life: IEmitterLife;
	particles?: IParticles;
	position?: ICoordinates;
	rate: IEmitterRate;
}
