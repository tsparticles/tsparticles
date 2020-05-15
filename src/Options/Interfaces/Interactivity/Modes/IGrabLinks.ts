import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IGrabLinks extends IOptionLoader<IGrabLinks> {
    opacity: number;
    color?: string | IColor;
}
