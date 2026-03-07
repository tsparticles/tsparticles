import { type IShapeDrawData, double, half, itemFromSingleOrMultiple } from "@tsparticles/engine";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";

export const validTypes = ["text", "character", "char", "multiline-text"];

const firstIndex = 0,
  minLength = 0;

/**
 *
 * @param data -
 */
export function drawText(data: IShapeDrawData<TextParticle>): void {
  const { context, particle, fill, stroke, radius, opacity } = data,
    character = particle.shapeData as ITextShape | undefined;

  if (!character) {
    return;
  }

  const textData = character.value;

  particle.textLines ??= itemFromSingleOrMultiple(textData, particle.randomIndexData)?.split("\n") ?? [];
  particle.maxTextLength ??= particle.textLines.length
    ? Math.max(...particle.textLines.map(t => t.length))
    : (particle.textLines[firstIndex]?.length ?? minLength);

  if (!particle.textLines.length || !particle.maxTextLength) {
    return;
  }

  const lines = particle.textLines,
    style = character.style ?? "",
    weight = character.weight ?? "400",
    font = character.font ?? "Verdana",
    size = (Math.round(radius) * double) / (lines.length * particle.maxTextLength);

  context.font = `${style} ${weight} ${size.toString()}px "${font}"`;

  const originalGlobalAlpha = context.globalAlpha;

  context.globalAlpha = opacity;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (!currentLine) {
      continue;
    }

    drawTextLine(context, currentLine, size, i, fill, stroke);
  }

  context.globalAlpha = originalGlobalAlpha;
}

/**
 * @param context -
 * @param line -
 * @param size -
 * @param index -
 * @param fill -
 * @param stroke -
 */
function drawTextLine(
  context: CanvasRenderingContext2D,
  line: string,
  size: number,
  index: number,
  fill: boolean,
  stroke: boolean,
): void {
  const pos = {
    x: -(line.length * size * half),
    y: size * half + index * size,
  };

  if (fill) {
    context.fillText(line, pos.x, pos.y);
  }

  if (stroke) {
    context.strokeText(line, pos.x, pos.y);
  }
}
