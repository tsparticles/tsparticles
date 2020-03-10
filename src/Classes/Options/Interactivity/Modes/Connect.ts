import {IConnect} from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import {ConnectLineLinked} from "./ConnectLineLinked";
import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";
import {Messages} from "../../../Utils/Messages";
import {Utils} from "../../../Utils/Utils";

export class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IConnectLineLinked {
        Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IConnectLineLinked) {
        Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

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

    public load(data: IConnect): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.distance)) {
                this.distance = data.distance;
            }

            this.lineLinked.load(data.lineLinked ?? data.line_linked);

            if (Utils.hasData(data.radius)) {
                this.radius = data.radius;
            }
        }
    }
}
