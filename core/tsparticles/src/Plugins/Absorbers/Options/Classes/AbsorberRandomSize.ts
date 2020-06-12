import type { IAbsorberRandomSize } from "../Interfaces/IAbsorberRandomSize";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class AbsorberRandomSize implements IAbsorberRandomSize {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<IAbsorberRandomSize>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.minimumValue !== undefined) {
                this.minimumValue = data.minimumValue;
            }
        }
    }
}
