import type { ITwinkle } from "../../../../Interfaces/Options/Particles/Twinkle/ITwinkle";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ITwinkleValues } from "../../../../Interfaces/Options/Particles/Twinkle/ITwinkleValues";
import { TwinkleValues } from "./TwinkleValues";

export class Twinkle implements ITwinkle {
    public lines: ITwinkleValues;
    public particles: ITwinkleValues;

    constructor() {
        this.lines = new TwinkleValues();
        this.particles = new TwinkleValues();
    }

    public load(data?: RecursivePartial<ITwinkle>): void {
        if (data !== undefined) {
            this.lines.load(data.lines);
            this.particles.load(data.particles);
        }
    }
}
