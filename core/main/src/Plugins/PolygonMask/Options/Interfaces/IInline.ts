import type { InlineArrangement } from "../../Enums/InlineArrangement";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export interface IInline extends IOptionLoader<IInline> {
    arrangement: InlineArrangement | keyof typeof InlineArrangement;
}
