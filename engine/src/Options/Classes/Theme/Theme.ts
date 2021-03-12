import type { ITheme } from "../../Interfaces/Theme/ITheme";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IOptions } from "../../Interfaces/IOptions";
import { deepExtend } from "../../../Utils";
import { ThemeDefault } from "./ThemeDefault";

export class Theme implements ITheme, IOptionLoader<ITheme> {
    public name;
    public default;
    public options?: RecursivePartial<IOptions>;

    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }

    public load(data?: RecursivePartial<ITheme>): void {
        if (data === undefined) {
            return;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        this.default.load(data.default);

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IOptions>;
        }
    }
}
