import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class ImageDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        if (!context) {
            return;
        }

        const imgObj = particle.image?.data.obj;

        if (!imgObj) {
            return;
        }

        let ratio = 1;

        if (particle.image) {
            ratio = particle.image.ratio;
        }

        const pos = {
            x: -radius,
            y: -radius,
        };

        context.globalAlpha = opacity;
        context.drawImage(imgObj, pos.x, pos.y, radius * 2, radius * 2 / ratio);
        context.globalAlpha = 1;
    }
}
