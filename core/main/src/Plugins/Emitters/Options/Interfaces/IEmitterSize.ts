import type { SizeMode } from "../../../../Enums";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";

export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
