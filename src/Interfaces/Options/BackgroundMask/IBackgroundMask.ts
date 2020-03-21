import {IOptionLoader} from "../IOptionLoader";
import {IColor} from "../Particles/IColor";

export interface IBackgroundMask extends IOptionLoader<IBackgroundMask> {
    cover: IColor;
    enable: boolean;
}
