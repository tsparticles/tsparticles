import {ITrail} from "../../../Interfaces/Options/Particles/ITrail";
import {Utils} from "../../Utils/Utils";

export class Trail implements ITrail {
    public enable: boolean;
    public length: number;
    public fillColor: string;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = "#000000";
    }

    public load(data: ITrail): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.fillColor)) {
                this.fillColor = data.fillColor;
            }

            if (Utils.hasData(data.length)) {
                this.length = data.length;
            }
        }
    }
}
