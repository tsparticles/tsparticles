import type { IConnectLinks } from "../../../Interfaces/Interactivity/Modes/IConnectLinks";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class ConnectLinks implements IConnectLinks {
    public opacity: number;

    constructor() {
        this.opacity = 0.5;
    }

    public load(data?: RecursivePartial<IConnectLinks>): void {
        if (!(data !== undefined && data.opacity !== undefined)) {
            return;
        }

        this.opacity = data.opacity;
    }
}
