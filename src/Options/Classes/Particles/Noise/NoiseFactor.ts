import type { INoiseFactor } from "../../../Interfaces/Particles/Noise/INoiseFactor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { NoiseValue } from "./NoiseValue";

export class NoiseFactor implements INoiseFactor {
    public horizontal: NoiseValue;
    public vertical: NoiseValue;

    constructor() {
        this.horizontal = new NoiseValue();

        this.horizontal.value = 50;
        this.horizontal.offset = 0;

        this.vertical = new NoiseValue();

        this.vertical.value = 10;
        this.vertical.offset = 40000;
    }

    public load(data?: RecursivePartial<INoiseFactor>): void {
        if (data !== undefined) {
            this.horizontal.load(data.horizontal);
            this.vertical.load(data.vertical);
        }
    }
}