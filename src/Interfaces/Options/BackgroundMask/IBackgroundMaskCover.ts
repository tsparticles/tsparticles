import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../Particles/IColor";

export interface IBackgroundMaskCover extends IOptionLoader<IBackgroundMaskCover> {
    color: IColor;
    opacity: number;
}
