import {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import {Utils} from "../../../Utils/Utils";

export class GrabLineLinked implements IGrabLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 1;
    }

    public load(data: IGrabLineLinked): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.opacity)) {
                this.opacity = data.opacity;
            }
        }
    }
}
