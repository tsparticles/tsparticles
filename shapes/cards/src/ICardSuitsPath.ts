import type { IPathData } from "@tsparticles/path-utils";
import type { SuitType } from "./SuitType.js";

export type ICardSuitsPath = Readonly<Record<SuitType, IPathData>>;
