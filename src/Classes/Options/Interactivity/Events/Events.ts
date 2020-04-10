import type {IEvents} from "../../../../Interfaces/Options/Interactivity/Events/IEvents";
import {ClickEvent} from "./ClickEvent";
import type {IDivEvent} from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import type {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {DivEvent} from "./DivEvent";
import {HoverEvent} from "./HoverEvent";
import type {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Events implements IEvents {
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    public get onclick(): IClickEvent {
        return this.onClick;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    public set onclick(value: IClickEvent) {
        this.onClick = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    public get ondiv(): IDivEvent {
        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    public set ondiv(value: IDivEvent) {
        this.onDiv = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    public get onhover(): IHoverEvent {
        return this.onHover;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    public set onhover(value: IHoverEvent) {
        this.onHover = value;
    }

    public onClick: IClickEvent;
    public onDiv: IDivEvent;
    public onHover: IHoverEvent;
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
