import type { ISpin } from "../../Interfaces/Particles/ISpin";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../Types";
import { Utils } from "../../../Utils";

export class Spin implements ISpin, IOptionLoader<ISpin> {
    public enable;
    public position?: ICoordinates;

    constructor() {
        this.enable = false;
    }

    public load(data?: RecursivePartial<ISpin>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.position = Utils.deepExtend({}, data.position) as ICoordinates | undefined;
    }
}
