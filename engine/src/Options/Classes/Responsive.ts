import type { IResponsive } from "../Interfaces/IResponsive";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";
import type { IOptions } from "../Interfaces/IOptions";
import { Utils } from "../../Utils";

export class Responsive implements IResponsive, IOptionLoader<IResponsive> {
    public maxWidth: number;
    public options: RecursivePartial<IOptions>;

    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
    }

    public load(data?: RecursivePartial<IResponsive>): void {
        if (!data) {
            return;
        }

        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }

        if (data.options !== undefined) {
            this.options = Utils.deepExtend({}, data.options) as RecursivePartial<IOptions>;
        }
    }
}
