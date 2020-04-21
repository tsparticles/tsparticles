import type { IRotate } from "../../../../Interfaces/Options/Particles/Rotate/IRotate";
import type { IRotateAnimation } from "../../../../Interfaces/Options/Particles/Rotate/IRotateAnimation";
import { RotateAnimation } from "./RotateAnimation";
import { RotateDirection } from "../../../../Enums/RotateDirection";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Rotate implements IRotate {
    public animation: IRotateAnimation;
    public direction: RotateDirection;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new RotateAnimation();
        this.direction = RotateDirection.clockwise;
        this.random = false;
        this.value = 0;
    }

    public load(data?: RecursivePartial<IRotate>): void {
        if (data !== undefined) {
            this.animation.load(data.animation);

            if (data.random !== undefined) {
                this.random = data.random;
            }

            if (data.direction !== undefined) {
                this.direction = data.direction;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
