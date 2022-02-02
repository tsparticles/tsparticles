import type { ICoordinates, IDimension } from "../../Core";
import type { WorkerQueryType } from "../../Enums";

export type WorkerQueryData = {
    containerId: string;
    position: ICoordinates;
    queryId: string;
    queryType: WorkerQueryType;
    radius?: number;
    size?: IDimension;
};

export type WorkerOutputQueryData = {
    containerId: string;
    queryId: string;
    query: number[];
};
