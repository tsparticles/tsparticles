import { type BaseRange, Circle, Rectangle } from "./Ranges.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import type { Particle } from "./Particle.js";

interface RangeBounds {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

type ParticleCell = (Particle | undefined)[];

const sparseQueryCellRatio = 16,
  sparseQueryMinArea = 64;

/**
 * SpatialHashGrid for fast particle lookup
 */
export class SpatialHashGrid {
  #activeCellCount = 0;
  readonly #activeCells: (ParticleCell | undefined)[] = [];
  readonly #cells = new Map<string, ParticleCell>();
  #cellSize: number;
  readonly #circlePool: Circle[] = [];
  #circlePoolIdx;
  #pendingCellSize?: number;
  #queryVersion = 0;
  readonly #rectanglePool: Rectangle[] = [];
  #rectanglePoolIdx;

  constructor(cellSize: number) {
    this.#validateCellSize(cellSize);

    this.#cellSize = cellSize;

    this.#circlePoolIdx = 0;
    this.#rectanglePoolIdx = 0;
  }

  get cellSize(): number {
    return this.#cellSize;
  }

  /**
   * Sets the cell size (applied on next clear)
   * @param value - the new cell size
   */
  set cellSize(value: number) {
    this.#validateCellSize(value);

    this.#pendingCellSize = value;
  }

