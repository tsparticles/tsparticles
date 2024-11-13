import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks.js";
import type { IGrab } from "../Interfaces/IGrab.js";

/**
 */
export class Grab implements IGrab, IOptionLoader<IGrab> {
    distance;
    links;

    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }

    load(data?: RecursivePartial<IGrab>): void {
        if (isNull(data)) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        this.links.load(data.links);
    }
}
