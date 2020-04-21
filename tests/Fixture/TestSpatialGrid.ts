import type { IDimension } from "../../src/Interfaces/IDimension";
import { SpatialGrid } from "../../src/Classes/Utils/SpatialGrid";

export class TestSpatialGrid {
    private canvas: IDimension;
    public spatialGrid: SpatialGrid;

    constructor(canvas: IDimension) {
        this.canvas = canvas;
        this.spatialGrid = new SpatialGrid(this.canvas);
    }

    /**
     * Reset the spatial grid. If [[canvas]] is provided, then the new spatial grid will be
     * initialized with this [[canvas]]. Otherwise the last-used [[canvas]] will be used.
     *
     * @param canvas
     */
    public reset(canvas?: IDimension): void {
        if(canvas !== undefined) {
            this.canvas = canvas;
        }
        this.spatialGrid = new SpatialGrid(this.canvas);
    }

}
