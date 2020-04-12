import type { IEmitter } from "../../../Interfaces/Options/Emitters/IEmitter";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { Particles } from "../Particles/Particles";
import type { IEmitterRate } from "../../../Interfaces/Options/Emitters/IEmitterRate";
import { EmitterRate } from "./EmitterRate";

export class Emitter implements IEmitter {
	public autoStart: boolean;
	public direction: MoveDirection;
	public life?: number;
	public particles?: IParticles;
	public position?: ICoordinates;
	public rate: IEmitterRate;

	constructor() {
		this.autoStart = true;
		this.direction = MoveDirection.none;
		this.rate = new EmitterRate();
	}

	public load(data?: RecursivePartial<IEmitter>, particlesOptions?: IParticles): void {
		if (data !== undefined) {
			if (data.autoStart !== undefined) {
				this.autoStart = data.autoStart;
			}

			if (data.direction !== undefined) {
				this.direction = data.direction;
			}

			if (data.life !== undefined) {
				this.life = data.life;
			}

			if (data.particles !== undefined) {
				this.particles = new Particles();

				this.particles.load(data.particles);
			}

			this.rate.load(data.rate);

			if (data.position !== undefined) {
				this.position = data.position;
			}
		}
	}
}