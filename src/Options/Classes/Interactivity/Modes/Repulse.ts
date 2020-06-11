import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { RepulseDiv } from "./RepulseDiv";
import { RepulseBase } from "./RepulseBase";

export class Repulse extends RepulseBase implements IRepulse {
    public divs?: SingleOrMultiple<RepulseDiv>;

    public load(data?: RecursivePartial<IRepulse>): void {
        super.load(data);

        if (data?.divs === undefined) {
            return;
        }

        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new RepulseDiv();

                tmp.load(s);

                return tmp;
            });
        } else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new RepulseDiv();
            }

            this.divs.load(data.divs);
        }
    }
}
