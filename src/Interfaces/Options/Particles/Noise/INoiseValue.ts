import type { IOptionLoader } from "../../IOptionLoader";

export interface INoiseValue extends IOptionLoader<INoiseValue> {
    offset: number;
    value: number;
}
