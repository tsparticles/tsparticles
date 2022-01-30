import type { IOptionLoader, IRepulseDiv } from "../../../Interfaces";
import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { RepulseBase } from "./RepulseBase";

/**
 * @category Options
 */
export class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
    selectors: SingleOrMultiple<string>;

    constructor() {
        super();

        this.selectors = [];
    }

    load(data?: RecursivePartial<IRepulseDiv>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
