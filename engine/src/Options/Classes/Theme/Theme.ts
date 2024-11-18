import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { ISourceOptions } from "../../../Types/ISourceOptions.js";
import type { ITheme } from "../../Interfaces/Theme/ITheme.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { ThemeDefault } from "./ThemeDefault.js";
import { deepExtend } from "../../../Utils/Utils.js";
import { isNull } from "../../../Utils/TypeUtils.js";

export class Theme implements ITheme, IOptionLoader<ITheme> {
    readonly default;
    name;
    options?: ISourceOptions;

    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }

    load(data?: RecursivePartial<ITheme>): void {
        if (isNull(data)) {
            return;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        this.default.load(data.default);

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as ISourceOptions;
        }
    }
}
