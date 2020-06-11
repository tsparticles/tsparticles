import type { IConnect } from "../../../Interfaces/Interactivity/Modes/IConnect";
import { ConnectLinks } from "./ConnectLinks";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    public get line_linked(): ConnectLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    public set line_linked(value: ConnectLinks) {
        this.links = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    public get lineLinked(): ConnectLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    public set lineLinked(value: ConnectLinks) {
        this.links = value;
    }

    public distance: number;
    public links: ConnectLinks;
    public radius: number;

    constructor() {
        this.distance = 80;
        this.links = new ConnectLinks();
        this.radius = 60;
    }

    public load(data?: RecursivePartial<IConnect>): void {
        if (data === undefined) {
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
