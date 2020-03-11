import {IRotate} from "../../../Interfaces/Options/Particles/IRotate";
import {IRotateAnimation} from "../../../Interfaces/Options/Particles/IRotateAnimation";
import {Utils} from "../../Utils/Utils";
import {RotateAnimation} from "./RotateAnimation";
import {RotateDirection} from "../../../Enums/RotateDirection";

export class Rotate implements IRotate {
    public animation: IRotateAnimation;
    public direction: RotateDirection;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new RotateAnimation();
        this.direction = RotateDirection.clockwise;
        this.random = false;
        this.value = 0
    }

    public load(data: IRotate): void {
        if (Utils.hasData(data)) {
            this.animation.load(data.animation);

            if (Utils.hasData(data.random)) {
                this.random = data.random
            }

            if (Utils.hasData(data.random)) {
                this.value = data.value
            }
        }
    }
}