import type { IResponsive } from "../Interfaces/IResponsive";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial, ResponsiveMode } from "../../Types";
import type { IOptions } from "../Interfaces/IOptions";
import { deepExtend } from "../../Utils";

export class Responsive implements IResponsive, IOptionLoader<IResponsive> {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
    mode: ResponsiveMode;

    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas";
    }

    load(data?: RecursivePartial<IResponsive>): void {
        if (!data) {
            return;
        }

        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }

        if (data.mode !== undefined) {
            // not enforcing an error here as this should largely be an optin setting
            if (["canvas", "screen"].includes(data.mode)) {
                this.mode = data.mode;
            }
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IOptions>;
        }
    }
}
