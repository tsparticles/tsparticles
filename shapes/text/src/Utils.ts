import { type IShapeDrawData, itemFromSingleOrMultiple } from "@tsparticles/engine";
import type { ITextShape } from "./ITextShape.js";
import type { TextParticle } from "./TextParticle.js";

const double = 2,
    half = 0.5;

/**
 *
 * @param data -
 */
export function drawText(data: IShapeDrawData<TextParticle>): void {
    const { context, particle, radius, opacity } = data,
        character = particle.shapeData as ITextShape | undefined;

    if (!character) {
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
        size = Math.round(radius) * double,
        font = character.font ?? "Verdana",
        fill = particle.shapeFill;

    const lines = text?.split("\n");

    if (!lines) {
        return;
    }

    context.font = `${style} ${weight} ${size}px "${font}"`;

    context.globalAlpha = opacity;

    for (let i = 0; i < lines.length; i++) {
        drawLine(context, lines[i], radius, opacity, i, fill);
    }

    context.globalAlpha = 1;
}

/**
 *
 * @param context -
 * @param line -
 * @param radius -
 * @param opacity -
 * @param index -
 * @param fill -
 */
function drawLine(
    context: CanvasRenderingContext2D,
    line: string,
    radius: number,
    opacity: number,
    index: number,
    fill: boolean,
): void {
    const offsetX = line.length * radius * half,
        pos = {
            x: -offsetX,
            y: radius * half,
        },
        diameter = radius * double;

    if (fill) {
        context.fillText(line, pos.x, pos.y + diameter * index);
    } else {
        context.strokeText(line, pos.x, pos.y + diameter * index);
    }
}
