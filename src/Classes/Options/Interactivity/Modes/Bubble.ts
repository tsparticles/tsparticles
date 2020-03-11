import {IBubble} from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";
import {Utils} from "../../../Utils/Utils";

export class Bubble implements IBubble {
    public distance: number;
    public duration: number;
    public opacity: number;
    public size: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.opacity = 1;
        this.size = 80;
    }

    public load(data: IBubble): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.distance)) {
                this.distance = data.distance;
            }

            if (Utils.hasData(data.duration)) {
                this.duration = data.duration;
            }

            if (Utils.hasData(data.opacity)) {
                this.opacity = data.opacity;
            }

            if (Utils.hasData(data.size)) {
                this.size = data.size;
            }
        }
    }
}
