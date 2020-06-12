import type { IConnectLinks } from "./IConnectLinks";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IConnect extends IOptionLoader<IConnect> {
    distance: number;

    /**
     * @deprecated use the new links instead
     */
    line_linked: IConnectLinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: IConnectLinks;

    links: IConnectLinks;
    radius: number;
}
