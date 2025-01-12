import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import { type ICoordinates, type IDimension, double, getRandom, half } from "@tsparticles/engine";

const sides = 4;

enum Sides {
    TopLeft = 0,
    TopRight = 1,
    BottomRight = 2,
    BottomLeft = 3,
}

/**
 * @param position -
 * @param offset -
 * @returns the offset
 */
function randomSquareCoordinate(position: number, offset: number): number {
    return position + offset * (getRandom() - half);
}

export class EmittersSquareShape extends EmitterShapeBase {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: unknown) {
        super(position, size, fill, options);
    }

    async init(): Promise<void> {
        // nothing to do
    }

    randomPosition(): IRandomPositionData {
        const fill = this.fill,
            position = this.position,
            size = this.size;

        if (fill) {
            return {
                position: {
                    x: randomSquareCoordinate(position.x, size.width),
                    y: randomSquareCoordinate(position.y, size.height),
                },
            };
        } else {
            const halfW = size.width * half,
                halfH = size.height * half,
                side = Math.floor(getRandom() * sides) as Sides,
                v = (getRandom() - half) * double;

            switch (side) {
                case Sides.TopLeft:
                    // top-left
                    return {
                        position: {
                            x: position.x + v * halfW,
                            y: position.y - halfH,
                        },
                    };
                case Sides.TopRight:
                    // top-right
                    return {
                        position: {
                            x: position.x - halfW,
                            y: position.y + v * halfH,
                        },
                    };
                case Sides.BottomRight:
                    // bottom-right
                    return {
                        position: {
                            x: position.x + v * halfW,
                            y: position.y + halfH,
                        },
                    };
                case Sides.BottomLeft:
                default:
                    // bottom-left
                    return {
                        position: {
                            x: position.x + halfW,
                            y: position.y + v * halfH,
                        },
                    };
            }
        }
    }
}
