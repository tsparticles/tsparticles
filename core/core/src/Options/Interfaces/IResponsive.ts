import type { RecursivePartial } from "../../Types";
import type { IOptions } from "./IOptions";

export interface IResponsive {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
}
