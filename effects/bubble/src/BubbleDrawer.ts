import type { IEffectDrawer, IShapeDrawData } from "@tsparticles/engine";

export class BubbleDrawer implements IEffectDrawer {
    draw(data: IShapeDrawData): void {
        const { context, radius } = data;

        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
    }
}
