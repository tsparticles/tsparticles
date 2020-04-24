import type { IAbsorberSize } from "../../../Interfaces/Options/Absorbers/IAbsorberSize";
import type { IAbsorberRandomSize } from "../../../Interfaces/Options/Absorbers/IAbsorberRandomSize";
import { AbsorberRandomSize } from "./AbsorberRandomSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class AbsorberSize implements IAbsorberSize {
    public random: IAbsorberRandomSize;
    public value: number;
    public limit?: number;

    constructor() {
        this.value = 50;
        this.random = new AbsorberRandomSize();
    }

    public load(data?: RecursivePartial<IAbsorberSize>): void {
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