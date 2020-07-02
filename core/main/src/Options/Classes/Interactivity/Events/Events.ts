import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class Events implements IEvents, IOptionLoader<IEvents> {
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    public get onclick(): ClickEvent {
        return this.onClick;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    public set onclick(value: ClickEvent) {
        this.onClick = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    public get ondiv(): SingleOrMultiple<DivEvent> {
        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    public set ondiv(value: SingleOrMultiple<DivEvent>) {
        this.onDiv = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    public get onhover(): HoverEvent {
        return this.onHover;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    public set onhover(value: HoverEvent) {
        this.onHover = value;
    }

    public onClick: ClickEvent;
    public onDiv: SingleOrMultiple<DivEvent>;
    public onHover: HoverEvent;
    public resize: boolean;

    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }

    public load(data?: RecursivePartial<IEvents>): void {
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
