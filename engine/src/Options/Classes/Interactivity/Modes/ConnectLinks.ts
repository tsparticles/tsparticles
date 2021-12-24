import type { IConnectLinks } from "../../../Interfaces/Interactivity/Modes/IConnectLinks";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class ConnectLinks implements IConnectLinks, IOptionLoader<IConnectLinks> {
    opacity;

    constructor() {
        this.opacity = 0.5;
    }

    load(data?: RecursivePartial<IConnectLinks>): void {
        if (!data) {
            return;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
