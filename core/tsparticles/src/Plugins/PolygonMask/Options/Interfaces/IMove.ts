import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { MoveType } from "../../Enums/MoveType";

export interface IMove extends IOptionLoader<IMove> {
    radius: number;
    type: MoveType;
}
