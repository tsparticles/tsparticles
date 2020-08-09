import type {ITheme} from "../../Interfaces/Theme/ITheme"

export class Theme implements ITheme{
   
    public name: string;
    public default: boolean;
    
    constructor() {
        this.name = "dark";
        this.default = false;
    }

   
}
