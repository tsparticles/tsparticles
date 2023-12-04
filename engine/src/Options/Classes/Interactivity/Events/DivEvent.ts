import { DivType } from "../../../../Enums/Types/DivType.js";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    /**
     * The div event handler enabling mode
     */
    enable;

    /**
     * Div mode values used by the event
     */
    mode: SingleOrMultiple<string>;

    selectors: SingleOrMultiple<string>;

    type: DivType | keyof typeof DivType;

    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = DivType.circle;
    }

    load(data?: RecursivePartial<IDivEvent>): void {
        if (!data) {
            return;
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
