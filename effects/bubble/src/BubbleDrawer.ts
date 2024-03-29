import type { IEffectDrawer, IShapeDrawData } from "@tsparticles/engine";

const bubbleFactor = 3,
    minAngle = 0,
    double = 2,
    maxAngle = Math.PI * double;

export class BubbleDrawer implements IEffectDrawer {
    draw(data: IShapeDrawData): void {
        const { context, radius } = data,
            bubbleRadius = radius / bubbleFactor;

        context.beginPath();
        context.arc(bubbleRadius, -bubbleRadius, bubbleRadius, minAngle, maxAngle, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
    }
}
