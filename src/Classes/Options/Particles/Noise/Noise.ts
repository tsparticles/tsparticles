import { INoise } from "../../../../Interfaces/Options/Particles/Noise/INoise";
import { INoiseFactor } from "../../../../Interfaces/Options/Particles/Noise/INoiseFactor";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
import { INoiseValue } from "../../../../Interfaces/Options/Particles/Noise/INoiseValue";

export class NoiseValue implements INoiseValue {
    public value: number;
    public offset: number;

    constructor() {
        this.value = 1;
        this.offset = 0;
    }

    public load(data?: RecursivePartial<INoiseValue>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value === 0 ? this.value : data.value;
            }

            if (data.offset !== undefined) {
                this.offset = data.offset;
            }
        }
    }
}

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

export class Noise implements INoise {
    public enable: boolean;
    public factor: NoiseFactor;

    constructor() {
        this.enable = false;
        this.factor = new NoiseFactor();
    }

    public load(data?: RecursivePartial<INoise>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            this.factor.load(data.factor);
        }
    }
}
