import type { IParticle } from "./IParticle";
import { ShapeDrawerFunction } from "../Types/ShapeDrawerFunction";

export interface IShapeDrawer {
    draw: ShapeDrawerFunction;
}
