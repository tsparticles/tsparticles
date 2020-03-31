import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Interfaces/Options/Particles/Shape/IShapeValues";

export type CustomShape = {
    [type: string]: SingleOrMultiple<IShapeValues>
};