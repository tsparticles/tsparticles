import type { IEmitterRate } from "../../../Interfaces/Options/Emitters/IEmitterRate";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class EmitterRate implements IEmitterRate {
	public quantity: number;
	public seconds: number;

	constructor() {
		this.quantity = 1;
		this.seconds = 0.1;
	}

	public load(data?: RecursivePartial<IEmitterRate>): void {
		if (data !== undefined) {
			if (data.quantity !== undefined) {
				this.quantity = data.quantity;
			}

			if (data.seconds !== undefined) {
				this.seconds = data.seconds;
			}
		}
	}
}
