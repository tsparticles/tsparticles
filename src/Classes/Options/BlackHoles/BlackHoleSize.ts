import type { IBlackHoleSize } from "../../../Interfaces/Options/BlackHoles/IBlackHoleSize";
import type { IBlackHoleRandomSize } from "../../../Interfaces/Options/BlackHoles/IBlackHoleRandomSize";
import { BlackHoleRandomSize } from "./BlackHoleRandomSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class BlackHoleSize implements IBlackHoleSize {
    public random: IBlackHoleRandomSize;
    public value: number;
    public limit?: number;

    constructor() {
        this.value = 50;
        this.random = new BlackHoleRandomSize();
    }

    public load(data?: RecursivePartial<IBlackHoleSize>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value;
            }

            if (data.random !== undefined) {
                if (typeof data.random === "boolean") {
                    this.random.load({ enable: data.random });
                } else {
                    this.random.load(data.random);
                }
            }

            if (data.limit !== undefined) {
                this.limit = data.limit;
            }
        }
    }
}