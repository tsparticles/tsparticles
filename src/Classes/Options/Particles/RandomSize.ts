import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IRandomSize } from "../../../Interfaces/Options/Particles/IRandomSize";

export class RandomSize implements IRandomSize {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<IRandomSize> | undefined): void {
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
