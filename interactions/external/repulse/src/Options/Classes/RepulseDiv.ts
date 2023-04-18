import {
    type IOptionLoader,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
} from "tsparticles-engine";
import type { IRepulseDiv } from "../Interfaces/IRepulseDiv";
import { RepulseBase } from "./RepulseBase";

/**
 */
export class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
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

    load(data?: RecursivePartial<IRepulseDiv>): void {
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
