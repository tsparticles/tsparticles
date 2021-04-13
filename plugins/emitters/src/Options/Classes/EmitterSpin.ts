import type { IEmitterSpin } from "../Interfaces/IEmitterSpin";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";
import { RecursivePartial } from "tsparticles-engine/Types";

export class EmitterSpin implements IEmitterSpin, IOptionLoader<IEmitterSpin> {
    enable;

    constructor() {
        this.enable = false;
    }

    load(data?: RecursivePartial<IEmitterSpin>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
