import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import type { IBubbleDiv } from "../Interfaces/IBubbleDiv.js";

/**
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
