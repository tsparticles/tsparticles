import type { MoveType } from "../../Enums";

/**
 * @category Polygon Mask Plugin
 */
export interface IMove {
    radius: number;
    type: MoveType | keyof typeof MoveType;
}
