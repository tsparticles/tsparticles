import type {ITheme} from "../../Interfaces/Theme/ITheme"
import type { RecursivePartial } from "../../../Types";
import {IOptionLoader} from "../../Interfaces/IOptionLoader"
import {IOptions} from "../../Interfaces/IOptions"
import {Utils} from "../../../Utils"

export class Theme implements ITheme, IOptionLoader<ITheme>{
   
    public name: string;
    public default: boolean;
    public options?: RecursivePartial<IOptions>
    constructor() {
        this.name = "";
        this.default = false;
    }
    public load(data?: RecursivePartial<ITheme>): void {
        if (data === undefined) {
            return;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        if (data.default !== undefined) {
            this.default = data.default;
        }
         if (data.options !== undefined) {
            this.options = Utils.deepExtend({}, data.options);
        }
    }
   
}
