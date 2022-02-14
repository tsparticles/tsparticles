import type { Container, IParticle, IShapeDrawer, SingleOrMultiple } from "tsparticles-engine";
import { isInArray, itemFromArray, loadFont } from "tsparticles-engine";
import type { IMultilineTextShape } from "./IMultilineTextShape";
import { MultilineTextParticle } from "./MultilineTextParticle";

export class MultilineTextDrawer implements IShapeDrawer {
    async init(container: Container): Promise<void> {
        const options = container.options;
        const shapeType = "multiline-text";

        if (isInArray(shapeType, options.particles.shape.type)) {
            const shapeOptions = options.particles.shape.options[shapeType] as SingleOrMultiple<IMultilineTextShape>;
            if (shapeOptions instanceof Array) {
                for (const character of shapeOptions) {
                    await loadFont(character.font, character.weight);
                }
            } else {
                if (shapeOptions !== undefined) {
                    await loadFont(shapeOptions.font, shapeOptions.weight);
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const character = particle.shapeData as IMultilineTextShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        const textParticle = particle as MultilineTextParticle;

        if (textParticle.text === undefined) {
            textParticle.text =
                textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
        }

        const text = textParticle.text;
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = particle.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        if (fill) {
            text?.split("\n").forEach((line, index) => {
                const offsetX = (line.length * radius) / 2;

                const pos = {
                    x: -offsetX,
                    y: radius / 2,
                };

                context.fillText(line, pos.x, pos.y + radius * 2 * index);
            });
        } else {
            text?.split("\n").forEach((line, index) => {
                const offsetX = (line.length * radius) / 2;

                const pos = {
                    x: -offsetX,
                    y: radius / 2,
                };

                context.strokeText(line, pos.x, pos.y + radius * 2 * index);
            });
        }
    }
}
