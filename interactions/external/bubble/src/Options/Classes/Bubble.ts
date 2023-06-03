import {
    type IOptionLoader,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
} from "tsparticles-engine";
import { BubbleBase } from "./BubbleBase";
import { BubbleDiv } from "./BubbleDiv";
import type { IBubble } from "../Interfaces/IBubble";

/**
 */
export class Bubble extends BubbleBase implements IBubble, IOptionLoader<IBubble> {
    divs?: SingleOrMultiple<BubbleDiv>;

    load(data?: RecursivePartial<IBubble>): void {
        super.load(data);

        if (!data) {
            return;
        }

        this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
            const tmp = new BubbleDiv();

            tmp.load(div);

            return tmp;
        });
    }
}
