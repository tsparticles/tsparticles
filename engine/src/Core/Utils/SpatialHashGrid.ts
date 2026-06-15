import { type BaseRange, Circle, Rectangle } from "./Ranges.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import type { Particle } from "../Particle.js";

interface RangeBounds {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

/**
 * SpatialHashGrid for fast particle lookup
 */
export class SpatialHashGrid {
  #cellSize: number;
  readonly #cells = new Map<string, Particle[]>();
  readonly #circlePool: Circle[] = [];
  #circlePoolIdx;
  #pendingCellSize?: number;
  readonly #rectanglePool: Rectangle[] = [];
  #rectanglePoolIdx;

  constructor(cellSize: number) {
    this.#cellSize = cellSize;

    this.#circlePoolIdx = 0;
    this.#rectanglePoolIdx = 0;
  }

  /**
   * Clears the grid for the next frame
   */
  clear(): void {
    this.#cells.clear();

    const pendingCellSize = this.#pendingCellSize;

    if (pendingCellSize) {
      this.#cellSize = pendingCellSize;
    }

    this.#pendingCellSize = undefined;
  }

  /**
   * Adds a particle to the appropriate cell
   * @param particle - the particle to insert
   */
  insert(particle: Particle): void {
    const { x, y } = particle.getPosition(),
      key = this.#cellKeyFromCoords(x, y);

    if (!this.#cells.has(key)) {
      this.#cells.set(key, []);
    }

    this.#cells.get(key)?.push(particle);
  }

  /**
   * Queries particles within a range (Circle or Rectangle)
   * @param range - the range to query particles in
   * @param check - optional callback to check particles against, if not provided all particles will be returned
   * @param out - optional output array to fill with results
   * @returns the array of particles within the range
   */
  query(range: BaseRange, check?: (particle: Particle) => boolean, out: Particle[] = []): Particle[] {
    const bounds = this.#getRangeBounds(range);

    if (!bounds) {
      return out;
    }

    const minCellX = Math.floor(bounds.minX / this.#cellSize),
      maxCellX = Math.floor(bounds.maxX / this.#cellSize),
      minCellY = Math.floor(bounds.minY / this.#cellSize),
      maxCellY = Math.floor(bounds.maxY / this.#cellSize);

    for (let cx = minCellX; cx <= maxCellX; cx++) {
      for (let cy = minCellY; cy <= maxCellY; cy++) {
        const key = `${cx}_${cy}`,
          cellParticles = this.#cells.get(key);

        if (!cellParticles) {
          continue;
        }

        for (const p of cellParticles) {
          if (check && !check(p)) {
            continue;
          }

          if (range.contains(p.getPosition())) {
            out.push(p);
          }
        }
      }
    }

    return out;
  }

  /**
   * Queries particles within a circular range
   * @param position - the center position of the circle
   * @param radius - the circle radius
   * @param check - optional callback to filter particles
   * @param out - optional output array to fill with results
   * @returns the array of particles within the circle
   */
  queryCircle(
    position: ICoordinates,
    radius: number,
    check?: (particle: Particle) => boolean,
    out: Particle[] = [],
  ): Particle[] {
    const circle = this.#acquireCircle(position.x, position.y, radius),
      result = this.query(circle, check, out);

    this.#releaseShapes();

    return result;
  }

  /**
   * Queries particles within a rectangular range
   * @param position - the top-left position of the rectangle
   * @param size - the rectangle size
   * @param check - optional callback to filter particles
   * @param out - optional output array to fill with results
   * @returns the array of particles within the rectangle
   */
  queryRectangle(
    position: ICoordinates,
    size: IDimension,
    check?: (particle: Particle) => boolean,
    out: Particle[] = [],
  ): Particle[] {
    const rect = this.#acquireRectangle(position.x, position.y, size.width, size.height),
      result = this.query(rect, check, out);

    this.#releaseShapes();

    return result;
  }

  /**
   * Sets the cell size (applied on next clear)
   * @param cellSize - the new cell size
   */
  setCellSize(cellSize: number): void {
    this.#pendingCellSize = cellSize;
  }

  #acquireCircle(x: number, y: number, r: number): Circle {
    return (this.#circlePool[this.#circlePoolIdx++] ??= new Circle(x, y, r)).reset(x, y, r);
  }

  #acquireRectangle(x: number, y: number, w: number, h: number): Rectangle {
    return (this.#rectanglePool[this.#rectanglePoolIdx++] ??= new Rectangle(x, y, w, h)).reset(x, y, w, h);
  }

  /**
   * Convert coordinates to cell key
   * @param x - The x coordinate
   * @param y - The y coordinate
   * @returns -
   */
  #cellKeyFromCoords(x: number, y: number): string {
    const cellX = Math.floor(x / this.#cellSize),
      cellY = Math.floor(y / this.#cellSize);

    return `${cellX}_${cellY}`;
  }

  /**
   * Compute grid bounds depending on range type
   * @param range - The range
   * @returns -
   */
  #getRangeBounds(range: BaseRange): RangeBounds | null {
    if (range instanceof Circle) {
      const r = range.radius,
        { x, y } = range.position;

      return {
        minX: x - r,
        maxX: x + r,
        minY: y - r,
        maxY: y + r,
      };
    }

    if (range instanceof Rectangle) {
      const { x, y } = range.position,
        { width, height } = range.size;

      return {
        minX: x,
        maxX: x + width,
        minY: y,
        maxY: y + height,
      };
    }

    return null;
  }

  #releaseShapes(): void {
    this.#circlePoolIdx = 0;
    this.#rectanglePoolIdx = 0;
  }
}
