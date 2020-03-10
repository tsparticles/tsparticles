import {IStroke} from "../../../../Interfaces/Options/Shape/IStroke";
import {Utils} from "../../../Utils/Utils";

export class Stroke implements IStroke {
    public color: string;
    public width: number;

    constructor() {
        this.color = "#ff0000";
        this.width = 0;
    }

    public load(data: IStroke): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.color)) {
                this.color = data.color;
            }

            if (Utils.hasData(data.width)) {
                this.width = data.width;
            }
        }
    }
}
