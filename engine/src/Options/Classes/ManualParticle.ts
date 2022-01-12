import type { IManualParticle, IOptionLoader, IParticlesOptions } from "../Interfaces";
import type {} from "../Interfaces";
import type { RecursivePartial } from "../../Types";
import type { ICoordinates } from "../../Core";
import { deepExtend } from "../../Utils";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticlesOptions>;
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
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
        }
    }
}
