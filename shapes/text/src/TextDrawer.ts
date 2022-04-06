import type { Container, IParticle, IShapeDrawer, SingleOrMultiple } from "tsparticles-engine";
import { isInArray, itemFromArray, loadFont } from "tsparticles-engine";
import type { ICharacterShape } from "./ICharacterShape";
import type { TextParticle } from "./TextParticle";

export const validTypes = ["text", "character", "char"];

/**
 * @category Shape Drawers
 */
export class TextDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 12;
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                .map((t) => options.particles.shape.options[t])
                .find((t) => !!t) as SingleOrMultiple<ICharacterShape>;

            if (shapeOptions instanceof Array) {
                const promises: Promise<void>[] = [];

                for (const character of shapeOptions) {
                    const charShape = character;

                    promises.push(loadFont(charShape.font, charShape.weight));
                }

                await Promise.allSettled(promises);
            } else {
                if (shapeOptions !== undefined) {
                    const charShape = shapeOptions as ICharacterShape;

                    await loadFont(charShape.font, charShape.weight);
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
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
        const weight = character.weight ?? "400";
        const size = Math.round(radius) * 2;
        const font = character.font ?? "Verdana";
        const fill = particle.fill;
        const offsetX = (text.length * radius) / 2;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -offsetX,
            y: radius / 2,
        };

        context.globalAlpha = opacity;

        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }

        context.globalAlpha = 1;
    }
}
