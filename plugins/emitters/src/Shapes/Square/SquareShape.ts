import type { ICoordinates, IDimension } from "tsparticles-engine";
import type { IEmitterShape } from "../../IEmitterShape";

function randomSquareCoordinate(position: number, offset: number): number {
    return position + offset * (Math.random() - 0.5);
}

export class SquareShape implements IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates {
        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, size.width),
                y: randomSquareCoordinate(position.y, size.height),
            };
        } else {
            const halfW = size.width / 2,
                halfH = size.height / 2,
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
