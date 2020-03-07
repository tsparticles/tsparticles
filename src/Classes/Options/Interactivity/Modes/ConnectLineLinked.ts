import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";

export class ConnectLineLinked implements IConnectLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 0.5;
    }
}
