import { type ICoordinates, type IShapeDrawData, degToRad } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";

const piDeg = 180,
    origin: ICoordinates = { x: 0, y: 0 },
    sidesOffset = 2;

/**
 *
 * @param data -
 * @param start -
 * @param side -
 */
export function drawPolygon(data: IShapeDrawData, start: ICoordinates, side: ISide): void {
    const { context } = data,
        sideCount = side.count.numerator * side.count.denominator,
        decimalSides = side.count.numerator / side.count.denominator,
        interiorAngleDegrees = (piDeg * (decimalSides - sidesOffset)) / decimalSides,
        interiorAngle = Math.PI - degToRad(interiorAngleDegrees); // convert to radians

    if (!context) {
        return;
    }

    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(origin.x, origin.y);

    for (let i = 0; i < sideCount; i++) {
        context.lineTo(side.length, origin.y);
        context.translate(side.length, origin.y);
        context.rotate(interiorAngle);
    }
}
