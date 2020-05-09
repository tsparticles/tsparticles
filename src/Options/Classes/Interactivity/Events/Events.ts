import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Events implements IEvents {
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
    public get ondiv(): DivEvent {
        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    public set ondiv(value: DivEvent) {
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
    public onDiv: DivEvent;
    public onHover: HoverEvent;
    public resize: boolean;

    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }

    public load(data?: RecursivePartial<IEvents>): void {
        if (data !== undefined) {
            this.onClick.load(data.onClick ?? data.onclick);
            this.onDiv.load(data.onDiv ?? data.ondiv);
            this.onHover.load(data.onHover ?? data.onhover);

            if (data.resize !== undefined) {
                this.resize = data.resize;
            }
        }
    }
}
