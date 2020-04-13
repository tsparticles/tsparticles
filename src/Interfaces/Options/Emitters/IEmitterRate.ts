import type { IOptionLoader } from "../IOptionLoader";

export interface IEmitterRate extends IOptionLoader<IEmitterRate> {
	quantity: number;
	delay: number;
}
