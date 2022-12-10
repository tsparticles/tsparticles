import type { ICardsPath, IPath } from "./ICardsPath";

export function drawPath(ctx: CanvasRenderingContext2D, radius: number, path: IPath): void {
    if (!path.segments.length || !path.segments[0].values.length) {
        return;
    }

    ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);

    for (let i = 0; i < path.segments.length; i++) {
        const segment = path.segments[i];

        ctx.bezierCurveTo(
            segment.values[1].x * radius,
            segment.values[1].y * radius,
            segment.values[2].x * radius,
            segment.values[2].y * radius,
            segment.values[3].x * radius,
            segment.values[3].y * radius
        );
    }

    for (let i = path.segments.length - 1; i >= 0; i--) {
        const segment = path.segments[i];

        ctx.bezierCurveTo(
            -segment.values[2].x * radius,
            segment.values[2].y * radius,
            -segment.values[1].x * radius,
            segment.values[1].y * radius,
            -segment.values[0].x * radius,
            segment.values[0].y * radius
        );
    }
}

const n = 1.0 / 2;

export const paths: ICardsPath = {
    heart: {
        segments: [
            {
                values: [
                    { x: 0, y: n },
                    { x: 0, y: n },
                    { x: n, y: 0 },
                    { x: n, y: -n / 2 },
                ],
            },
            {
                values: [
                    { x: n, y: -n / 2 },
                    { x: n, y: -n / 2 },
                    { x: n, y: -n },
                    { x: n / 2, y: -n },
                ],
            },
            {
                values: [
                    { x: n / 2, y: -n },
                    { x: n / 2, y: -n },
                    { x: 0, y: -n },
                    { x: 0, y: -n / 2 },
                ],
            },
        ],
    },
    diamond: {
        segments: [
            {
                values: [
                    { x: 0, y: n },
                    { x: 0, y: n },
                    { x: (3 * n) / 4, y: 0 },
                    { x: (3 * n) / 4, y: 0 },
                ],
            },
            {
                values: [
                    { x: (3 * n) / 4, y: 0 },
                    { x: (3 * n) / 4, y: 0 },
                    { x: 0, y: -n },
                    { x: 0, y: -n },
                ],
            },
        ],
    },
    club: {
        segments: [
            {
                values: [
                    { x: 0, y: -n },
                    { x: 0, y: -n },
                    { x: n / 2, y: -n },
                    { x: n / 2, y: -n / 2 },
                ],
            },
            {
                values: [
                    { x: n / 2, y: -n / 2 },
                    { x: n / 2, y: -n / 2 },
                    { x: n, y: -n / 2 },
                    { x: n, y: 0 },
                ],
            },
            {
                values: [
                    { x: n, y: 0 },
                    { x: n, y: 0 },
                    { x: n, y: n / 2 },
                    { x: n / 2, y: n / 2 },
                ],
            },
            {
                values: [
                    { x: n / 2, y: n / 2 },
                    { x: n / 2, y: n / 2 },
                    { x: n / 8, y: n / 2 },
                    { x: n / 8, y: n / 8 },
                ],
            },
            {
                values: [
                    { x: n / 8, y: n / 8 },
                    { x: n / 8, y: n / 2 },
                    { x: n / 2, y: n },
                    { x: n / 2, y: n },
                ],
            },
            {
                values: [
                    { x: n / 2, y: n },
                    { x: n / 2, y: n },
                    { x: 0, y: n },
                    { x: 0, y: n },
                ],
            },
        ],
    },
    spade: {
        segments: [
            {
                values: [
                    { x: 0, y: -n },
                    { x: 0, y: -n },
                    { x: n, y: -n / 2 },
                    { x: n, y: 0 },
                ],
            },
            {
                values: [
                    { x: n, y: 0 },
                    { x: n, y: 0 },
                    { x: n, y: n / 2 },
                    { x: n / 2, y: n / 2 },
                ],
            },
            {
                values: [
                    { x: n / 2, y: n / 2 },
                    { x: n / 2, y: n / 2 },
                    { x: n / 8, y: n / 2 },
                    { x: n / 8, y: n / 8 },
                ],
            },
            {
                values: [
                    { x: n / 8, y: n / 8 },
                    { x: n / 8, y: n / 2 },
                    { x: n / 2, y: n },
                    { x: n / 2, y: n },
                ],
            },
            {
                values: [
                    { x: n / 2, y: n },
                    { x: n / 2, y: n },
                    { x: 0, y: n },
                    { x: 0, y: n },
                ],
            },
        ],
    },
};
