import type { IEmitter } from "../../../Interfaces/Options/Emitters/IEmitter";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import { MoveDirection } from "../../../Enums/MoveDirection";
import { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { Particles } from "../Particles/Particles";

export class Emitter implements IEmitter {
	public autoStart: boolean;
	public direction: MoveDirection;
	public life?: number;
	public particles?: IParticles;
	public position?: ICoordinates;
	public quantity: number;
	public speed: number;

	constructor() {
		this.autoStart = true;
		this.direction = MoveDirection.none;
		this.quantity = 1;
		this.speed = 1;
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

			if (data.quantity !== undefined) {
				this.quantity = data.quantity;
			}

			if (data.position !== undefined) {
				this.position = data.position;
			}

			if (data.speed !== undefined) {
				this.speed = data.speed;
			}
		}
	}
}