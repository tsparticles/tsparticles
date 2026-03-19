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
  private _cellSize: number;
  private readonly _cells = new Map<string, Particle[]>();
  private readonly _circlePool: Circle[] = [];
  private _circlePoolIdx;
  private _pendingCellSize?: number;
  private readonly _rectanglePool: Rectangle[] = [];
  private _rectanglePoolIdx;

  constructor(cellSize: number) {
    this._cellSize = cellSize;

    this._circlePoolIdx = 0;
    this._rectanglePoolIdx = 0;
  }

  /**
   * Clears the grid for the next frame
   */
  clear(): void {
    this._cells.clear();

    const pendingCellSize = this._pendingCellSize;

    if (pendingCellSize) {
      this._cellSize = pendingCellSize;
    }

    this._pendingCellSize = undefined;
  }

  /**
   * Adds a particle to the appropriate cell
   * @param particle -
   */
  insert(particle: Particle): void {
    const { x, y } = particle.getPosition(),
      key = this._cellKeyFromCoords(x, y);

    if (!this._cells.has(key)) {
      this._cells.set(key, []);
    }

    this._cells.get(key)?.push(particle);
  }

  /**
   * Queries particles within a range (Circle or Rectangle)
   * @param range -
   * @param check - optional callback to check particles against, if not provided all particles will be returned
   * @param out -
   * @returns Particle[]
   */
  query(range: BaseRange, check?: (particle: Particle) => boolean, out: Particle[] = []): Particle[] {
    const bounds = this._getRangeBounds(range);

    if (!bounds) {
      return out;
    }

    const minCellX = Math.floor(bounds.minX / this._cellSize),
      maxCellX = Math.floor(bounds.maxX / this._cellSize),
      minCellY = Math.floor(bounds.minY / this._cellSize),
      maxCellY = Math.floor(bounds.maxY / this._cellSize);

    for (let cx = minCellX; cx <= maxCellX; cx++) {
      for (let cy = minCellY; cy <= maxCellY; cy++) {
        const key = `${cx}_${cy}`,
          cellParticles = this._cells.get(key);

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

  queryCircle(
    position: ICoordinates,
    radius: number,
    check?: (particle: Particle) => boolean,
    out: Particle[] = [],
  ): Particle[] {
    const circle = this._acquireCircle(position.x, position.y, radius),
      result = this.query(circle, check, out);

    this._releaseShapes();

    return result;
  }

  queryRectangle(
    position: ICoordinates,
    size: IDimension,
    check?: (particle: Particle) => boolean,
    out: Particle[] = [],
  ): Particle[] {
    const rect = this._acquireRectangle(position.x, position.y, size.width, size.height),
      result = this.query(rect, check, out);

    this._releaseShapes();

    return result;
  }

  setCellSize(cellSize: number): void {
    this._pendingCellSize = cellSize;
  }

  private _acquireCircle(x: number, y: number, r: number): Circle {
    return (this._circlePool[this._circlePoolIdx++] ??= new Circle(x, y, r)).reset(x, y, r);
  }

  private _acquireRectangle(x: number, y: number, w: number, h: number): Rectangle {
    return (this._rectanglePool[this._rectanglePoolIdx++] ??= new Rectangle(x, y, w, h)).reset(x, y, w, h);
  }

  /**
   * Convert coordinates to cell key
   * @param x -
   * @param y -
   * @returns -
   */
  private _cellKeyFromCoords(x: number, y: number): string {
    const cellX = Math.floor(x / this._cellSize),
      cellY = Math.floor(y / this._cellSize);

    return `${cellX}_${cellY}`;
  }

  /**
   * Compute grid bounds depending on range type
   * @param range -
   * @returns -
   */
  private _getRangeBounds(range: BaseRange): RangeBounds | null {
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

  private _releaseShapes(): void {
    this._circlePoolIdx = 0;
    this._rectanglePoolIdx = 0;
  }
}
