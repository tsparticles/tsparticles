import { type ICoordinates, type IDimension, getDistance, getRandom } from "@tsparticles/engine";
import type { IPoissonPoint } from "./Interfaces/IPoissonPoint.js";

const double = 2,
    doublePI = Math.PI * double;

/**
 * A Poisson Disc Sampling routine - randomly but evenly place dots on the screen..
 */
export class PoissonDisc {
    /**
     * Array of active points indices
     */
    active: number[];

    /**
     * The size of the grid cell = radius / sqrt(dimensions)
     */
    cellSize;

    /**
     * Number of columns in the grid
     */
    cols;

    /**
     * n-dimensional grid
     */
    dimensions;
    firstPoint;

    /**
     * Grid array of point indices
     */
    grid: number[][];

    /**
     * Array of points already plotted
     */
    points: IPoissonPoint[];

    /**
     * The minimum distance between points
     */
    radius;

    /**
     * Number of tries to make a new point before giving up
     */
    retries;

    /**
     * Number of rows in the grid
     */
    rows;

    /**
     * Size of the display in pixels
     */
    size: IDimension;

    /**
     * Create a new disc sampler
     * @param size - Size of the display in pixels
     * @param radius - The minimum distance between points
     * @param retries - Number of tries to make a new point before giving up
     * @param dimensions - n-dimensional grid
     * @param firstPoint - The first point position (optional)
     */
    constructor(size: IDimension, radius: number, retries: number, dimensions: number, firstPoint?: ICoordinates) {
        this.size = { ...size };
        this.radius = radius;
        this.retries = retries;
        this.dimensions = dimensions;
        this.cellSize = Math.floor(this.radius / Math.sqrt(this.dimensions));
        this.cols = Math.floor(this.size.width / this.cellSize);
        this.rows = Math.floor(this.size.height / this.cellSize);
        this.points = [];
        this.active = [];
        this.grid = [];
        this.firstPoint = firstPoint ? { ...firstPoint } : undefined;
        this.reset();
    }

    /**
     * Add a new point to the points, grid and active arrays. Points array holds the
     * point data and grid / active hold indices to the points array.
     * @param inputPoint - The pixel position of the point
     */
    addPoint(inputPoint: ICoordinates): void {
        const point: IPoissonPoint = {
                position: { ...inputPoint },
                gridPosition: {
                    x: Math.floor(inputPoint.x / this.cellSize),
                    y: Math.floor(inputPoint.y / this.cellSize),
                },
            },
            pointIndex = this.points.length;

        this.points.push(point);
        this.grid[point.gridPosition.y][point.gridPosition.x] = pointIndex;
        this.active.push(pointIndex);
    }

    /**
     * Get a random integer between min and max
     * @param min - The minimum value
     * @param max - The maximum value
     * @returns Random number from min to max
     */
    getRandom(min: number, max: number): number {
        return Math.floor(getRandom() * (max - min)) + min;
    }

    /**
     * Initialise the empty background grid array
     */
    initialiseGrid(): void {
        for (let y = 0; y <= this.rows; y++) {
            this.grid[y] = [];

            for (let x = 0; x <= this.cols; x++) {
                this.grid[y][x] = -1;
            }
        }
    }

    /**
     * Reset the algorithm and data
     */
    reset(): void {
        this.points = [];
        this.active = [];
        this.grid = [];

        this.initialiseGrid();

        if (this.firstPoint) {
            this.addPoint(this.firstPoint);
        } else {
            const minCoordinate = 0;

            this.addPoint({
                x: this.getRandom(minCoordinate, this.size.width),
                y: this.getRandom(minCoordinate, this.size.height),
            });
        }
    }

    /**
     * Run the algorithm till the end
     */
    async run(): Promise<void> {
        this.reset();

        const minCount = 0,
            step = 1;

        while (this.active.length > minCount) {
            await this.steps(step);
        }
    }

