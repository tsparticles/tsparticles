import { type ICoordinates, type IDimension, getRandom } from "@tsparticles/engine";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";

/**
 * @param position -
 * @param offset -
 * @returns the offset
 */
function randomSquareCoordinate(position: number, offset: number): number {
    return position + offset * (getRandom() - 0.5);
}

export class EmittersSquareShape extends EmitterShapeBase {
    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: unknown) {
        super(position, size, fill, options);
    }

    async init(): Promise<void> {
        // nothing to do
    }

    async randomPosition(): Promise<ICoordinates> {
        const fill = this.fill,
            position = this.position,
            size = this.size;

        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, size.width),
                y: randomSquareCoordinate(position.y, size.height),
            };
        } else {
            const halfW = size.width / 2,
                halfH = size.height / 2,
                side = Math.floor(getRandom() * 4),
                v = (getRandom() - 0.5) * 2;

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
