import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates";
import type { IManualParticle } from "../Interfaces/IManualParticle";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../Interfaces/Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { deepExtend } from "../../Utils/Utils";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;

    load(data?: RecursivePartial<IManualParticle>): void {
        if (!data) {
            return;
        }

        if (data.position) {
            this.position = deepExtend({}, data.position) as ICoordinatesWithMode | undefined;
        }

        if (data.options) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
        }
    }
}
