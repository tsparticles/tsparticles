import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import type { IRepulseDiv } from "../../../Interfaces/Interactivity/Modes/IRepulseDiv";
import { RepulseBase } from "./RepulseBase";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

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

        if (data === undefined) {
            return;
        }

        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
