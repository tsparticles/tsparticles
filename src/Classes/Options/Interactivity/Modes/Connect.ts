import {IConnect} from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import {ConnectLineLinked} from "./ConnectLineLinked";
import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";

export class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IConnectLineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IConnectLineLinked) {
        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: IConnectLineLinked;
    public radius: number;

    constructor() {
        this.distance = 80;
        this.lineLinked = new ConnectLineLinked();
        this.radius = 60;
    }
}
