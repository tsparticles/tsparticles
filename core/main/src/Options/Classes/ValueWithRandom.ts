import type { IValueWithRandom } from "../Interfaces/IValueWithRandom";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Random } from "./Random";
import type { RangeValue, RecursivePartial } from "../../Types";

export abstract class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    public random: Random;
    public value: RangeValue;

    protected constructor() {
        this.random = new Random();
        this.value = 0;
    }

    public load(data?: RecursivePartial<IValueWithRandom>): void {
        if (!data) {
            return;
        }

        if (typeof data.random === "boolean") {
            this.random.enable = data.random;
        } else {
            this.random.load(data.random);
        }

        if (data.value !== undefined) {
            if (typeof data.value === "number") {
                if (!this.random.enable) {
                    this.value = data.value;
                } else {
                    this.value = {
                        min: Math.min(this.random.minimumValue, data.value ?? 0),
                        max: Math.max(this.random.minimumValue, data.value ?? 0),
                    };
                }
            } else {
                if (!this.random.enable) {
                    this.value = {
                        min: Math.min(data.value.min ?? 0, data.value.max ?? 0),
                        max: Math.max(data.value.min ?? 0, data.value.max ?? 0),
                    };
                } else {
                    this.value = {
                        min: Math.min(this.random.minimumValue, data.value.min ?? 0, data.value.max ?? 0),
                        max: Math.max(this.random.minimumValue, data.value.min ?? 0, data.value.max ?? 0),
                    };
                }
            }
        }
    }
}
