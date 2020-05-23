import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import { DivMode } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

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
    public mode: SingleOrMultiple<DivMode | string>;

    constructor() {
        this.elementId = "";
        this.enable = false;
        this.mode = [];
    }

    public load(data?: RecursivePartial<IDivEvent>): void {
        if (data !== undefined) {
            const elementId = data.elementId ?? data.el;

            if (elementId !== undefined) {
                this.elementId = elementId;
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
