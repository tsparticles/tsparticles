import {
    type Container,
    type IShapeDrawer,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    isInArray,
    itemFromSingleOrMultiple,
    loadFont,
} from "@tsparticles/engine";
import type { ICharacterShape } from "./ICharacterShape.js";
import type { TextParticle } from "./TextParticle.js";

export const validTypes = ["text", "character", "char"];

/**
 */
export class TextDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: TextParticle, radius: number, opacity: number): void {
        const character = particle.shapeData as ICharacterShape;

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

    /**
     * Loads the text shape to the given particle
     * @param container - the particles container
     * @param particle - the particle loading the text shape
     */
    particleInit(container: Container, particle: TextParticle): void {
        if (!particle.shape || !validTypes.includes(particle.shape)) {
            return;
        }

        const character = particle.shapeData as ICharacterShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
}
