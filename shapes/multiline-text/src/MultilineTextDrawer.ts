import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    isInArray,
    itemFromSingleOrMultiple,
    loadFont,
} from "@tsparticles/engine";
import type { IMultilineTextShape } from "./IMultilineTextShape.js";
import type { MultilineTextParticle } from "./MultilineTextParticle.js";

export const validTypes = ["text", "character", "char", "multiline-text"];

/**
 * Multiline text drawer
 */
export class MultilineTextDrawer implements IShapeDrawer<MultilineTextParticle> {
    draw(data: IShapeDrawData<MultilineTextParticle>): void {
        const { context, particle, radius, opacity } = data,
            character = particle.shapeData as IMultilineTextShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        if (particle.text === undefined) {
            particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
        }

        const text = particle.text,
            style = character.style ?? "",
            weight = character.weight ?? "400",
            size = Math.round(radius) * 2,
            font = character.font ?? "Verdana",
            fill = particle.fill;

        const lines = text?.split("\n");

        if (!lines) {
            return;
        }

        context.font = `${style} ${weight} ${size}px "${font}"`;

        context.globalAlpha = opacity;

        for (let i = 0; i < lines.length; i++) {
            this._drawLine(context, lines[i], radius, opacity, i, fill);
        }

        context.globalAlpha = 1;
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                    .map((t) => options.particles.shape.options[t])
                    .find((t) => !!t) as SingleOrMultiple<IMultilineTextShape>,
                promises: Promise<void>[] = [];

            executeOnSingleOrMultiple(shapeOptions, (shape) => {
                promises.push(loadFont(shape.font, shape.weight));
            });

            await Promise.all(promises);
        }
    }

    /**
     * Loads the text shape to the given particle
     * @param container - the particles container
     * @param particle - the particle loading the text shape
     */
    particleInit(container: Container, particle: MultilineTextParticle): void {
        if (!particle.shape || !validTypes.includes(particle.shape)) {
            return;
        }

        const character = particle.shapeData as IMultilineTextShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }

    private readonly _drawLine: (
        context: CanvasRenderingContext2D,
        line: string,
        radius: number,
        opacity: number,
        index: number,
        fill: boolean,
    ) => void = (context, line, radius, opacity, index, fill) => {
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
    };
}
