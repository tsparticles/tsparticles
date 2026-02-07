import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  type SingleOrMultiple,
  TextureColorMode,
  double,
  executeOnSingleOrMultiple,
  half,
  isInArray,
  itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import { drawText, validTypes } from "./Utils.js";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";
import { loadFont } from "@tsparticles/canvas-utils";

const firstItem = 0,
  minLength = 0,
  minPadding = 0,
  lengthOffset = 1,
  lineHeightFactor = 1.2,
  extraPaddingFactor = 1,
  radiusFactor = 10;

/**
 * Multiline text drawer
 */
export class TextDrawer implements IShapeDrawer<TextParticle> {
  draw(data: IShapeDrawData<TextParticle>): void {
    drawText(data);
  }

  getDescriptor(particle: TextParticle): string {
    const character = particle.shapeData as ITextShape | undefined,
      textData = character?.value,
      text = particle.text ?? (textData ? itemFromSingleOrMultiple(textData, particle.randomIndexData) : ""),
      font = character?.font ?? "text",
      style = character?.style ?? "normal",
      weight = character?.weight ?? "normal",
      radius = particle.getRadius(),
      lines = text?.split("\n") ?? [],
      maxLineLength = lines.reduce((max, line) => Math.max(max, line.length), minLength),
      lineCount = lines.length,
      radiusKey = Math.round(radius * radiusFactor) / radiusFactor;

    return `text:${font}:${style}:${weight}:${text ?? ""}:${maxLineLength}:${lineCount}:${radiusKey}`;
  }

  getMetadata(particle: TextParticle): ITextureMetadata {
    const character = particle.shapeData as ITextShape | undefined,
      textData = character?.value,
      text = particle.text ?? (textData ? itemFromSingleOrMultiple(textData, particle.randomIndexData) : "");

    if (!text) {
      return {
        cachePolicy: CachePolicy.Dynamic,
        colorMode: TextureColorMode.Single,
      };
    }

    const lines = text.split("\n"),
      radius = particle.getRadius(),
      maxLineLength = lines.reduce((max, line) => Math.max(max, line.length), minLength),
      lineHeight = radius * double * lineHeightFactor,
      paddingX = Math.max(minPadding, maxLineLength * radius * half - radius),
      paddingY = Math.max(minPadding, (lines.length - lengthOffset) * lineHeight),
      padding = Math.max(paddingX, paddingY) + radius * extraPaddingFactor;

    return {
      cachePolicy: CachePolicy.Dynamic,
      colorMode: TextureColorMode.Single,
      padding,
    };
  }

  async init(container: Container): Promise<void> {
    const options = container.actualOptions;

    if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map(t => options.particles.shape.options[t])[
          firstItem
        ] as SingleOrMultiple<ITextShape>,
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

    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
}
