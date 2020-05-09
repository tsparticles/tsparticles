import type { IOptionLoader } from "../../IOptionLoader";
import type { ITwinkleValues } from "./ITwinkleValues";

export interface ITwinkle extends IOptionLoader<ITwinkle> {
    lines: ITwinkleValues;
    particles: ITwinkleValues;
}
