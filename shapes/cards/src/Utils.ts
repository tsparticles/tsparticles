import type { ICardsPath } from "./ICardsPath";
import type { ICoordinates } from "tsparticles-engine";

export function drawPath(ctx: CanvasRenderingContext2D, radius: number, halfPath: ICoordinates[][]): void {
    ctx.moveTo(halfPath[0][0].x * radius, halfPath[0][0].y * radius);

    for (let i = 0; i < halfPath.length; i++) {
        const path = halfPath[i];

        ctx.bezierCurveTo(
            path[1].x * radius,
            path[1].y * radius,
            path[2].x * radius,
            path[2].y * radius,
            path[3].x * radius,
            path[3].y * radius
        );
    }

    for (let i = halfPath.length - 1; i >= 0; i--) {
        const path = halfPath[i];

        ctx.bezierCurveTo(
            -path[2].x * radius,
            path[2].y * radius,
            -path[1].x * radius,
            path[1].y * radius,
            -path[0].x * radius,
            path[0].y * radius
        );
    }
}

const n = 1.0 / 2;

export const paths: ICardsPath = {
    heart: [
        [
            { x: 0, y: n },
            { x: 0, y: n },
            { x: n, y: 0 },
            { x: n, y: -n / 2 },
        ],
        [
            { x: n, y: -n / 2 },
            { x: n, y: -n / 2 },
            { x: n, y: -n },
            { x: n / 2, y: -n },
        ],
        [
            { x: n / 2, y: -n },
            { x: n / 2, y: -n },
            { x: 0, y: -n },
            { x: 0, y: -n / 2 },
        ],
    ],
    diamond: [
        [
            { x: 0, y: n },
            { x: 0, y: n },
            { x: (3 * n) / 4, y: 0 },
            { x: (3 * n) / 4, y: 0 },
        ],
        [
            { x: (3 * n) / 4, y: 0 },
            { x: (3 * n) / 4, y: 0 },
            { x: 0, y: -n },
            { x: 0, y: -n },
        ],
    ],
    club: [
        [
            { x: 0, y: -n },
            { x: 0, y: -n },
            { x: n / 2, y: -n },
            { x: n / 2, y: -n / 2 },
        ],
        [
            { x: n / 2, y: -n / 2 },
            { x: n / 2, y: -n / 2 },
            { x: n, y: -n / 2 },
            { x: n, y: 0 },
        ],
        [
            { x: n, y: 0 },
            { x: n, y: 0 },
            { x: n, y: n / 2 },
            { x: n / 2, y: n / 2 },
        ],
        [
            { x: n / 2, y: n / 2 },
            { x: n / 2, y: n / 2 },
            { x: n / 8, y: n / 2 },
            { x: n / 8, y: n / 8 },
        ],
        [
            { x: n / 8, y: n / 8 },
            { x: n / 8, y: n / 2 },
            { x: n / 2, y: n },
            { x: n / 2, y: n },
        ],
        [
            { x: n / 2, y: n },
            { x: n / 2, y: n },
            { x: 0, y: n },
            { x: 0, y: n },
        ],
    ],
    spade: [
        [
            { x: 0, y: -n },
            { x: 0, y: -n },
            { x: n, y: -n / 2 },
            { x: n, y: 0 },
        ],
        [
            { x: n, y: 0 },
            { x: n, y: 0 },
            { x: n, y: n / 2 },
            { x: n / 2, y: n / 2 },
        ],
        [
            { x: n / 2, y: n / 2 },
            { x: n / 2, y: n / 2 },
            { x: n / 8, y: n / 2 },
            { x: n / 8, y: n / 8 },
        ],
        [
            { x: n / 8, y: n / 8 },
            { x: n / 8, y: n / 2 },
            { x: n / 2, y: n },
            { x: n / 2, y: n },
        ],
        [
            { x: n / 2, y: n },
            { x: n / 2, y: n },
            { x: 0, y: n },
            { x: 0, y: n },
        ],
    ],
};
