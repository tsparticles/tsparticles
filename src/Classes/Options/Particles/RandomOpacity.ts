import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IRandomOpacity } from "../../../Interfaces/Options/Particles/IRandomOpacity";

export class RandomOpacity implements IRandomOpacity {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<IRandomOpacity> | undefined): void {
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
