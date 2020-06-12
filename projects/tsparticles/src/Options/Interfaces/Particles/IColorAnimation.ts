import type { IOptionLoader } from "../IOptionLoader";

export interface IColorAnimation extends IOptionLoader<IColorAnimation> {
    enable: boolean;
    speed: number;
    sync: boolean;
}
