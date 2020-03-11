import {IRepulse} from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";
import {Utils} from "../../../Utils/Utils";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data: IRepulse): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.distance)) {
                this.distance = data.distance;
            }

            if (Utils.hasData(data.duration)) {
                this.duration = data.duration;
            }
        }
    }
}
