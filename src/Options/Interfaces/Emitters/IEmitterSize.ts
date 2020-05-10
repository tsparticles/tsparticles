import type { IOptionLoader } from "../IOptionLoader";
import type { SizeMode } from "../../../Enums/SizeMode";
import type { IDimension } from "../../../Core/Interfaces/IDimension";

export interface IEmitterSize extends IOptionLoader<IEmitterSize>, IDimension {
    mode: SizeMode
}