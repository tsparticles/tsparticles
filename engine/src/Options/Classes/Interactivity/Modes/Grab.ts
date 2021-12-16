import type { IGrab } from "../../../Interfaces/Interactivity/Modes/IGrab";
import { GrabLinks } from "./GrabLinks";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

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
        if (data === undefined) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        this.links.load(data.links);
    }
}
