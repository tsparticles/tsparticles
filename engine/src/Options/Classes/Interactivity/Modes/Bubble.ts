import type { IBubble, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { BubbleBase } from "./BubbleBase";
import { BubbleDiv } from "./BubbleDiv";

/**
 * @category Options
 */
export class Bubble extends BubbleBase implements IBubble, IOptionLoader<IBubble> {
    divs?: SingleOrMultiple<BubbleDiv>;

    load(data?: RecursivePartial<IBubble>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new BubbleDiv();

                tmp.load(s);

                return tmp;
            });
        } else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new BubbleDiv();
            }

            this.divs.load(data.divs);
        }
    }
}
