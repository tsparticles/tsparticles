import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Interfaces/Options/Particles/Shape/IShapeValues";

export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>,
};
