import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class TextDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        const text = particle.text;
        const character = particle.character;

        if (text === undefined || character === undefined) {
            return;
        }

        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = character.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -radius / 2,
            y: radius / 2,
        };

        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }
    }
}
