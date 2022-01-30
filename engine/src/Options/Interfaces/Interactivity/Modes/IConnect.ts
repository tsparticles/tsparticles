import type { IConnectLinks } from "./IConnectLinks";

/**
 * @category Options
 */
export interface IConnect {
    distance: number;
    links: IConnectLinks;
    radius: number;
}
