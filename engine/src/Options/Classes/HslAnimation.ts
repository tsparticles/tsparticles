import { ColorAnimation } from "./ColorAnimation";
import type { IHslAnimation } from "../Interfaces/IHslAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";

export class HslAnimation implements IHslAnimation, IOptionLoader<IHslAnimation> {
    h;
    s;
    l;

    constructor() {
        this.h = new ColorAnimation();
        this.s = new ColorAnimation();
        this.l = new ColorAnimation();
    }

    load(data?: RecursivePartial<IHslAnimation>): void {
        if (!data) {
            return;
        }

        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}
