import {IGrabLineLinked} from "./IGrabLineLinked";

export interface IGrab {
    distance: number;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: IGrabLineLinked;

    lineLinked: IGrabLineLinked;
}
