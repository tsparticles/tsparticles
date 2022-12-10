import type { IPathData } from "./IPathData";
import { SegmentType } from "./SegmentType";

export function drawPath(ctx: CanvasRenderingContext2D, radius: number, path: IPathData): void {
    ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);

    for (let i = 0; i < path.segments.length; i++) {
        const segment = path.segments[i];

        switch (segment.type) {
            case SegmentType.line:
                ctx.lineTo(segment.values[0].x * radius, segment.values[0].y * radius);
                break;

            case SegmentType.bezier:
                ctx.bezierCurveTo(
                    segment.values[1].x * radius,
                    segment.values[1].y * radius,
                    segment.values[2].x * radius,
                    segment.values[2].y * radius,
                    segment.values[3].x * radius,
                    segment.values[3].y * radius
                );
                break;

            case SegmentType.quadratic:
                ctx.quadraticCurveTo(
                    segment.values[1].x * radius,
                    segment.values[1].y * radius,
                    segment.values[2].x * radius,
                    segment.values[2].y * radius
                );
                break;

            case SegmentType.arc:
                ctx.arc(
                    segment.values[0].x * radius,
                    segment.values[0].y * radius,
                    segment.values[1].x * radius,
                    segment.values[2].x,
                    segment.values[2].y
                );
                break;

            case SegmentType.ellipse:
                ctx.ellipse(
                    segment.values[0].x * radius,
                    segment.values[0].y * radius,
                    segment.values[1].x * radius,
                    segment.values[1].y * radius,
                    segment.values[2].x,
                    segment.values[3].x,
                    segment.values[3].y
                );
        }
    }

    if (!path.half) {
        return;
    }

    for (let i = path.segments.length - 1; i >= 0; i--) {
        const segment = path.segments[i];

        switch (segment.type) {
            case "line":
                ctx.lineTo(segment.values[0].x * -radius, segment.values[0].y * radius);
                break;

            case "bezier":
                ctx.bezierCurveTo(
                    -segment.values[2].x * radius,
                    segment.values[2].y * radius,
                    -segment.values[1].x * radius,
                    segment.values[1].y * radius,
                    -segment.values[0].x * radius,
                    segment.values[0].y * radius
                );
                break;

            case SegmentType.quadratic:
                ctx.quadraticCurveTo(
                    -segment.values[1].x * radius,
                    segment.values[1].y * radius,
                    -segment.values[2].x * radius,
                    segment.values[2].y * radius
                );
                break;
        }
    }
}
