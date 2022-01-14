import { ConnectLinks } from "./ConnectLinks";
import type { IConnect } from "../../../Interfaces/Interactivity/Modes/IConnect";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Connect implements IConnect, IOptionLoader<IConnect> {
    distance;
    links;
    radius;

    constructor() {
        this.distance = 80;
        this.links = new ConnectLinks();
        this.radius = 60;
    }

    load(data?: RecursivePartial<IConnect>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        this.links.load(data.links);

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
