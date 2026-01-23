import type { ICoordinates } from "@tsparticles/engine";
import type { SegmentType } from "./SegmentType.js";

export interface IPathSegmentData {
  type: SegmentType;
  values: ICoordinates[];
}

export interface IPathData {
  half: boolean;
  segments: IPathSegmentData[];
}