  /**
   * Clears the grid for the next frame
   * @param invalidateQueries - whether traversals of a retired collection should stop
   */
  clear(invalidateQueries = false): void {
    if (invalidateQueries) {
      this.#queryVersion++;

      for (let index = 0; index < this.#activeCellCount; index++) {
        const cell = this.#activeCells[index];

        if (cell) {
          cell.length = 0;
        }
      }
    }

    this.#cells.clear();

    const pendingCellSize = this.#pendingCellSize;

    if (pendingCellSize !== undefined) {
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

    let cell = this.#cells.get(key);

    if (!cell) {
      cell = [];
      this.#cells.set(key, cell);
    }

    cell.push(particle);
  }

  /**
   * Queries particles within a range (Circle or Rectangle)
   * @param range - the range to query particles in
   * @param check - optional callback run before containment and live-state checks
   * @param out - optional output array to fill with results
   * @returns the array of particles within the range
   */
  query(
    range: BaseRange,
    check?: (particle: Particle) => boolean,
    out: Particle[] = [],
  ): Particle[] {
    const queryVersion = this.#queryVersion,
      bounds = this.#getRangeBounds(range);

    if (queryVersion !== this.#queryVersion || !bounds || !this.#cells.size) {
      return out;
    }

    const minCellX = Math.floor(bounds.minX / this.#cellSize),
      maxCellX = Math.floor(bounds.maxX / this.#cellSize),
      minCellY = Math.floor(bounds.minY / this.#cellSize),
      maxCellY = Math.floor(bounds.maxY / this.#cellSize);

    if (
      !Number.isSafeInteger(minCellX) ||
      !Number.isSafeInteger(maxCellX) ||
      !Number.isSafeInteger(minCellY) ||
      !Number.isSafeInteger(maxCellY) ||
      minCellX > maxCellX ||
      minCellY > maxCellY
    ) {
      return out;
    }

    const queryArea = (maxCellX - minCellX + 1) * (maxCellY - minCellY + 1),
      cellCount = this.#cells.size;

    // Rescan occupied cells after each callback-bearing cell. This observes new cells
    // without traversing every empty coordinate, and keeps the original scan order.
    if (
      check &&
      queryArea >
        Math.max(
          sparseQueryMinArea,
          cellCount * cellCount * sparseQueryCellRatio,
        )
    ) {
      this.#querySparseLive(
        range,
        check,
        out,
        minCellX,
        maxCellX,
        minCellY,
        maxCellY,
      );

      return out;
    }

    // Queries without predicates retain the cheaper sorted snapshot.
    if (
      !check &&
      queryArea > Math.max(sparseQueryMinArea, cellCount * sparseQueryCellRatio)
    ) {
      const occupied: ICoordinates[] = [];

      for (const key of this.#cells.keys()) {
        const separator = key.indexOf("_"),
          x = Number(key.slice(0, separator)),
          y = Number(key.slice(separator + 1));

        if (x >= minCellX && x <= maxCellX && y >= minCellY && y <= maxCellY) {
          occupied.push({ x, y });
        }
      }

      // Keep the same cell order as the coordinate scan.
      occupied.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

      for (const { x, y } of occupied) {
        this.#queryCell(x, y, range, undefined, out);

        if (queryVersion !== this.#queryVersion) {
          return out;
        }
      }

      return out;
    }

    for (let cx = minCellX; cx <= maxCellX; cx++) {
      for (let cy = minCellY; cy <= maxCellY; cy++) {
        this.#queryCell(cx, cy, range, check, out);

        if (queryVersion !== this.#queryVersion) {
          return out;
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
    const circle = this.#acquireCircle(position.x, position.y, radius);

    try {
      return this.query(circle, check, out);
    } finally {
      this.#circlePoolIdx--;
    }
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
    const rect = this.#acquireRectangle(
      position.x,
      position.y,
      size.width,
      size.height,
    );

    try {
      return this.query(rect, check, out);
    } finally {
      this.#rectanglePoolIdx--;
    }
  }

  /**
   * Removes a particle before its object can return to the manager's pool.
   * Active cells can outlive a nested clear, so invalidate those references too.
   * @param particle - the particle being removed
   * @internal
   */
  remove(particle: Particle): void {
    for (const [key, cell] of this.#cells) {
      this.#removeFromCell(cell, particle);

      if (!cell.length && !this.#activeCells.includes(cell)) {
        this.#cells.delete(key);
      }
    }

    for (let index = 0; index < this.#activeCellCount; index++) {
      const cell = this.#activeCells[index];

      if (cell) {
        this.#removeFromCell(cell, particle);
      }
    }
  }

  #acquireCircle(x: number, y: number, r: number): Circle {
    const idx = this.#circlePoolIdx++;

    let circle = this.#circlePool[idx];

    if (!circle) {
      circle = new Circle(x, y, r);

      this.#circlePool[idx] = circle;
    }

    return circle.reset(x, y, r);
  }

  #acquireRectangle(x: number, y: number, w: number, h: number): Rectangle {
    const idx = this.#rectanglePoolIdx++;

    let rectangle = this.#rectanglePool[idx];

    if (!rectangle) {
      rectangle = new Rectangle(x, y, w, h);

      this.#rectanglePool[idx] = rectangle;
    }

    return rectangle.reset(x, y, w, h);
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

  #queryCell(
    cx: number,
    cy: number,
    range: BaseRange,
    check: ((particle: Particle) => boolean) | undefined,
    out: Particle[],
  ): void {
    const cellParticles = this.#cells.get(`${cx}_${cy}`);

    if (!cellParticles) {
      return;
    }

    const queryIndex = this.#activeCellCount++;

    this.#activeCells[queryIndex] = cellParticles;

    try {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of -- Recheck the exact slot after callback-driven removals.
      for (let index = 0; index < cellParticles.length; index++) {
        const p = cellParticles[index];

        if (!p || (check && (!check(p) || cellParticles[index] !== p))) {
          continue;
        }

        if (
          range.contains(p.getPosition()) &&
          cellParticles[index] === p &&
          !p.destroyed
        ) {
          out.push(p);
        }
      }
    } finally {
      this.#activeCells[queryIndex] = undefined;
      this.#activeCellCount--;
    }
  }

  #querySparseLive(
    range: BaseRange,
    check: (particle: Particle) => boolean,
    out: Particle[],
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
  ): void {
    const queryVersion = this.#queryVersion;

    let lastX = minX,
      lastY = minY,
      first = true;

    while (this.#cells.size && queryVersion === this.#queryVersion) {
      const remainingArea = (maxX - lastX) * (maxY - minY + 1) + maxY - lastY,
        cellCount = this.#cells.size;

      // A callback can turn a sparse grid into a dense one. Resume the coordinate
      // scan at the next cell rather than repeatedly rescanning a growing map.
      if (
        !first &&
        remainingArea <=
          Math.max(
            sparseQueryMinArea,
            cellCount * cellCount * sparseQueryCellRatio,
          )
      ) {
        for (let x = lastX; x <= maxX; x++) {
          for (let y = x === lastX ? lastY + 1 : minY; y <= maxY; y++) {
            this.#queryCell(x, y, range, check, out);

            if (queryVersion !== this.#queryVersion) {
              return;
            }
          }
        }

        return;
      }

      let nextX = Infinity,
        nextY = Infinity;

      for (const key of this.#cells.keys()) {
        const separator = key.indexOf("_"),
          x = Number(key.slice(0, separator)),
          y = Number(key.slice(separator + 1));

        if (
          x >= minX &&
          x <= maxX &&
          y >= minY &&
          y <= maxY &&
          (x > lastX || (x === lastX && (first || y > lastY))) &&
          (x < nextX || (x === nextX && y < nextY))
        ) {
          nextX = x;
          nextY = y;
        }
      }

      if (nextX === Infinity) {
        return;
      }

      this.#queryCell(nextX, nextY, range, check, out);

      lastX = nextX;
      lastY = nextY;
      first = false;
    }
  }

  #removeFromCell(cell: ParticleCell, particle: Particle): void {
    for (
      let index = cell.indexOf(particle);
      index >= 0;
      index = cell.indexOf(particle, index + 1)
    ) {
      cell[index] = undefined;
    }

    if (!this.#activeCells.includes(cell)) {
      while (cell.length && !cell[cell.length - 1]) {
        cell.pop();
      }
    }
  }

  #validateCellSize(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(
        "SpatialHashGrid cell size must be finite and greater than zero",
      );
    }
  }
}
