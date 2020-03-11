import {IOptionLoader} from "../IOptionLoader";

export interface IBackgroundMask extends IOptionLoader<IBackgroundMask> {
    cover?: string;
    enable: boolean;
}