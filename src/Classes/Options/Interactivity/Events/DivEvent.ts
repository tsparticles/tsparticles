import type { IDivEvent } from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import { DivMode } from "../../../../Enums/Modes/DivMode";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class DivEvent implements IDivEvent {
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new elementId
     */
    public get el(): string {
        return this.elementId;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new elementId
     * @param value
     */
    public set el(value: string) {
        this.elementId = value;
    }

    /**
     * The element id to detect the event
     */
    public elementId: string;

    /**
     * The div event handler enabling mode
     */
    public enable: boolean;

    /**
     * Div mode values described in [[DivMode]], an array of these values is also valid.
     */
    public mode: DivMode | DivMode[];

    constructor() {
        this.elementId = "repulse-div";
        this.enable = false;
        this.mode = DivMode.repulse;
    }

    public load(data?: RecursivePartial<IDivEvent>): void {
        if (data !== undefined) {
            if (data.elementId !== undefined) {
                this.elementId = data.elementId;
            } else if (data.el !== undefined) {
                this.el = data.el;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}
