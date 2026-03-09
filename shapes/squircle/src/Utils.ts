import { type IShapeDrawData, double, doublePI, identity, none } from "@tsparticles/engine";

const EXPONENT = 5,
  STEPS = 48;

let cachedPath: Path2D | undefined;

/**
 * @param v -
 * @returns -
 */
function sign(v: number): number {
  return v < none ? -identity : identity;
}

/**
 * @returns -
 */
function createPath(): Path2D {
  const path = new Path2D(),
    step = doublePI / STEPS;

  for (let i = 0; i <= STEPS; i++) {
    const t = i * step,
      cos = Math.cos(t),
      sin = Math.sin(t),
      x = sign(cos) * Math.pow(Math.abs(cos), double / EXPONENT),
      y = sign(sin) * Math.pow(Math.abs(sin), double / EXPONENT);

    if (i) {
      path.lineTo(x, y);
    } else {
      path.moveTo(x, y);
    }
  }

  path.closePath();

  return path;
}

/**
 * @returns -
 */
function getPath(): Path2D {
  cachedPath ??= createPath();

  return cachedPath;
}

/**
 * @param data -
 */
export function drawSquircle(data: IShapeDrawData): void {
  const { context, radius } = data,
    path = getPath();

  context.save();
  context.scale(radius, radius);
  context.fill(path);
  context.restore();
}
