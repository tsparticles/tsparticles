import type { IEmitter } from "../../../Interfaces/Options/Emitters/IEmitter";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { Particles } from "../Particles/Particles";
import type { IEmitterRate } from "../../../Interfaces/Options/Emitters/IEmitterRate";
import { EmitterRate } from "./EmitterRate";
import type { IEmitterLife } from "../../../Interfaces/Options/Emitters/IEmitterLife";

export class EmitterLife implements IEmitterLife {
	public count?: number;
	public delay?: number;
	public duration?: number;

	constructor() {
	}

	public load(data?: RecursivePartial<IEmitterLife>): void {
		if (data !== undefined) {
			if (data.count !== undefined) {
				this.count = data.count;
			}

			if (data.delay !== undefined) {
				this.delay = data.delay;
			}

			if (data.duration !== undefined) {
				this.duration = data.duration;
			}
		}
	}
}

export class Emitter implements IEmitter {
	public autoStart: boolean;
	public direction: MoveDirection;
	public life: IEmitterLife;
	public particles?: IParticles;
	public position?: ICoordinates;
	public rate: IEmitterRate;

	constructor() {
		this.autoStart = true;
		this.direction = MoveDirection.none;
		this.life = new EmitterLife();
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

			this.life.load(data.life);

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