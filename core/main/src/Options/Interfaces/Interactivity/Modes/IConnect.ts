import type { IConnectLinks } from "./IConnectLinks";

/**
 * @category Options
 */
export interface IConnect {
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
