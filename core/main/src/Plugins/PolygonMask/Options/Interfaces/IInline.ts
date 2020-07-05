import type { InlineArrangement, InlineArrangementAlt } from "../../Enums";

export interface IInline {
    arrangement: InlineArrangement | keyof typeof InlineArrangement | InlineArrangementAlt;
}
