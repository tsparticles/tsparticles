import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulseDiv } from "../../../Interfaces/Interactivity/Modes/IRepulseDiv";
import { RepulseBase } from "./RepulseBase";

/**
 * @category Options
 */
export class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    get ids(): SingleOrMultiple<string> {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        } else {
            return this.selectors.replace("#", "");
        }

        // this is the best we can do, if a non-id selector is used the old property won't work
        // but ids is deprecated so who cares.
    }

    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    set ids(value: SingleOrMultiple<string>) {
        if (value instanceof Array) {
            this.selectors = value.map(() => `#${value}`);
        } else {
            this.selectors = `#${value}`;
        }
    }

    selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    load(data?: RecursivePartial<IRepulseDiv>): void {
        super.load(data);

        if (data === undefined) {
            return;
        }

        if (data.ids !== undefined) {
            this.ids = data.ids;
        }

        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
