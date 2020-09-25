import type { IValueWithRandom } from "../Interfaces/IValueWithRandom";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Random } from "./Random";
import type { RecursivePartial } from "../../Types";

export abstract class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    public random: Random;
    public value: number;

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
            this.value = data.value;
        }
    }
}
