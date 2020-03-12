import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";
import {Utils} from "../../../Utils/Utils";

export class ConnectLineLinked implements IConnectLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 0.5;
    }

    public load(data: IConnectLineLinked): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.opacity)) {
                this.opacity = data.opacity;
            }
        }
    }
}
