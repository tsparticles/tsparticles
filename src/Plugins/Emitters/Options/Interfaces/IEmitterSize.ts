import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { SizeMode } from "../../../../Enums";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";

export interface IEmitterSize extends IOptionLoader<IEmitterSize>, IDimension {
    mode: SizeMode;
}
