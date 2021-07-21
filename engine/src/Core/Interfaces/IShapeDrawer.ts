import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
    ShapeDrawerLoadFunction,
    ShapeDrawerParticleInitFunction,
    ShapeDrawerSidesCountFunction,
} from "../../Types";

/**
 * @category Interfaces
 */
export interface IShapeDrawer {
    getSidesCount?: ShapeDrawerSidesCountFunction;
    init?: ShapeDrawerInitFunction;
    particleInit?: ShapeDrawerParticleInitFunction;
    draw: ShapeDrawerDrawFunction;
    afterEffect?: ShapeDrawerAfterEffectFunction;
    destroy?: ShapeDrawerDestroyFunction;
    loadShape?: ShapeDrawerLoadFunction;
}
