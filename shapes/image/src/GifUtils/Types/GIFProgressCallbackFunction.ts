import type { ICoordinates, IDimension } from "tsparticles-engine";

export type GIFProgressCallbackFunction = (
    percentageRead: number,
    frameCount: number,
    lastFrame: ImageData,
    framePos: ICoordinates,
    gifSize: IDimension,
) => void;
