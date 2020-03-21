import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../Particles/IColor";

export interface IBackgroundMask extends IOptionLoader<IBackgroundMask> {
    cover: IColor;
    enable: boolean;
}
