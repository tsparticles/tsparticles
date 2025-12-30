import type { ICoordinates } from "@tsparticles/engine";

const double = 2,
    doublePI = Math.PI * double,
    half = 0.5,
    defaultRotation = 0;

/**
 * @param sides -
 * @param radius -
 * @param rot -
 * @returns polygon coordinates
 */
export function polygon(sides: number, radius: number, rot = defaultRotation): ICoordinates[] {
    const step = doublePI / sides,
        path: ICoordinates[] = [];

    for (let i = 0; i < sides; i++) {
        path.push({ x: Math.cos(i * step + rot) * radius, y: Math.sin(i * step + rot) * radius });
    }

    return path;
}

/**
 * @param context -
 * @param path -
 * @param radius -
 */
export function roundedPath(context: CanvasRenderingContext2D, path: ICoordinates[], radius: number): void {
    const index1 = 0,
        index2 = 1,
        increment = 1;

    let p1 = path[index1],
        p2 = path[index2];

    if (!p1 || !p2) {
        return;
    }

    const len = path.length;

    context.moveTo((p1.x + p2.x) * half, (p1.y + p2.y) * half);

    for (let i = 1; i <= len; i++) {
        p1 = p2;
        p2 = path[(i + increment) % len];

        if (!p1 || !p2) {
            continue;
        }

        context.arcTo(p1.x, p1.y, (p1.x + p2.x) * half, (p1.y + p2.y) * half, radius);
    }
}
