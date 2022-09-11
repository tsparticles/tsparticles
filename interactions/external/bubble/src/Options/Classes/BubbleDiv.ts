import type { IOptionLoader, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import { BubbleBase } from "./BubbleBase";
import type { IBubbleDiv } from "../Interfaces/IBubbleDiv";
import { executeOnSingleOrMultiple } from "tsparticles-engine";

/**
 * @category Options
 */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
    selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    get ids(): SingleOrMultiple<string> {
        return executeOnSingleOrMultiple(this.selectors, (t) => t.replace("#", ""));
    }

    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    set ids(value: SingleOrMultiple<string>) {
        this.selectors = executeOnSingleOrMultiple(value, (t) => `#${t}`);
    }

    load(data?: RecursivePartial<IBubbleDiv>): void {
        super.load(data);

        if (!data) {
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
