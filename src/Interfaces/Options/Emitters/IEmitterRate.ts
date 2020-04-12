import { IOptionLoader } from "../IOptionLoader";

export interface IEmitterRate extends IOptionLoader<IEmitterRate> {
	quantity: number;
	seconds: number;
}
