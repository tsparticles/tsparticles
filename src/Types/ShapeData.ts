import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";

export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
