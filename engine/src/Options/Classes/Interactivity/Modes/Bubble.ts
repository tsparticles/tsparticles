import { BubbleBase } from "./BubbleBase";
import { BubbleDiv } from "./BubbleDiv";
import type { IBubble } from "../../../Interfaces/Interactivity/Modes/IBubble";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

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
