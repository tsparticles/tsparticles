import type { ISpin } from "../../../Interfaces/Particles/ISpin";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types";
import { deepExtend } from "../../../../Utils";

export class Spin implements ISpin, IOptionLoader<ISpin> {
    acceleration;
    enable;
    position?: ICoordinates;

    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }

    load(data?: RecursivePartial<ISpin>): void {
        if (!data) {
            return;
        }

        if (data.acceleration !== undefined) {
            this.acceleration = data.acceleration;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.position = data.position ? (deepExtend({}, data.position) as ICoordinates | undefined) : undefined;
    }
}
