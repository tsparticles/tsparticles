import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { ISourceOptions } from "../../../Types/ISourceOptions";
import type { ITheme } from "../../Interfaces/Theme/ITheme";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { ThemeDefault } from "./ThemeDefault";
import { deepExtend } from "../../../Utils/Utils";

export class Theme implements ITheme, IOptionLoader<ITheme> {
    default;
    name;
    options?: ISourceOptions;

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

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as ISourceOptions;
        }
    }
}
