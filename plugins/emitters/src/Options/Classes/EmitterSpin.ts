import type { IEmitterSpin } from "../Interfaces/IEmitterSpin";
import type { IOptionLoader } from "tsparticles-core/Options/Interfaces/IOptionLoader";
import { RecursivePartial } from "tsparticles-core/Types";

export class EmitterSpin implements IEmitterSpin, IOptionLoader<IEmitterSpin> {
    public enable;

    constructor() {
        this.enable = false;
    }

    public load(data?: RecursivePartial<IEmitterSpin>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
