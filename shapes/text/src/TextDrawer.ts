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
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";
import { drawText } from "./Utils.js";

export const validTypes = ["text", "character", "char", "multiline-text"];

/**
 * Multiline text drawer
 */
export class TextDrawer implements IShapeDrawer<TextParticle> {
    draw(data: IShapeDrawData<TextParticle>): void {
        drawText(data);
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;

        if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                    .map(t => options.particles.shape.options[t])
                    .find(t => !!t) as SingleOrMultiple<ITextShape>,
                promises: Promise<void>[] = [];

            executeOnSingleOrMultiple(shapeOptions, shape => {
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

        const character = particle.shapeData as ITextShape | undefined;

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
