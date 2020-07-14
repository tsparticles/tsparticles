import type { IGrabLinks } from "./IGrabLinks";

export interface IGrab {
    distance: number;

    /**
     * @deprecated use the new links instead
     */
    line_linked: IGrabLinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: IGrabLinks;

    links: IGrabLinks;
}
