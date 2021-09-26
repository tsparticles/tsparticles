import type { IEmitterShape } from "../../IEmitterShape";
import type { ICoordinates } from "tsparticles-engine";

function randomSquareCoordinate(position: number, offset: number): number {
    return position + offset * (Math.random() - 0.5);
}

export class SquareShape implements IEmitterShape {
    randomPosition(position: ICoordinates, offset: ICoordinates, fill: boolean): ICoordinates {
        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, offset.x),
                y: randomSquareCoordinate(position.y, offset.y),
            };
        } else {
            const halfW = offset.x / 2,
                halfH = offset.y / 2,
                side = Math.floor(Math.random() * 4),
                v = (Math.random() - 0.5) * 2;

            switch (side) {
                case 0:
                    // top-left
                    return {
                        x: position.x + v * halfW,
                        y: position.y - halfH,
                    };
                case 1:
                    // top-right
                    return {
                        x: position.x - halfW,
                        y: position.y + v * halfH,
                    };
                case 2:
                    // bottom-right
                    return {
                        x: position.x + v * halfW,
                        y: position.y + halfH,
                    };
                case 3:
                default:
                    // bottom-left
                    return {
                        x: position.x + halfW,
                        y: position.y + v * halfH,
                    };
            }
        }
    }
}
