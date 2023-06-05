import type { IMoveCenter } from "../../../Interfaces/Particles/Move/IMoveCenter";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { PixelMode } from "../../../../Enums/Modes/PixelMode";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class MoveCenter implements IMoveCenter, IOptionLoader<IMoveCenter> {
    mode: PixelMode | keyof typeof PixelMode;
    radius;
    x;
    y;

    constructor() {
        this.x = 50;
        this.y = 50;
        this.mode = PixelMode.percent;
        this.radius = 0;
    }

    load(data?: RecursivePartial<IMoveCenter>): void {
        if (!data) {
            return;
        }

        if (data.x !== undefined) {
            this.x = data.x;
        }

        if (data.y !== undefined) {
            this.y = data.y;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
