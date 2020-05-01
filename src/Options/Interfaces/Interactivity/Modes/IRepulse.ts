import type { IOptionLoader } from "../../IOptionLoader";

export interface IRepulse extends IOptionLoader<IRepulse> {
    distance: number;
    duration: number;
    speed: number;
}
