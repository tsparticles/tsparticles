import { type IShapeDrawData, double, half, itemFromSingleOrMultiple, originPoint } from "@tsparticles/engine";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";

export const validTypes = ["text", "character", "char", "multiline-text"];

const lineHeightFactor = 1.2,
  lengthOffset = 1,
  defaultFont = "Verdana",
  defaultStyle = "",
  defaultWeight = "400";

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

  particle.text ??= itemFromSingleOrMultiple(textData, particle.randomIndexData);

  const text = particle.text,
    style = character.style ?? defaultStyle,
    weight = character.weight ?? defaultWeight,
    size = Math.round(radius) * double,
    font = character.font ?? defaultFont,
    lines = text?.split("\n") ?? [];

  context.font = `${style} ${weight} ${size.toString()}px "${font}"`;
  context.textBaseline = "middle";
  context.textAlign = "center";

  const originalGlobalAlpha = context.globalAlpha;

  context.globalAlpha = opacity;

  const lineHeight = size * lineHeightFactor,
    totalHeight = (lines.length - lengthOffset) * lineHeight,
    startY = -totalHeight * half;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (!currentLine) {
      continue;
    }

    drawTextLine(context, currentLine, startY, lineHeight, i, fill, stroke);
  }

  context.globalAlpha = originalGlobalAlpha;
}

/**
 * @param context -
 * @param line -
 * @param startY -
 * @param lineHeight -
 * @param index -
 * @param fill -
 * @param stroke -
 */
function drawTextLine(
  context: CanvasRenderingContext2D,
  line: string,
  startY: number,
  lineHeight: number,
  index: number,
  fill: boolean,
  stroke: boolean,
): void {
  const y = startY + lineHeight * index;

  if (fill) {
    context.fillText(line, originPoint.x, y);
  }

  if (stroke) {
    context.strokeText(line, originPoint.x, y);
  }
}
