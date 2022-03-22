import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { BubbleBase } from "./BubbleBase";
import type { IBubbleDiv } from "../../../Interfaces/Interactivity/Modes/IBubbleDiv";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    get ids(): SingleOrMultiple<string> {
        return this.selectors instanceof Array
            ? this.selectors.map((t) => t.replace("#", ""))
            : this.selectors.replace("#", "");
    }

    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    set ids(value: SingleOrMultiple<string>) {
        this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
    }

    selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    load(data?: RecursivePartial<IBubbleDiv>): void {
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
