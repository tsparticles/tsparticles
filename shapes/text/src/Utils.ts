import { type IShapeDrawData, double, half, itemFromSingleOrMultiple } from "@tsparticles/engine";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";

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
    style = character.style,
    weight = character.weight,
    size = Math.round(radius) * double,
    font = character.font;

  const lines = text?.split("\n") ?? [];

  context.font = `${style} ${weight} ${size.toString()}px "${font}"`;

  context.globalAlpha = opacity;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (!currentLine) {
      continue;
    }

    drawLine(context, currentLine, radius, opacity, i, fill, stroke);
  }

  context.globalAlpha = 1;
}

/**
 * @param context -
 * @param line -
 * @param radius -
 * @param _opacity -
 * @param index -
 * @param fill -
 * @param stroke -
 */
function drawLine(
  context: CanvasRenderingContext2D,
  line: string,
  radius: number,
  _opacity: number,
  index: number,
  fill: boolean,
  stroke: boolean,
): void {
  const offsetX = line.length * radius * half,
    pos = {
      x: -offsetX,
      y: radius * half,
    },
    diameter = radius * double;

  if (fill) {
    context.fillText(line, pos.x, pos.y + diameter * index);
  }

  if (stroke) {
    context.strokeText(line, pos.x, pos.y + diameter * index);
  }
}
