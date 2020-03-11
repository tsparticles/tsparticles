import {IRotateAnimation} from "../../../Interfaces/Options/Particles/IRotateAnimation";
import {Utils} from "../../Utils/Utils";

export class RotateAnimation implements IRotateAnimation {
    public enable: boolean;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }

    public load(data: IRotateAnimation): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.speed)) {
                this.speed = data.speed;
            }

            if (Utils.hasData(data.sync)) {
                this.sync = data.sync;
            }
        }
    }
}
