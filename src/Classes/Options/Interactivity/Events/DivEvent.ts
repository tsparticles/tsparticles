import {IDivEvent} from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import {DivMode} from "../../../../Enums/Modes/DivMode";

export class DivEvent implements IDivEvent {
    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     */
    public get el(): string {
        return this.elementId;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     * @param value
     */
    public set el(value:string) {
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
