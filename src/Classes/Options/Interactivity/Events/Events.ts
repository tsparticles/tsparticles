import {IEvents} from "../../../../Interfaces/Options/Interactivity/Events/IEvents";
import {ClickEvent} from "./ClickEvent";
import {IDivEvent} from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {DivEvent} from "./DivEvent";
import {HoverEvent} from "./HoverEvent";
import {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {Messages} from "../../../Utils/Messages";

export class Events implements IEvents {
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    public get onclick(): IClickEvent {
        Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

        return this.onClick;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    public set onclick(value: IClickEvent) {
        Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

        this.onClick = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    public get ondiv(): IDivEvent {
        Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    public set ondiv(value: IDivEvent) {
        Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

        this.onDiv = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    public get onhover(): IHoverEvent {
        Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

        return this.onHover;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    public set onhover(value: IHoverEvent) {
        Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

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

    public load(data: IEvents): void {
        this.onClick.load(data.onClick);
        this.onDiv.load(data.onDiv);
        this.onHover.load(data.onHover);
        this.resize = data.resize;
    }
}
