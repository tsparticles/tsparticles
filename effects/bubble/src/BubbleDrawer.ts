import { type IEffectDrawer, type IShapeDrawData, defaultAngle, doublePI } from "@tsparticles/engine";

const bubbleFactor = 3;

export class BubbleDrawer implements IEffectDrawer {
    drawAfter(data: IShapeDrawData): void {
        const { context, radius } = data,
            bubbleRadius = radius / bubbleFactor;

        context.beginPath();
        context.arc(bubbleRadius, -bubbleRadius, bubbleRadius, defaultAngle, doublePI, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
    }
}
