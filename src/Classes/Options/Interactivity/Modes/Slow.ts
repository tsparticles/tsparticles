import {ISlow} from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";
import {Utils} from "../../../Utils/Utils";

export class Slow implements ISlow {
    public active: boolean;
    public factor: number;
    public radius: number;

    constructor() {
        this.active = false;
        this.factor = 1;
        this.radius = 0;
    }

    public load(data: ISlow): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.active)) {
                this.active = data.active;
            }

            if (Utils.hasData(data.factor)) {
                this.factor = data.factor;
            }

            if (Utils.hasData(data.radius)) {
                this.radius = data.radius;
            }
        }
    }
}
