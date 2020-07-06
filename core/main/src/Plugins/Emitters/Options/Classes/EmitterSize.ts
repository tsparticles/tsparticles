import type { IEmitterSize } from "../Interfaces/IEmitterSize";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SizeMode } from "../../../../Enums";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    public mode: SizeMode | keyof typeof SizeMode;
    public height: number;
    public width: number;

    public constructor() {
        this.mode = SizeMode.percent;
        this.height = 0;
        this.width = 0;
    }

    public load(data?: RecursivePartial<IEmitterSize>): void {
        if (data !== undefined) {
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }

            if (data.height !== undefined) {
                this.height = data.height;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
