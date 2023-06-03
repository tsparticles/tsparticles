import type { IConnectLinks } from "./IConnectLinks";

/**
 */
export interface IConnect {
    distance: number;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: IConnectLinks;

    /**
     * @deprecated use the new links instead
     */
    line_linked: IConnectLinks;

    links: IConnectLinks;
    radius: number;
}
