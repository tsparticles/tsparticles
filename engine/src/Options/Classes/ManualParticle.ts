import type { ICoordinatesWithMode } from "../../Core/Interfaces/ICoordinates.js";
import type { IManualParticle } from "../Interfaces/IManualParticle.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Interfaces/Particles/IParticlesOptions.js";
import { PixelMode } from "../../Enums/Modes/PixelMode.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { deepExtend } from "../../Utils/Utils.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { manualDefaultPosition } from "../../Core/Utils/Constants.js";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
    options?: RecursivePartial<IParticlesOptions>;
    position?: ICoordinatesWithMode;

    load(data?: RecursivePartial<IManualParticle>): void {
        if (isNull(data)) {
            return;
        }

        if (data.position) {
            this.position = {
                x: data.position.x ?? manualDefaultPosition,
                y: data.position.y ?? manualDefaultPosition,
                mode: data.position.mode ?? PixelMode.percent,
            };
        }

        if (data.options) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
        }
    }
}
