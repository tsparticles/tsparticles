import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class TextDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        const text = data.particle.text;
        const character = data.particle.character;

        if (text === undefined || character === undefined) {
            return;
        }

        const style = character.style;
        const weight = character.weight;
        const size = Math.round(data.radius) * 2;
        const font = character.font;
        const fill = character.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -data.radius / 2,
            y: data.radius / 2,
        };

        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }
    }

    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}
