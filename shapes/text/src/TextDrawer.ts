import {
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  isInArray,
  itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import { drawText, validTypes } from "./Utils.js";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";
import { loadFont } from "@tsparticles/canvas-utils";

const firstIndex = 0,
  minLength = 0;

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
   * @param _container - the particles container
   * @param particle - the particle loading the text shape
   */
  particleInit(_container: Container, particle: TextParticle): void {
    if (!particle.shape || !validTypes.includes(particle.shape)) {
      return;
    }

    const character = particle.shapeData as ITextShape | undefined;

    if (character === undefined) {
      return;
    }

    const textData = character.value;

    if (!textData) {
      return;
    }

    particle.textLines = itemFromSingleOrMultiple(textData, particle.randomIndexData)?.split("\n") ?? [];
    particle.maxTextLength = particle.textLines.length
      ? Math.max(...particle.textLines.map(t => t.length))
      : (particle.textLines[firstIndex]?.length ?? minLength);
  }
}
