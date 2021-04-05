import type { IManualParticle } from "../Interfaces/IManualParticle";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";
import type { IParticles } from "../Interfaces/Particles/IParticles";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { Utils } from "../../Utils";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticles>;
    position?: ICoordinates;

    load(data?: RecursivePartial<IManualParticle>): void {
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
            this.options = Utils.deepExtend({}, data.options) as RecursivePartial<IParticles>;
        }
    }
}
