import type { ICoordinates3d } from "../../Core";

export type WorkerAddData = {
    containerId: string;
    particleId: number;
    position: ICoordinates3d;
    radius: number;
};
