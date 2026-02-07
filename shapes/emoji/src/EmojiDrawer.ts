import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
  getRangeMax,
  isInArray,
  itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import type { EmojiParticle } from "./EmojiParticle.js";
import type { IEmojiShape } from "./IEmojiShape.js";
import { loadFont } from "@tsparticles/canvas-utils";
import { validTypes } from "./Utils.js";

const double = 2,
  defaultFont = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
  noPadding = 0,
  basePadding = 0.1;

export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
  draw(data: IShapeDrawData<EmojiParticle>): void {
    const { particle, context, radius, fill, stroke } = data,
      shapeData = particle.shapeData as IEmojiShape | undefined;

    if (!shapeData?.value) {
      return;
    }

    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);

    if (!emoji) {
      return;
    }

    const value = typeof emoji === "string" ? emoji : emoji.value,
      font = (typeof emoji === "string" ? shapeData.font : emoji.font) ?? defaultFont;

    context.font = `400 ${(radius * double).toString()}px ${font}`;
    context.textBaseline = "middle";
    context.textAlign = "center";

    if (fill) {
      context.fillText(value, noPadding, noPadding);
    }

    if (stroke) {
      context.strokeText(value, noPadding, noPadding);
    }
  }

  getDescriptor(particle: EmojiParticle): string {
    const shapeData = particle.shapeData as IEmojiShape | undefined,
      dataValue = shapeData?.value;

    if (!dataValue) {
      return "emoji";
    }

    const emoji = itemFromSingleOrMultiple(dataValue, particle.randomIndexData),
      value = typeof emoji === "string" ? emoji : emoji?.value,
      font = (typeof emoji === "string" ? shapeData.font : emoji?.font) ?? defaultFont,
      padding = (typeof emoji === "string" ? shapeData.padding : emoji?.padding) ?? noPadding,
      tint = (typeof emoji === "string" ? shapeData.tint : emoji?.tint) === true,
      maxSize = getRangeMax(particle.size.value),
      tintColor = tint ? (particle.getFillColor() ?? particle.getStrokeColor()) : undefined,
      tintKey = tintColor ? `${Math.round(tintColor.h)}:${Math.round(tintColor.s)}:${Math.round(tintColor.l)}` : "none",
      tintValueKey = tint ? `:c:${tintKey}` : "";

    return `emoji:${value}:${font}:${padding}:${tint ? "tint" : "raw"}:${maxSize}${tintValueKey}`;
  }

  getMetadata(particle: EmojiParticle): ITextureMetadata {
    const shapeData = particle.shapeData as IEmojiShape | undefined,
      dataValue = shapeData?.value;

    if (!dataValue) {
      return {
        cachePolicy: CachePolicy.Static,
        colorMode: TextureColorMode.Multi,
      };
    }

    const emoji = itemFromSingleOrMultiple(dataValue, particle.randomIndexData),
      padding = (typeof emoji === "string" ? shapeData.padding : emoji?.padding) ?? noPadding,
      tint = (typeof emoji === "string" ? shapeData.tint : emoji?.tint) === true,
      radius = particle.getRadius(),
      minPadding = radius * basePadding,
      texturePadding = Math.max(padding, minPadding);

    return {
      cachePolicy: tint ? CachePolicy.Particle : CachePolicy.Static,
      colorMode: tint ? TextureColorMode.Single : TextureColorMode.Multi,
      tintMode: tint ? "color" : undefined,
      padding: texturePadding,
    };
  }

  async init(container: Container): Promise<void> {
    const options = container.actualOptions,
      shapeData = options.particles.shape;

    if (!validTypes.some(t => isInArray(t, shapeData.type))) {
      return;
    }

    await loadFont(defaultFont);
  }

  particleInit(_container: Container, particle: EmojiParticle): void {
    const shapeData = particle.shapeData as IEmojiShape | undefined;

    if (!shapeData?.value) {
      return;
    }

    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);

    if (!emoji) {
      return;
    }

    const font = typeof emoji === "string" ? (shapeData.font ?? defaultFont) : (emoji.font ?? defaultFont);

    if (font !== defaultFont) {
      void loadFont(font);
    }

    particle.tint = (typeof emoji === "string" ? shapeData.tint : emoji.tint) === true;
  }
}
