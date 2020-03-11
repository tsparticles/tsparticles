import {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {ClickMode} from "../../../../Enums/Modes/ClickMode";
import {Utils} from "../../../Utils/Utils";

export class ClickEvent implements IClickEvent {
    public enable: boolean;
    public mode: ClickMode | ClickMode[];

    constructor() {
        this.enable = true;
        this.mode = ClickMode.push;
    }

    public load(data: IClickEvent): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.mode)) {
                this.mode = data.mode;
            }
        }
    }
}
