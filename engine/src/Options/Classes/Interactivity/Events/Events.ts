import { executeOnSingleOrMultiple, isBoolean } from "../../../../Utils/Utils";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ResizeEvent } from "./ResizeEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Events.md]]
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
        this.resize = new ResizeEvent();
    }

    load(data?: RecursivePartial<IEvents>): void {
        if (!data) {
            return;
        }

        this.onClick.load(data.onClick);

        const onDiv = data.onDiv;

        if (onDiv !== undefined) {
            this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
                const tmp = new DivEvent();

                tmp.load(t);

                return tmp;
            });
        }

        this.onHover.load(data.onHover);

        if (isBoolean(data.resize)) {
            this.resize.enable = data.resize;
        } else {
            this.resize.load(data.resize);
        }
    }
}
