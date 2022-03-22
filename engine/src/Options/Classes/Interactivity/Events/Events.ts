import type { RecursivePartial, SingleOrMultiple } from "../../../../Types";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export class Events implements IEvents, IOptionLoader<IEvents> {
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
        if (data === undefined) {
            return;
        }

        this.onClick.load(data.onClick ?? data.onclick);

        const onDiv = data.onDiv ?? data.ondiv;

        if (onDiv !== undefined) {
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
        }

        this.onHover.load(data.onHover ?? data.onhover);

        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}
