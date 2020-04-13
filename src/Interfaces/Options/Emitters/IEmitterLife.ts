import type { IOptionLoader } from "../IOptionLoader";

export interface IEmitterLife extends IOptionLoader<IEmitterLife> {
	count?: number;
	duration?: number;
	delay?: number;
}
