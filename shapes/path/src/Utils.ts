import type { IPathData } from "./IPathData.js";
import { SegmentType } from "./SegmentType.js";

/**
 * @param ctx -
 * @param radius -
 * @param path -
 */
export function drawPath(ctx: CanvasRenderingContext2D, radius: number, path: IPathData): void {
    const firstIndex = 0,
        firstSegment = path.segments[firstIndex],
        firstValue = firstSegment.values[firstIndex];

    ctx.moveTo(firstValue.x * radius, firstValue.y * radius);

    for (const segment of path.segments) {
        const value = segment.values[firstIndex],
            index2 = 1,
            index3 = 2,
            index4 = 3;

        switch (segment.type) {
            case SegmentType.line:
                ctx.lineTo(value.x * radius, value.y * radius);
                break;

            case SegmentType.bezier:
                ctx.bezierCurveTo(
                    segment.values[index2].x * radius,
                    segment.values[index2].y * radius,
                    segment.values[index3].x * radius,
                    segment.values[index3].y * radius,
                    segment.values[index4].x * radius,
                    segment.values[index4].y * radius,
                );
                break;

            case SegmentType.quadratic:
                ctx.quadraticCurveTo(
                    segment.values[index2].x * radius,
                    segment.values[index2].y * radius,
                    segment.values[index3].x * radius,
                    segment.values[index3].y * radius,
                );
                break;

            case SegmentType.arc:
                ctx.arc(
                    value.x * radius,
                    value.y * radius,
                    segment.values[index2].x * radius,
                    segment.values[index3].x,
                    segment.values[index3].y,
                );
                break;

            case SegmentType.ellipse:
                ctx.ellipse(
                    value.x * radius,
                    value.y * radius,
                    segment.values[index2].x * radius,
                    segment.values[index2].y * radius,
                    segment.values[index3].x,
                    segment.values[index4].x,
                    segment.values[index4].y,
                );
        }
    }

    if (!path.half) {
        return;
    }

    const lengthOffset = 1,
        minLength = 0;

    for (let i = path.segments.length - lengthOffset; i >= minLength; i--) {
        const segment = path.segments[i],
            value = segment.values[firstIndex],
            index2 = 1,
            index3 = 2;

        switch (segment.type) {
            case SegmentType.line:
                ctx.lineTo(value.x * -radius, value.y * radius);
                break;

            case SegmentType.bezier:
                ctx.bezierCurveTo(
                    -segment.values[index3].x * radius,
                    segment.values[index3].y * radius,
                    -segment.values[index2].x * radius,
                    segment.values[index2].y * radius,
                    value.x * radius,
                    value.y * radius,
                );
                break;

            case SegmentType.quadratic:
                ctx.quadraticCurveTo(
                    -segment.values[index2].x * radius,
                    segment.values[index2].y * radius,
                    -segment.values[index3].x * radius,
                    segment.values[index3].y * radius,
                );
                break;

            case SegmentType.arc:
            case SegmentType.ellipse:
            default:
                break;
        }
    }
}
