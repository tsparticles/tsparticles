import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";

export class ConnectLineLinked implements IConnectLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 0.5;
    }

    public load(data: IConnectLineLinked): void {
        this.opacity = data.opacity;
    }
}
