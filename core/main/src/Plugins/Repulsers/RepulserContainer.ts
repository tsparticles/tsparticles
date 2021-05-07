import type { RepulserInstance } from "./RepulserInstance";
import type { IRepulser } from "./Options/Interfaces/IRepulser";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";

export interface RepulserContainer {
    addRepulser: (options: IRepulser, position: ICoordinates) => RepulserInstance;
}
