import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import type { IBubbleDiv } from "../../../Interfaces/Interactivity/Modes/IBubbleDiv";
import { BubbleBase } from "./BubbleBase";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    get ids(): SingleOrMultiple<string> {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        } else {
            return this.selectors.replace("#", "");
        }
    }

    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    set ids(value: SingleOrMultiple<string>) {
        if (value instanceof Array) {
            this.selectors = value.map((t) => `#${t}`);
        } else {
            this.selectors = `#${value}`;
        }
    }

    public selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    public load(data?: RecursivePartial<IBubbleDiv>): void {
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
