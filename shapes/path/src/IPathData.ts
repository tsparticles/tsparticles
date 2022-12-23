import type { ICoordinates, IShapeValues } from "tsparticles-engine";
import type { SegmentType } from "./SegmentType";

export interface IPathData extends IShapeValues {
    half: boolean;
    segments: ISegmentData[];
}

export interface ISegmentData {
    type: SegmentType;
    values: ICoordinates[];
}
