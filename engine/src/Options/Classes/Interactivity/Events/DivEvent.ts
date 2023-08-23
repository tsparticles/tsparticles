import type { DivMode } from "../../../../Enums/Modes/DivMode";
import { DivType } from "../../../../Enums/Types/DivType";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    /**
     * The div event handler enabling mode
     */
    enable;

    /**
     * Div mode values described in {@link DivMode}, an array of these values is also valid.
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
