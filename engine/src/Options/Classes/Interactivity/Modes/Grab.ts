import type { IGrab, IOptionLoader } from "../../../Interfaces";
import { GrabLinks } from "./GrabLinks";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Grab implements IGrab, IOptionLoader<IGrab> {
    distance;
    links;

    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }

    load(data?: RecursivePartial<IGrab>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        this.links.load(data.links);
    }
}
