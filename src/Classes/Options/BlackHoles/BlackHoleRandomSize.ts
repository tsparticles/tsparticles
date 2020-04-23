import type { IBlackHoleRandomSize } from "../../../Interfaces/Options/BlackHoles/IBlackHoleRandomSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class BlackHoleRandomSize implements IBlackHoleRandomSize {
    public enable: boolean;
    public minimumValue: number;

    constructor() {
        this.enable = false;
        this.minimumValue = 1;
    }

    public load(data?: RecursivePartial<IBlackHoleRandomSize>): void {
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
