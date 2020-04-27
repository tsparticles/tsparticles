import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class ImageDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        if (!context) {
            return;
        }

        const image = particle.image;
        const element = image?.data?.element;

        if (!element) {
            return;
        }

        const ratio = image?.ratio ?? 1;

        const pos = {
            x: -radius,
            y: -radius,
        };

        context.globalAlpha = opacity;
        context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
        context.globalAlpha = 1;
    }
}
