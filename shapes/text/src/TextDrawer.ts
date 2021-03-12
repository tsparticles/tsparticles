import type { Container, IParticle, IShapeDrawer } from "tsparticles-engine";
import { isInArray, itemFromArray, loadFont } from "tsparticles-engine";
import type { ICharacterShape } from "tsparticles-engine/Options/Interfaces/Particles/Shape/ICharacterShape";

export const validTypes = ["text", "character", "char"];

interface TextParticle extends IParticle {
    text?: string;
}

/**
 * @category Shape Drawers
 */
export class TextDrawer implements IShapeDrawer {
    public getSidesCount(): number {
        return 12;
    }

    public async init(container: Container): Promise<void> {
        const options = container.options;

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t);

            if (shapeOptions instanceof Array) {
                const promises: Promise<void>[] = [];

                for (const character of shapeOptions) {
                    promises.push(loadFont(character as ICharacterShape));
                }

                await Promise.allSettled(promises);
            } else {
                if (shapeOptions !== undefined) {
                    await loadFont(shapeOptions as ICharacterShape);
                }
            }
        }
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
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
            textParticle.text =
                textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
        }

        const text = textParticle.text;
        const style = character.style ?? "";
        const weight = character.weight ?? "";
        const size = Math.round(radius) * 2;
        const font = character.font ?? "";
        const fill = particle.fill;
        const offsetX = (text.length * radius) / 2;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -offsetX,
            y: radius / 2,
        };

        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }
    }
}
