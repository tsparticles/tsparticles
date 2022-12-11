import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ResizeEvent } from "./ResizeEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { executeOnSingleOrMultiple } from "../../../../Utils/Utils";

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
        this.resize = new ResizeEvent();
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    get onclick(): ClickEvent {
        return this.onClick;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    set onclick(value: ClickEvent) {
        this.onClick = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    get ondiv(): SingleOrMultiple<DivEvent> {
        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    set ondiv(value: SingleOrMultiple<DivEvent>) {
        this.onDiv = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    get onhover(): HoverEvent {
        return this.onHover;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    set onhover(value: HoverEvent) {
        this.onHover = value;
    }

    load(data?: RecursivePartial<IEvents>): void {
        if (!data) {
            return;
        }

        this.onClick.load(data.onClick ?? data.onclick);

        const onDiv = data.onDiv ?? data.ondiv;

        if (onDiv !== undefined) {
            this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
                const tmp = new DivEvent();

                tmp.load(t);

                return tmp;
            });
        }

        this.onHover.load(data.onHover ?? data.onhover);

        if (typeof data.resize === "boolean") {
            this.resize.enable = data.resize;
        } else {
            this.resize.load(data.resize);
        }
    }
}
