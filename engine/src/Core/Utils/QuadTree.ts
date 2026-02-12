import { type BaseRange, Circle, Rectangle } from "./Ranges.js";
import { half, subdivideCount } from "./Constants.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import type { Particle } from "../Particle.js";
import type { Point } from "./Point.js";
import { getDistance } from "../../Utils/MathUtils.js";

export class QuadTree {
  private readonly _points: Point[] = [];
  private _subs: [QuadTree, QuadTree, QuadTree, QuadTree] | null = null;

  constructor(
    readonly rectangle: Rectangle,
    readonly capacity: number,
  ) {
    // do nothing
  }

  insert(point: Point): boolean {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }

    const subs = this._subs;

    if (!subs) {
      if (this._points.length < this.capacity) {
        this._points.push(point);
        return true;
      }

      this._subdivide();

      const newSubs = this._subs;

      for (const p of this._points) {
        for (let s = 0; s < subdivideCount; s++) {
          if (newSubs?.[s]?.insert(p)) {
            break;
          }
        }
      }

      this._points.length = 0;

      for (let s = 0; s < subdivideCount; s++) {
        if (newSubs?.[s]?.insert(point)) {
          return true;
        }
      }

      return false;
    }

    for (let s = 0; s < subdivideCount; s++) {
      if (subs[s]?.insert(point)) {
        return true;
      }
    }

    return false;
  }

  query(range: BaseRange, check?: (particle: Particle) => boolean, out: Particle[] = []): Particle[] {
    if (!range.intersects(this.rectangle)) {
      return out;
    }

    const points = this._points;

    for (const p of points) {
      const particle = p.particle;

      if (!range.contains(p.position) && getDistance(range.position, p.position) > particle.getRadius()) {
        continue;
      }

      if (check && !check(particle)) {
        continue;
      }

      out.push(particle);
    }

    const subs = this._subs;

    if (subs) {
      for (const s of subs) {
        s.query(range, check, out);
      }
    }

    return out;
  }

  queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[] {
    return this.query(new Circle(position.x, position.y, radius), check);
  }

  queryRectangle(position: ICoordinates, size: IDimension, check?: (particle: Particle) => boolean): Particle[] {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }

  private _subdivide(): void {
    const rect = this.rectangle,
      { x, y } = rect.position,
      { width, height } = rect.size,
      halfWidth = width * half,
      halfHeight = height * half,
      capacity = this.capacity;

    this._subs = [
      new QuadTree(new Rectangle(x, y, halfWidth, halfHeight), capacity),
      new QuadTree(new Rectangle(x + halfWidth, y, halfWidth, halfHeight), capacity),
      new QuadTree(new Rectangle(x, y + halfHeight, halfWidth, halfHeight), capacity),
      new QuadTree(new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight), capacity),
    ];
  }
}
