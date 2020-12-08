import type { IManualParticle } from "../Interfaces/IManualParticle";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";
import type { IParticles } from "../Interfaces/Particles/IParticles";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { deepExtend } from "../../Utils";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    public options?: RecursivePartial<IParticles>;
    public position?: ICoordinates;

    public load(data?: RecursivePartial<IManualParticle>): void {
        if (!data) {
            return;
        }

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x ?? 50,
                y: data.position.y ?? 50,
            };
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticles>;
        }
    }
}
