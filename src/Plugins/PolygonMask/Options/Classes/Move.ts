import type { IMove } from "../Interfaces/IMove";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { MoveType } from "../../Enums/MoveType";

export class Move implements IMove {
    public radius: number;
    public type: MoveType;

    constructor() {
        this.radius = 10;
        this.type = MoveType.path;
    }

    public load(data?: RecursivePartial<IMove>): void {
        if (data !== undefined) {
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
