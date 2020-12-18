import type { InlineArrangement, InlineArrangementAlt } from "../../Enums";

/**
 * @category Polygon Mask Plugin
 */
export interface IInline {
    arrangement: InlineArrangement | keyof typeof InlineArrangement | InlineArrangementAlt;
}
