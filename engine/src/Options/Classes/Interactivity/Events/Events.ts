import { ClickEvent } from "./ClickEvent.js";
import { DivEvent } from "./DivEvent.js";
import { HoverEvent } from "./HoverEvent.js";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ResizeEvent } from "./ResizeEvent.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { executeOnSingleOrMultiple } from "../../../../Utils/Utils.js";

/**
 * [[include:Options/Interactivity/Events.md]]
 */
export class Events implements IEvents, IOptionLoader<IEvents> {
    readonly onClick;
    onDiv: SingleOrMultiple<DivEvent>;
    readonly onHover;
    readonly resize;

    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = new ResizeEvent();
    }

    load(data?: RecursivePartial<IEvents>): void {
        if (!data) {
            return;
        }

        this.onClick.load(data.onClick);

        const onDiv = data.onDiv;

        if (onDiv !== undefined) {
            this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
                const tmp = new DivEvent();

                tmp.load(t);

                return tmp;
            });
        }

        this.onHover.load(data.onHover);
        this.resize.load(data.resize);
    }
}
