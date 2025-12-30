import type { IPathData } from "./IPathData.js";
import { SegmentType } from "./SegmentType.js";

/**
 * @param ctx -
 * @param radius -
 * @param path -
 */
export function drawPath(ctx: CanvasRenderingContext2D, radius: number, path: IPathData): void {
    const firstIndex = 0,
        firstSegment = path.segments[firstIndex];

    if (!firstSegment) {
        return;
    }

    const firstValue = firstSegment.values[firstIndex];

    if (!firstValue) {
        return;
    }

    ctx.moveTo(firstValue.x * radius, firstValue.y * radius);

    for (const segment of path.segments) {
        const value = segment.values[firstIndex],
            index2 = 1,
            index3 = 2,
            index4 = 3;

        if (!value) {
            continue;
        }

        const segmentValue2 = segment.values[index2],
            segmentValue3 = segment.values[index3],
            segmentValue4 = segment.values[index4];

        switch (segment.type) {
            case SegmentType.line:
                ctx.lineTo(value.x * radius, value.y * radius);
                break;

            case SegmentType.bezier:
                if (!segmentValue2 || !segmentValue3 || !segmentValue4) {
                    break;
                }

                ctx.bezierCurveTo(
                    segmentValue2.x * radius,
                    segmentValue2.y * radius,
                    segmentValue3.x * radius,
                    segmentValue3.y * radius,
                    segmentValue4.x * radius,
                    segmentValue4.y * radius,
                );
                break;

            case SegmentType.quadratic:
                if (!segmentValue2 || !segmentValue3) {
                    break;
                }

                ctx.quadraticCurveTo(
                    segmentValue2.x * radius,
                    segmentValue2.y * radius,
                    segmentValue3.x * radius,
                    segmentValue3.y * radius,
                );
                break;

            case SegmentType.arc:
                if (!segmentValue2 || !segmentValue3) {
                    break;
                }

                ctx.arc(value.x * radius, value.y * radius, segmentValue2.x * radius, segmentValue3.x, segmentValue3.y);
                break;

            case SegmentType.ellipse:
                if (!segmentValue2 || !segmentValue3 || !segmentValue4) {
                    break;
                }

                ctx.ellipse(
                    value.x * radius,
                    value.y * radius,
                    segmentValue2.x * radius,
                    segmentValue2.y * radius,
                    segmentValue3.x,
                    segmentValue4.x,
                    segmentValue4.y,
                );
        }
    }

    if (!path.half) {
        return;
    }

    const lengthOffset = 1,
        minLength = 0;

    for (let i = path.segments.length - lengthOffset; i >= minLength; i--) {
        const segment = path.segments[i];

        if (!segment) {
            continue;
        }

        const value = segment.values[firstIndex],
            index2 = 1,
            index3 = 2,
            segmentValue2 = segment.values[index2],
            segmentValue3 = segment.values[index3];

        switch (segment.type) {
            case SegmentType.line:
                if (!value) {
                    break;
                }

                ctx.lineTo(value.x * -radius, value.y * radius);

                break;

            case SegmentType.bezier:
                if (!value || !segmentValue2 || !segmentValue3) {
                    break;
                }

                ctx.bezierCurveTo(
                    -segmentValue3.x * radius,
                    segmentValue3.y * radius,
                    -segmentValue2.x * radius,
                    segmentValue2.y * radius,
                    value.x * radius,
                    value.y * radius,
                );
                break;

            case SegmentType.quadratic:
                if (!segmentValue2 || !segmentValue3) {
                    break;
                }

                ctx.quadraticCurveTo(
                    -segmentValue2.x * radius,
                    segmentValue2.y * radius,
                    -segmentValue3.x * radius,
                    segmentValue3.y * radius,
                );

                break;

            case SegmentType.arc:
            case SegmentType.ellipse:
            default:
                break;
        }
    }
}
