import {IDivEvent} from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import {DivMode} from "../../../../Enums/Modes/DivMode";
import {Messages} from "../../../Utils/Messages";

export class DivEvent implements IDivEvent {
    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     */
    public get el(): string {
        Messages.deprecated("interactivity.events.onDiv.detect_on", "interactivity.events.onDiv.detectsOn");

        return this.elementId;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     * @param value
     */
    public set el(value: string) {
        Messages.deprecated("interactivity.events.onDiv.detect_on", "interactivity.events.onDiv.detectsOn");

        this.elementId = value;
    }

    public elementId: string;
    public enable: boolean;
    public mode: DivMode | DivMode[];

    constructor() {
        this.elementId = "repulse-div";
        this.enable = false;
        this.mode = DivMode.repulse;
    }
}
