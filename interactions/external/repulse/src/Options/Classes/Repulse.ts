import {
    type IOptionLoader,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
} from "@tsparticles/engine";
import type { IRepulse } from "../Interfaces/IRepulse.js";
import { RepulseBase } from "./RepulseBase.js";
import { RepulseDiv } from "./RepulseDiv.js";

/**
 */
export class Repulse extends RepulseBase implements IRepulse, IOptionLoader<IRepulse> {
    divs?: SingleOrMultiple<RepulseDiv>;

    load(data?: RecursivePartial<IRepulse>): void {
        super.load(data);

        if (!data) {
            return;
        }

        this.divs = executeOnSingleOrMultiple(data.divs, div => {
            const tmp = new RepulseDiv();

            tmp.load(div);

            return tmp;
        });
    }
}
