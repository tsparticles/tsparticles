import type { ILinks } from "../../../Interfaces/Particles/Links/ILinks";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LinksShadow } from "./LinksShadow";
import { LinksTriangle } from "./LinksTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";

/**
 * [[include:Options/Particles/Links.md]]
 * @category Options
 */
export class Links implements ILinks, IOptionLoader<ILinks> {
    blink;
    color;
    consent;
    distance;
    enable;
    frequency;
    id?: string;
    opacity;
    shadow;
    triangles;
    width;
    warp;

    constructor() {
        this.blink = false;
        this.color = new OptionsColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new LinksShadow();
        this.triangles = new LinksTriangle();
        this.width = 1;
        this.warp = false;
    }

    load(data?: RecursivePartial<ILinks>): void {
        if (data === undefined) {
            return;
        }

        if (data.id !== undefined) {
            this.id = data.id;
        }

        if (data.blink !== undefined) {
            this.blink = data.blink;
        }

        this.color = OptionsColor.create(this.color, data.color);

        if (data.consent !== undefined) {
            this.consent = data.consent;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);

        if (data.width !== undefined) {
            this.width = data.width;
        }

        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
