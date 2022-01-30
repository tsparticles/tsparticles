import type { IBubbleDiv, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { BubbleBase } from "./BubbleBase";

/**
 * @category Options
 */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
    selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    load(data?: RecursivePartial<IBubbleDiv>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
