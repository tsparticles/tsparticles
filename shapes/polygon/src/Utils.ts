import { type ICoordinates, type IShapeDrawData, double, doublePI, half } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";

const polygonCache = new Map<number, ICoordinates[]>(),
  noOffset = 0;

/**
 * @param sides - The number of sides of the polygon.
 * @returns The polygon vertices.
 */
function getUnitPolygon(sides: number): ICoordinates[] {
  const cached = polygonCache.get(sides);

  if (cached) {
    return cached;
  }

  const step = doublePI / sides,
    isOdd = !!(sides % double),
    baseAngle = (-Math.PI + (isOdd ? noOffset : step)) * half,
    verts: ICoordinates[] = [];

  for (let i = 0; i < sides; i++) {
    const angle = baseAngle + i * step;

    verts[i] = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  polygonCache.set(sides, verts);

  return verts;
}

/**
 * @param data - The shape draw data.
 * @param side - The polygon side data.
 */
export function drawPolygon(data: IShapeDrawData, side: ISide): void {
  const { context, radius } = data,
    sides = side.count.numerator / side.count.denominator,
    verts = getUnitPolygon(sides);

  context.beginPath();

  for (let i = 0; i < verts.length; i++) {
    const vert = verts[i];

    if (!vert) {
      continue;
    }

    const x = vert.x * radius,
      y = vert.y * radius;

    if (i) {
      context.lineTo(x, y);
    } else {
      context.moveTo(x, y);
    }
  }

  context.closePath();
}
