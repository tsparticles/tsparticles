import type { IGrab } from "../../../Interfaces/Interactivity/Modes/IGrab";
import { GrabLinks } from "./GrabLinks";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    public get line_linked(): GrabLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    public set line_linked(value: GrabLinks) {
        this.links = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    public get lineLinked(): GrabLinks {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    public set lineLinked(value: GrabLinks) {
        this.links = value;
    }

    public distance: number;
    public links: GrabLinks;

    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }

    public load(data?: RecursivePartial<IGrab>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
        }
    }
}
