import {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {HoverMode} from "../../../../Enums/Modes/HoverMode";
import {Parallax} from "./Parallax";

export class HoverEvent implements IHoverEvent {
    public enable: boolean;
    public mode: HoverMode | HoverMode[];
    public parallax: Parallax;

    constructor() {
        this.enable = true;
        this.mode = HoverMode.grab;
        this.parallax = new Parallax();
    }
}
