import {IParallax} from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import {Utils} from "../../../Utils/Utils";

export class Parallax implements IParallax {
    public enable: boolean;
    public force: number;
    public smooth: number;

    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }

    public load(data: IParallax): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.force)) {
                this.force = data.force;
            }

            if (Utils.hasData(data.smooth)) {
                this.smooth = data.smooth;
            }
        }
    }
}
