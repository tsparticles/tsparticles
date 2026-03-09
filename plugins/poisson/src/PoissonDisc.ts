import { type ICoordinates, type IDimension, double, doublePI, getDistance, getRandom } from "@tsparticles/engine";
import type { IPoissonPoint } from "./Interfaces/IPoissonPoint.js";

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
      pointIndex = this.points.length,
      row = this.grid[point.gridPosition.y];

    if (!row) {
      return;
    }

    this.points.push(point);

    row[point.gridPosition.x] = pointIndex;

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

      const row = this.grid[y];

      if (!row) {
        continue;
      }

      for (let x = 0; x <= this.cols; x++) {
        row[x] = -1;
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
      step = 1,
      yieldEvery = 100,
      yieldStepModule = 0;

    let iterations = 0;

    while (this.active.length > minCount) {
      this.steps(step);

      if (++iterations % yieldEvery === yieldStepModule) {
        await new Promise<void>(resolve => setTimeout(resolve));
      }
    }
  }

  /**
   * Take a single or n steps through the algorithm
   * @param steps - Number of steps to take
   */
  steps(steps: number): void {
    const minCount = 0;

    /* Take one or 'n' steps */
    for (let i = 0; i < steps; i++) {
      /* While there are still active points */
      if (this.active.length <= minCount) {
        continue;
      }

      this._step();
    } // n loop
  }

  private _getNewPoint(currentPoint: IPoissonPoint, tries: number): ICoordinates | undefined {
    const minCoordinate = 0,
      gridMinValue = 0,
      maxNeighbourIndex = 1,
      newAngle = tries * (doublePI / this.retries),
      newDist = this.getRandom(this.radius, this.radius * double),
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
      newPoint.x <= minCoordinate ||
      newPoint.x >= this.size.width ||
      newPoint.y <= minCoordinate ||
      newPoint.y >= this.size.height
    ) {
      return;
    }

    const row = this.grid[newGridCoords.y];

    if (!row) {
      return;
    }

    const cellValue = row[newGridCoords.x];

    if (cellValue === undefined) {
      return;
    }

    // La cella è già occupata
    if (cellValue >= gridMinValue) {
      return;
    }

    for (let i = -1; i <= maxNeighbourIndex; i++) {
      for (let j = -1; j <= maxNeighbourIndex; j++) {
        if (!i && !j) {
          continue;
        }

        const neighbourGrid: ICoordinates = {
          x: newGridCoords.x + j,
          y: newGridCoords.y + i,
        };

        if (
          neighbourGrid.x < minCoordinate ||
          neighbourGrid.y < minCoordinate ||
          neighbourGrid.x >= this.cols ||
          neighbourGrid.y >= this.rows
        ) {
          continue;
        }

        const neighbourCellValue = this.grid[neighbourGrid.y]?.[neighbourGrid.x];

        if (neighbourCellValue === undefined || neighbourCellValue < gridMinValue) {
          continue;
        }

        const neighbour = this.points[neighbourCellValue];

        if (!neighbour) {
          continue;
        }

        if (getDistance(newPoint, neighbour.position) < this.radius) {
          return;
        }
      }
    }

    return newPoint;
  }

  private _step(): void {
    const minCount = 0,
      randomActive = this.getRandom(minCount, this.active.length);

    let foundNewPoint = false;

    for (let tries = 0; tries < this.retries; tries++) {
      const randomActivePointIndex = this.active[randomActive];

      if (randomActivePointIndex === undefined) {
        continue;
      }

      const point = this.points[randomActivePointIndex];

      if (!point) {
        continue;
      }

      const newPoint = this._getNewPoint(point, tries);

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
  }
}
