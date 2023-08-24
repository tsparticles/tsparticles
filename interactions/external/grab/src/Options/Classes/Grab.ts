import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks";
import type { IGrab } from "../Interfaces/IGrab";

/**
 */
export class Grab implements IGrab, IOptionLoader<IGrab> {
    distance;
    links;

    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }

    /**
     * @deprecated this property is obsolete, please use the new links
     * @returns the links object
     */
    get lineLinked(): GrabLinks {
        return this.links;
    }

    /**
     * @deprecated this property is obsolete, please use the new links
     * @param value -
     */
    set lineLinked(value: GrabLinks) {
        this.links = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new links
     * @returns the links property
     */
    get line_linked(): GrabLinks {
        return this.links;
    }

    /**
     * @deprecated this property is obsolete, please use the new links
     * @param value -
     */
    set line_linked(value: GrabLinks) {
        this.links = value;
    }

    load(data?: RecursivePartial<IGrab>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
    }
}
