import type { IGrabLinks } from "./IGrabLinks";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IGrab extends IOptionLoader<IGrab> {
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
