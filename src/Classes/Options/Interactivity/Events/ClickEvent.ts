import {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {ClickMode} from "../../../../Enums/Modes/ClickMode";

export class ClickEvent implements IClickEvent {
    public enable: boolean;
    public mode: ClickMode | ClickMode[];

    constructor() {
        this.enable = true;
        this.mode = ClickMode.push;
    }

    public load(data: IClickEvent): void {
        this.enable = data.enable;
        this.mode = data.mode;
    }
}
