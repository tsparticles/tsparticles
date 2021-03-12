import type { IOutModes } from "../../../Interfaces/Particles/Move/IOutModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OutMode, OutModeAlt } from "../../../../Enums/Modes";
import type { RecursivePartial } from "../../../../Types";

export class OutModes implements IOutModes, IOptionLoader<IOutModes> {
    public bottom?: OutMode | keyof typeof OutMode | OutModeAlt;
    public default: OutMode | keyof typeof OutMode | OutModeAlt;
    public left?: OutMode | keyof typeof OutMode | OutModeAlt;
    public right?: OutMode | keyof typeof OutMode | OutModeAlt;
    public top?: OutMode | keyof typeof OutMode | OutModeAlt;

    constructor() {
        this.default = OutMode.out;
    }

    public load(data?: RecursivePartial<IOutModes>): void {
        if (!data) {
            return;
        }

        if (data.default !== undefined) {
            this.default = data.default;
        }

        this.bottom = data.bottom ?? data.default;
        this.left = data.left ?? data.default;
        this.right = data.right ?? data.default;
        this.top = data.top ?? data.default;
    }
}
