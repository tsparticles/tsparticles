import type { ITheme } from "../../Interfaces/Theme/ITheme";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IOptions } from "../../Interfaces/IOptions";
import { deepExtend } from "../../../Utils";
import { ThemeDefault } from "./ThemeDefault";

export class Theme implements ITheme, IOptionLoader<ITheme> {
    name;
    default;
    options?: RecursivePartial<IOptions>;

    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }

    load(data?: RecursivePartial<ITheme>): void {
        if (!data) {
            return;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        this.default.load(data.default);

        this.options = deepExtend({}, data.options) as RecursivePartial<IOptions>;
    }
}
