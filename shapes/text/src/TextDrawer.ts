import type { Container, IParticle, IShapeDrawer, SingleOrMultiple } from "tsparticles-engine";
import { executeOnSingleOrMultiple, isInArray, itemFromSingleOrMultiple, loadFont } from "tsparticles-engine";
import type { ICharacterShape } from "./ICharacterShape";
import type { TextParticle } from "./TextParticle";

export const validTypes = ["text", "character", "char"];

/**
 * @category Shape Drawers
 */
export class TextDrawer implements IShapeDrawer {
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
            textParticle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
        }

        const text = textParticle.text,
            style = character.style ?? "",
            weight = character.weight ?? "400",
            size = Math.round(radius) * 2,
            font = character.font ?? "Verdana",
            fill = particle.fill,
            offsetX = (text.length * radius) / 2;

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

    getSidesCount(): number {
        return 12;
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                    .map((t) => options.particles.shape.options[t])
                    .find((t) => !!t) as SingleOrMultiple<ICharacterShape>,
                promises: Promise<void>[] = [];

            executeOnSingleOrMultiple(shapeOptions, (shape) => {
                promises.push(loadFont(shape.font, shape.weight));
            });

            await Promise.all(promises);
        }
    }
}
