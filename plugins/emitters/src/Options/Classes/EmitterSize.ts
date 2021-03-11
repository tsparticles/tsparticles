import type { IEmitterSize } from "../Interfaces/IEmitterSize";
import type { RecursivePartial } from "tsparticles-engine/Types";
import { SizeMode } from "tsparticles-engine/Enums";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";

/**
 * @category Emitters Plugin
 */
export class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    public mode: SizeMode | keyof typeof SizeMode;
    public height;
    public width;

    public constructor() {
        this.mode = SizeMode.percent;
        this.height = 0;
        this.width = 0;
    }

    public load(data?: RecursivePartial<IEmitterSize>): void {
        if (data === undefined) {
            return;
        }

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
