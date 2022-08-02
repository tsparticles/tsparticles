import type { ILinks } from "./ILinks";
import type { IParticlesOptions } from "tsparticles-engine";

export type IParticlesLinkOptions = IParticlesOptions & {
    /**
     * @deprecated use the new links instead
     */
    lineLinked?: ILinks;

    /**
     * @deprecated use the new links instead
     */
    line_linked?: ILinks;

    links?: ILinks;
};
