import type { IGrabLinks } from "./IGrabLinks";

/**
 * @category Options
 */
export interface IGrab {
    /**
     * @deprecated use the new links instead
     */
    line_linked: IGrabLinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: IGrabLinks;

    distance: number;
    links: IGrabLinks;
}
