import { ConnectLinks } from "./ConnectLinks";
import type { IConnect } from "../../../Interfaces/Interactivity/Modes/IConnect";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class Connect implements IConnect, IOptionLoader<IConnect> {
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get line_linked(): ConnectLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set line_linked(value: ConnectLinks) {
        this.links = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get lineLinked(): ConnectLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set lineLinked(value: ConnectLinks) {
        this.links = value;
    }

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

        this.links.load(data.links ?? data.lineLinked ?? data.line_linked);

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
