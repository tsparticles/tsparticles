import type { IGrabLineLinked } from "../../../Interfaces/Interactivity/Modes/IGrabLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class GrabLineLinked implements IGrabLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IGrabLineLinked>): void {
        if (data !== undefined) {
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
