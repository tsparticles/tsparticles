import type { IEmitter } from "../../../../Interfaces/Options/Particles/Emitters/IEmitter";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../../Interfaces/ICoordinates";
import { MoveDirection } from "../../../../Enums/MoveDirection";

export class Emitter implements IEmitter {
	public autoStart: boolean;
	public direction: MoveDirection;
	public life?: number;
	public position?: ICoordinates;
	public quantity: number;
	public speed: number;

	constructor() {
		this.autoStart = true;
		this.direction = MoveDirection.none;
		this.quantity = 1;
		this.speed = 1;
	}

	public load(data?: RecursivePartial<IEmitter>): void {
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