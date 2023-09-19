import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

export class HeartDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, radius } = data;

        const x = -radius,
            y = -radius;

        context.moveTo(x, y + radius / 2);
        context.quadraticCurveTo(x, y, x + radius / 2, y);
        context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 2);
        context.quadraticCurveTo(x + radius, y, x + (radius * 3) / 2, y);
        context.quadraticCurveTo(x + radius * 2, y, x + radius * 2, y + radius / 2);
        context.quadraticCurveTo(x + radius * 2, y + radius, x + (radius * 3) / 2, y + (radius * 3) / 2);
        context.lineTo(x + radius, y + radius * 2);
        context.lineTo(x + radius / 2, y + (radius * 3) / 2);
        context.quadraticCurveTo(x, y + radius, x, y + radius / 2);
    }
}
