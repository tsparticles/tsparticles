import type { IEffectDrawer, IShapeDrawData } from "@tsparticles/engine";

const bubbleFactor = 3,
    minAngle = 0,
    double = 2,
    maxAngle = Math.PI * double;

export class BubbleDrawer implements IEffectDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { context, radius } = data;

        context.beginPath();
        context.arc(radius / bubbleFactor, -radius / bubbleFactor, radius / bubbleFactor, minAngle, maxAngle, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();

        await Promise.resolve();
    }
}
