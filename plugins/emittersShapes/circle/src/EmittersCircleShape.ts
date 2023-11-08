import { type ICoordinates, type IDimension, getRandom } from "@tsparticles/engine";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";

export class EmittersCircleShape extends EmitterShapeBase {
    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: unknown) {
        super(position, size, fill, options);
    }

    async randomPosition(): Promise<ICoordinates> {
        const size = this.size,
            fill = this.fill,
            position = this.position,
            generateTheta = (x: number, y: number): number => {
                const u = getRandom() / 4.0,
                    theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u)),
                    v = getRandom();

                if (v < 0.25) {
                    return theta;
                } else if (v < 0.5) {
                    return Math.PI - theta;
                } else if (v < 0.75) {
                    return Math.PI + theta;
                } else {
                    return -theta;
                }
            },
            radius = (x: number, y: number, theta: number): number =>
                (x * y) / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2),
            [a, b] = [size.width / 2, size.height / 2],
            randomTheta = generateTheta(a, b),
            maxRadius = radius(a, b, randomTheta),
            randomRadius = fill ? maxRadius * Math.sqrt(getRandom()) : maxRadius;

        return {
            x: position.x + randomRadius * Math.cos(randomTheta),
            y: position.y + randomRadius * Math.sin(randomTheta),
        };
    }
}
