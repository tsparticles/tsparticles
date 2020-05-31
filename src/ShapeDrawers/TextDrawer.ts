import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { Utils } from "../Utils";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import { ShapeType } from "../Enums";
import type { Container } from "../Core/Container";

interface TextParticle extends IParticle {
    text?: string;
}

export class TextDrawer implements IShapeDrawer {
    public async init(container: Container): Promise<void> {
        const options = container.options;

        if (
            Utils.isInArray(ShapeType.char, options.particles.shape.type) ||
            Utils.isInArray(ShapeType.character, options.particles.shape.type)
        ) {
            const shapeOptions =
                options.particles.shape.options[ShapeType.character] ?? options.particles.shape.options[ShapeType.char];
            if (shapeOptions instanceof Array) {
                for (const character of shapeOptions) {
                    await Utils.loadFont(character as ICharacterShape);
                }
            } else {
                const character =
                    options.particles.shape.options[ShapeType.character] ??
                    options.particles.shape.options[ShapeType.char];

                if (character !== undefined) {
                    await Utils.loadFont(character as ICharacterShape);
                }
            }
        }
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, _opacity: number): void {
        const character = particle.shapeData as ICharacterShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        const textParticle = particle as TextParticle;

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