    /**
     * Take a single or n steps through the algorithm
     * @param steps - Number of steps to take
     */
    async steps(steps: number): Promise<void> {
        const minCount = 0;

        /* Take one or 'n' steps */
        for (let i = 0; i < steps; i++) {
            /* While there are still active points */
            if (this.active.length <= minCount) {
                continue;
            }

            await this._step();
        } // n loop
    }

    private _getNewPoint(currentPoint: IPoissonPoint, tries: number): ICoordinates | undefined {
        const minCoordinate = 0,
            gridMinValue = 0,
            maxNeighbourIndex = 1,
            /* Uniformly distribute the angle or random, not clear in the docs */
            /* let newAngle = Math.floor(Math.random()*(Math.PI*2)); */
            newAngle = tries * (doublePI / this.retries),
            /* Get a random distance r to 2r */
            newDist = this.getRandom(this.radius, this.radius * double),
            /* Calculate the new position */
            offset: ICoordinates = {
                x: Math.cos(newAngle) * newDist,
                y: Math.sin(newAngle) * newDist,
            },
            newPoint: ICoordinates = {
                x: Math.floor(currentPoint.position.x + offset.x),
                y: Math.floor(currentPoint.position.y + offset.y),
            },
            newGridCoords: ICoordinates = {
                x: Math.floor(newPoint.x / this.cellSize),
                y: Math.floor(newPoint.y / this.cellSize),
            };

        if (
            newPoint.x > minCoordinate &&
            newPoint.x < this.size.width &&
            newPoint.y > minCoordinate &&
            newPoint.y < this.size.height
        ) {
            /* It is inside the screen area */
            if (this.grid[newGridCoords.y][newGridCoords.x] < gridMinValue) {
                /* There is not a point at this grid reference - get the neighbours */
                for (let i = -1; i <= maxNeighbourIndex; i++) {
                    for (let j = -1; j <= maxNeighbourIndex; j++) {
                        /* Each neighbour grid location */
                        const neighbourGrid: ICoordinates = {
                            x: newGridCoords.x + j,
                            y: newGridCoords.y + i,
                        };

                        if (
                            neighbourGrid.x >= minCoordinate &&
                            neighbourGrid.y >= minCoordinate &&
                            neighbourGrid.x < this.cols &&
                            neighbourGrid.y < this.rows &&
                            (neighbourGrid.x !== newGridCoords.x || neighbourGrid.y !== newGridCoords.y)
                        ) {
                            /* Neighbour is within the grid and not the centre point */
                            if (this.grid[neighbourGrid.y][neighbourGrid.x] >= gridMinValue) {
                                /* It has a point in it - check how far away it is */
                                const neighbourIndex = this.grid[neighbourGrid.y][neighbourGrid.x],
                                    neighbour = this.points[neighbourIndex],
                                    dist = getDistance(newPoint, neighbour.position);

                                /* Invalid, to close to a neighbour point */
                                if (dist < this.radius) {
                                    return;
                                }
                            }
                        }
                    }
                }
            } else {
                /* Invalid, there is already a point in this cell */
                return;
            }
        } else {
            /* Invalid, point is outside the grid */
            return;
        }

        return newPoint;
    }

    private async _step(): Promise<void> {
        const minCount = 0,
            randomActive = this.getRandom(minCount, this.active.length);

        return new Promise(resolve => {
            let foundNewPoint = false;

            for (let tries = 0; tries < this.retries; tries++) {
                const newPoint = this._getNewPoint(this.points[this.active[randomActive]], tries);

                if (newPoint) {
                    /* Valid, add this point */
                    foundNewPoint = true;

                    this.addPoint(newPoint);

                    break;
                }
            }

            if (!foundNewPoint) {
                const deleteCount = 1;

                /* Didn't find a new point after k tries - remove this point from Active list */
                this.active.splice(randomActive, deleteCount);
            }

            resolve();
        });
    }
}
