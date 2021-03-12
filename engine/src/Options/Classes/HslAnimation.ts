import { IHslAnimation } from "../Interfaces/IHslAnimation";
import { IOptionLoader } from "../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../Types";
import { ColorAnimation } from "./ColorAnimation";

export class HslAnimation implements IHslAnimation, IOptionLoader<IHslAnimation> {
    public h;
    public s;
    public l;

    constructor() {
        this.h = new ColorAnimation();
        this.s = new ColorAnimation();
        this.l = new ColorAnimation();
    }

    public load(data?: RecursivePartial<IHslAnimation>): void {
        if (!data) {
            return;
        }

        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}
