import type { ITwinkle } from "../../../Interfaces/Particles/Twinkle/ITwinkle";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { TwinkleValues } from "./TwinkleValues";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class Twinkle implements ITwinkle, IOptionLoader<ITwinkle> {
    public lines: TwinkleValues;
    public particles: TwinkleValues;

    constructor() {
        this.lines = new TwinkleValues();
        this.particles = new TwinkleValues();
    }

    public load(data?: RecursivePartial<ITwinkle>): void {
        if (data === undefined) {
            return;
        }

        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
