import type { ICoordinates, IDimension } from "../../Core";

export type WorkerInitData = {
    containerId: string;
    position: ICoordinates;
    size: IDimension;
};
