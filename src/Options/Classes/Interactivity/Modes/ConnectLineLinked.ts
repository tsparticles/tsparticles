import type { IConnectLineLinked } from "../../../Interfaces/Interactivity/Modes/IConnectLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class ConnectLineLinked implements IConnectLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 0.5;
    }

    public load(data?: RecursivePartial<IConnectLineLinked>): void {
        if (data !== undefined) {
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
