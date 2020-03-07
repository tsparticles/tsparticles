import {IConnectLineLinked} from "./IConnectLineLinked";

export interface IConnect {
    distance: number;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: IConnectLineLinked;

    lineLinked: IConnectLineLinked;
    radius: number;
}
