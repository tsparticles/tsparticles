import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";
import { Utils } from "../Utils/Utils";
import type { ICharacterShape } from "../../Interfaces/Options/Particles/Shape/ICharacterShape";

interface ITextParticle extends IParticle {
    text?: string;
}

export class TextDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        const character = particle.shapeData as ICharacterShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        const textParticle = particle as ITextParticle;

        if (textParticle.text === undefined) {
            if (textData instanceof Array) {
                textParticle.text = Utils.itemFromArray(textData, particle.randomIndexData);
            } else {
                textParticle.text = textData;
            }
        }

        const text = textParticle.text;
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = particle.fill;

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
