import {ILineLinkedShadow} from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import {Utils} from "../../Utils/Utils";

export class LineLinkedShadow implements ILineLinkedShadow {
    public blur: number;
    public color: string;
    public enable: boolean;

    constructor() {
        this.blur = 5;
        this.color = "lime";
        this.enable = false;
    }

    public load(data: ILineLinkedShadow): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.blur)) {
                this.blur = data.blur;
            }

            if (Utils.hasData(data.color)) {
                this.color = data.color;
            }

            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }
        }
    }
}