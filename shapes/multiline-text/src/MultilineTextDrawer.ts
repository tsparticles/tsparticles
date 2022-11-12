import type { Container, IParticle, IShapeDrawer, SingleOrMultiple } from "tsparticles-engine";
import { executeOnSingleOrMultiple, isInArray, itemFromSingleOrMultiple, loadFont } from "tsparticles-engine";
import type { IMultilineTextShape } from "./IMultilineTextShape";
import type { MultilineTextParticle } from "./MultilineTextParticle";

export class MultilineTextDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
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
            textParticle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
        }

        const text = textParticle.text,
            style = character.style ?? "",
            weight = character.weight ?? "400",
            size = Math.round(radius) * 2,
            font = character.font ?? "Verdana",
            fill = particle.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const lines = text?.split("\n");

        if (!lines) {
            return;
        }

        context.globalAlpha = opacity;

        for (let i = 0; i < lines.length; i++) {
            this._drawLine(context, lines[i], radius, opacity, i, fill);
        }

        context.globalAlpha = 1;
    }

    async init(container: Container): Promise<void> {
        const options = container.options,
            shapeType = "multiline-text";

        if (isInArray(shapeType, options.particles.shape.type)) {
            const shapeOptions = options.particles.shape.options[shapeType] as SingleOrMultiple<IMultilineTextShape>,
                promises: Promise<void>[] = [];

            executeOnSingleOrMultiple(shapeOptions, (shape) => {
                promises.push(loadFont(shape.font, shape.weight));
            });

            await Promise.all(promises);
        }
    }

    private _drawLine(
        context: CanvasRenderingContext2D,
        line: string,
        radius: number,
        opacity: number,
        index: number,
        fill: boolean
    ): void {
        const offsetX = (line.length * radius) / 2,
            pos = {
                x: -offsetX,
                y: radius / 2,
            };

        if (fill) {
            context.fillText(line, pos.x, pos.y + radius * 2 * index);
        } else {
            context.strokeText(line, pos.x, pos.y + radius * 2 * index);
        }
    }
}
