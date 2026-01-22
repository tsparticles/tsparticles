import { type ICoordinates, doublePI, getRandom } from "@tsparticles/engine";

const defaultRotation = 0,
  maxAttempts = 100;

/**
 *
 * @param position -
 * @param sides -
 * @param radius -
 * @param rotationAngle -
 * @returns the polygon coordinates
 */
export function generateRandomPolygon(
  position: ICoordinates,
  sides: number,
  radius: number,
  rotationAngle = defaultRotation,
): ICoordinates[] {
  const polygon = [],
    angle = doublePI / sides;

  for (let i = 0; i < sides; i++) {
    const currentAngle = angle * i + rotationAngle;

    polygon.push({
      x: position.x + radius * Math.cos(currentAngle),
      y: position.y + radius * Math.sin(currentAngle),
    });
  }

  return polygon;
}

/**
 *
 * @param polygon -
 * @returns a random point within the polygon
 */
export function generateRandomPointWithinPolygon(polygon: ICoordinates[]): ICoordinates | null {
  const firstIndex = 0,
    firstPoint = polygon[firstIndex];

  if (!firstPoint) {
    return null;
  }

  const min = { ...firstPoint },
    max = { ...firstPoint };

  for (const point of polygon) {
    if (point.x < min.x) {
      min.x = point.x;
    }

    if (point.x > max.x) {
      max.x = point.x;
    }

    if (point.y < min.y) {
      min.y = point.y;
    }

    if (point.y > max.y) {
      max.y = point.y;
    }
  }

  let randomPoint: ICoordinates | null = null;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    const tmpPoint: ICoordinates = {
      x: min.x + getRandom() * (max.x - min.x),
      y: min.y + getRandom() * (max.y - min.y),
    };

    if (isPointInPolygon(tmpPoint, polygon)) {
      randomPoint = tmpPoint;

      break;
    }
  }

  return randomPoint;
}

/**
 *
 * @param polygon -
 * @returns a random point on the perimeter of the polygon
 */
export function generateRandomPointOnPolygonPerimeter(polygon: ICoordinates[]): ICoordinates | undefined {
  const sideIndex = Math.floor(getRandom() * polygon.length),
    startPoint = polygon[sideIndex];

  if (!startPoint) {
    return;
  }

  const offset = 1,
    endPoint = polygon[(sideIndex + offset) % polygon.length];

  if (!endPoint) {
    return;
  }

  const t = getRandom();

  return { x: startPoint.x + (endPoint.x - startPoint.x) * t, y: startPoint.y + (endPoint.y - startPoint.y) * t };
}

/**
 *
 * @param point -
 * @param polygon -
 * @returns whether the point is within the polygon
 */
export function isPointInPolygon(point: ICoordinates, polygon: ICoordinates[]): boolean {
  let inside = false;

  const offset = 1;

  for (let i = 0, j = polygon.length - offset; i < polygon.length; j = i++) {
    const pi = polygon[i],
      pj = polygon[j];

    if (!pi || !pj) {
      continue;
    }

    const intersect =
      pi.y > point.y !== pj.y > point.y && point.x < ((pj.x - pi.x) * (point.y - pi.y)) / (pj.y - pi.y) + pi.x;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}
