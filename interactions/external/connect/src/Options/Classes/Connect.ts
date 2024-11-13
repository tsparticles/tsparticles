import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { ConnectLinks } from "./ConnectLinks.js";
import type { IConnect } from "../Interfaces/IConnect.js";

/**
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
        if (isNull(data)) {
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
