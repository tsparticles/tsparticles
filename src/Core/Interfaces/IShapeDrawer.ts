import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction
} from "../../Types/ShapeDrawerFunctions";

export interface IShapeDrawer {
    init?: ShapeDrawerInitFunction;
    draw: ShapeDrawerDrawFunction;
    afterEffect?: ShapeDrawerAfterEffectFunction;
    destroy?: ShapeDrawerDestroyFunction;
}
