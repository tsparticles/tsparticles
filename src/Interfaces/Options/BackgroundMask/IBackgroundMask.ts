import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../Particles/IColor";
import type { IBackgroundMaskCover } from "./IBackgroundMaskCover";

export interface IBackgroundMask extends IOptionLoader<IBackgroundMask> {
    cover: IBackgroundMaskCover | IColor;
    enable: boolean;
}
