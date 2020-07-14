import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import { RotateAnimation } from "./RotateAnimation";
import { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class Rotate implements IRotate, IOptionLoader<IRotate> {
    public animation: RotateAnimation;
    public direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    public path: boolean;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new RotateAnimation();
        this.direction = RotateDirection.clockwise;
        this.path = false;
        this.random = false;
        this.value = 0;
    }

    public load(data?: RecursivePartial<IRotate>): void {
        if (data === undefined) {
            return;
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        this.animation.load(data.animation);

        if (data.path !== undefined) {
            this.path = data.path;
        }

        if (data.random !== undefined) {
            this.random = data.random;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
