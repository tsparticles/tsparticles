import type { IConnectLinks } from "./IConnectLinks";

/**
 * @category Options
 */
export interface IConnect {
    /**
     * @deprecated use the new links instead
     */
    line_linked: IConnectLinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: IConnectLinks;

    distance: number;
    links: IConnectLinks;
    radius: number;
}
