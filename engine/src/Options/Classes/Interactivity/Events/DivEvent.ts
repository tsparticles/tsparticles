import type { DivMode } from "../../../../Enums/Modes/DivMode";
import { DivType } from "../../../../Enums/Types/DivType";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { executeOnSingleOrMultiple } from "../../../../Utils/Utils";

/**
 * [[include:Options/Interactivity/Div.md]]
 * @category Options
 */
export class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    /**
     * The div event handler enabling mode
     */
    enable;

    /**
     * Div mode values described in [[DivMode]], an array of these values is also valid.
     */
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;

    selectors: SingleOrMultiple<string>;

    type: DivType | keyof typeof DivType;

    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = DivType.circle;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     */
    get el(): SingleOrMultiple<string> {
        return this.elementId;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     * @param value
     */
    set el(value: SingleOrMultiple<string>) {
        this.elementId = value;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     */
    get elementId(): SingleOrMultiple<string> {
        return this.ids;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     * @param value
     */
    set elementId(value: SingleOrMultiple<string>) {
        this.ids = value;
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     */
    get ids(): SingleOrMultiple<string> {
        return executeOnSingleOrMultiple(this.selectors, (t) => t.replace("#", ""));

        // this is the best we can do, if a non-id selector is used the old property won't work
        // but ids is deprecated so who cares.
    }

    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     * @param value
     */
    set ids(value: SingleOrMultiple<string>) {
        this.selectors = executeOnSingleOrMultiple(value, (t) => `#${t}`);
    }

    load(data?: RecursivePartial<IDivEvent>): void {
        if (!data) {
            return;
        }

        const ids = data.ids ?? data.elementId ?? data.el;

        if (ids !== undefined) {
            this.ids = ids;
        }

        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
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
