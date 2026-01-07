/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { ICardsPath, IPath } from "./ICardsPath.js";
import type { IShapeDrawData } from "@tsparticles/engine";

/**
 * @param data -
 * @param path -
 */
export function drawPath(data: IShapeDrawData, path: IPath): void {
    if (!path.segments.length || !path.segments[0]!.values.length) {
        return;
    }

    const { context, radius } = data;

    context.moveTo(path.segments[0]!.values[0]!.x * radius, path.segments[0]!.values[0]!.y * radius);

    for (const segment of path.segments) {
        context.bezierCurveTo(
            segment.values[1]!.x * radius,
            segment.values[1]!.y * radius,
            segment.values[2]!.x * radius,
            segment.values[2]!.y * radius,
            segment.values[3]!.x * radius,
            segment.values[3]!.y * radius,
        );
    }

    for (let i = path.segments.length - 1; i >= 0; i--) {
        const segment = path.segments[i];

        context.bezierCurveTo(
            -segment!.values[2]!.x * radius,
            segment!.values[2]!.y * radius,
            -segment!.values[1]!.x * radius,
            segment!.values[1]!.y * radius,
            -segment!.values[0]!.x * radius,
            segment!.values[0]!.y * radius,
        );
    }
}

const n = 0.5;

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
