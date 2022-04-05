import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptions } from "../Interfaces/IOptions";
import type { IResponsive } from "../Interfaces/IResponsive";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode";
import { deepExtend } from "../../Utils/Utils";

export class Responsive implements IResponsive, IOptionLoader<IResponsive> {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
    mode: ResponsiveMode;

    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = ResponsiveMode.canvas;
    }

    load(data?: RecursivePartial<IResponsive>): void {
        if (!data) {
            return;
        }

        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }

        if (data.mode !== undefined) {
            // not enforcing an error here as this should largely be an opt-in setting
            if (data.mode === ResponsiveMode.screen) {
                this.mode = ResponsiveMode.screen;
            } else {
                this.mode = ResponsiveMode.canvas;
            }
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IOptions>;
        }
    }
}
