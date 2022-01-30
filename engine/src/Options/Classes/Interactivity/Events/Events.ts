import type { IEvents, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";

/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export class Events implements IEvents, IOptionLoader<IEvents> {
    onClick;
    onDiv: SingleOrMultiple<DivEvent>;
    onHover;
    resize;

    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }

    load(data?: RecursivePartial<IEvents>): void {
        if (!data) {
            return;
        }

        this.onClick.load(data.onClick);

        const onDiv = data.onDiv;

        if (onDiv instanceof Array) {
            this.onDiv = onDiv.map((div) => {
                const tmp = new DivEvent();

                tmp.load(div);

                return tmp;
            });
        } else {
            this.onDiv = new DivEvent();

            this.onDiv.load(onDiv);
        }

        this.onHover.load(data.onHover);

        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}
