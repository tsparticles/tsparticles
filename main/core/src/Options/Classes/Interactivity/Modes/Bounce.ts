import type { IBounce } from "../../../Interfaces/Interactivity/Modes/IBounce";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class Bounce implements IBounce, IOptionLoader<IBounce> {
    public distance: number;

    constructor() {
        this.distance = 200;
    }

    public load(data?: RecursivePartial<IBounce>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
