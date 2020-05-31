import type { ILinks } from "../../../Interfaces/Particles/Links/ILinks";
import { LinksShadow } from "./LinksShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { LinksTriangle } from "./LinksTriangle";
import { OptionsColor } from "../../OptionsColor";

export class Links implements ILinks {
    public id?: string;
    public blink: boolean;
    public color: OptionsColor;
    public consent: boolean;
    public distance: number;
    public enable: boolean;
    public opacity: number;
    public shadow: LinksShadow;
    public triangles: LinksTriangle;
    public width: number;
    public warp: boolean;

    constructor() {
        this.blink = false;
        this.color = new OptionsColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.opacity = 1;
        this.shadow = new LinksShadow();
        this.triangles = new LinksTriangle();
        this.width = 1;
        this.warp = false;
    }

    public load(data?: RecursivePartial<ILinks>): void {
        if (data !== undefined) {
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
}
