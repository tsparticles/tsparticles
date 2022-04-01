import type {
    ShapeDrawerAfterEffectFunction,
    ShapeDrawerDestroyFunction,
    ShapeDrawerDrawFunction,
    ShapeDrawerInitFunction,
    ShapeDrawerLoadFunction,
    ShapeDrawerParticleInitFunction,
    ShapeDrawerSidesCountFunction,
} from "../../Types/ShapeDrawerFunctions";

/**
 * @category Interfaces
 */
export interface IShapeDrawer {
    /**
     * Shape sides count function
     */
    getSidesCount?: ShapeDrawerSidesCountFunction;

    /**
     * Shape init function
     */
    init?: ShapeDrawerInitFunction;

    /**
     * Shape particle init function
     */
    particleInit?: ShapeDrawerParticleInitFunction;

    /**
     * Shape draw function
     */
    draw: ShapeDrawerDrawFunction;

    /**
     * Shape after draw effect function
     */
    afterEffect?: ShapeDrawerAfterEffectFunction;

    /**
     * Shape destroy function
     */
    destroy?: ShapeDrawerDestroyFunction;

    /**
     * Shape load function
     */
    loadShape?: ShapeDrawerLoadFunction;
}
