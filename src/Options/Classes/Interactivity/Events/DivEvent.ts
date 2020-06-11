import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import { DivMode, DivType } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export class DivEvent implements IDivEvent {
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     */
    get elementId(): SingleOrMultiple<string> {
        return this.ids;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     * @param value
     */
    set elementId(value: SingleOrMultiple<string>) {
        this.ids = value;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     */
    public get el(): SingleOrMultiple<string> {
        return this.elementId;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     * @param value
     */
    public set el(value: SingleOrMultiple<string>) {
        this.elementId = value;
    }

    /**
     * The element id to detect the event
     */
    public ids: SingleOrMultiple<string>;

    /**
     * The div event handler enabling mode
     */
    public enable: boolean;

    /**
     * Div mode values described in [[DivMode]], an array of these values is also valid.
     */
    public mode: SingleOrMultiple<DivMode | string>;

    public type: DivType;

    constructor() {
        this.ids = [];
        this.enable = false;
        this.mode = [];
        this.type = DivType.circle;
    }

    public load(data?: RecursivePartial<IDivEvent>): void {
        if (data === undefined) {
            return;
        }

        const ids = data.ids ?? data.elementId ?? data.el;

        if (ids !== undefined) {
            this.ids = ids;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
