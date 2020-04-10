import type {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {ClickMode} from "../../../../Enums/Modes/ClickMode";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";

export class ClickEvent implements IClickEvent {
    /**
     * The click event handler enabling setting
     */
    public enable: boolean;

    /**
     * Click mode values described in [[ClickMode]], an array of these values is also valid
     */
    public mode: ClickMode | ClickMode[];

    constructor() {
        this.enable = false;
        this.mode = [];
    }

    public load(data?: RecursivePartial<IClickEvent>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}
