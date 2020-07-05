import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { MoveType } from "../../Enums";

export interface IMove {
    radius: number;
    type: MoveType | keyof typeof MoveType;
}
