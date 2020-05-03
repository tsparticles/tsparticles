import type { IAbsorberSize } from "../../Interfaces/Absorbers/IAbsorberSize";
import { AbsorberRandomSize } from "./AbsorberRandomSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class AbsorberSize implements IAbsorberSize {
    public density: number;
    public limit?: number;
    public random: AbsorberRandomSize;
    public value: number;

    constructor() {
        this.density = 5;
        this.random = new AbsorberRandomSize();
        this.value = 50;
    }

    public load(data?: RecursivePartial<IAbsorberSize>): void {
        if (data !== undefined) {
            if (data.density !== undefined) {
                this.density = data.density;
            }
            
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
