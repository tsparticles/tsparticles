import type {ITheme} from "../../Interfaces/Theme/ITheme"
import type { RecursivePartial } from "../../../Types";

export class Theme implements ITheme{
   
    public name: string;
    public default: boolean;
    
    constructor() {
        this.name = "dark";
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
    }
   
}
