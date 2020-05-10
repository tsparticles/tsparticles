import type { IConnectLineLinked } from "./IConnectLineLinked";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IConnect extends IOptionLoader<IConnect> {
    distance: number;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: IConnectLineLinked;

    lineLinked: IConnectLineLinked;
    radius: number;
}
