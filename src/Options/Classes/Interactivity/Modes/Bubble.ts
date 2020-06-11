import type { IBubble } from "../../../Interfaces/Interactivity/Modes/IBubble";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { BubbleDiv } from "./BubbleDiv";
import { BubbleBase } from "./BubbleBase";

export class Bubble extends BubbleBase implements IBubble {
    public divs?: SingleOrMultiple<BubbleDiv>;

    public load(data?: RecursivePartial<IBubble>): void {
        super.load(data);

        if (!(data !== undefined && data.divs !== undefined)) {
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
