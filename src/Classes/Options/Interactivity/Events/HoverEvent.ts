import {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {HoverMode} from "../../../../Enums/Modes/HoverMode";
import {Parallax} from "./Parallax";
import {IParallax} from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import {Utils} from "../../../Utils/Utils";

export class HoverEvent implements IHoverEvent {
    public enable: boolean;
    public mode: HoverMode | HoverMode[];
    public parallax: IParallax;

    constructor() {
        this.enable = true;
        this.mode = HoverMode.grab;
        this.parallax = new Parallax();
    }

    public load(data: IHoverEvent): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.mode)) {
                this.mode = data.mode;
            }

            this.parallax.load(data.parallax);
        }
    }
}
