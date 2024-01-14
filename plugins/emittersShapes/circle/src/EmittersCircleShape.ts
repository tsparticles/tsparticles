import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import { type ICoordinates, type IDimension, getRandom } from "@tsparticles/engine";

const quarter = 0.25,
    double = 2,
    doublePI = Math.PI * double,
    squareExp = 2,
    half = 0.5;

export class EmittersCircleShape extends EmitterShapeBase {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: unknown) {
        super(position, size, fill, options);
    }

    async init(): Promise<void> {
        // nothing to do
    }

    async randomPosition(): Promise<IRandomPositionData> {
        const size = this.size,
            fill = this.fill,
            position = this.position,
            generateTheta = (x: number, y: number): number => {
                const u = getRandom() * quarter,
                    theta = Math.atan((y / x) * Math.tan(doublePI * u)),
                    v = getRandom();

                if (v < quarter) {
                    return theta;
                } else if (v < double * quarter) {
                    return Math.PI - theta;
                } else if (v < double * quarter + quarter) {
                    return Math.PI + theta;
                } else {
                    return -theta;
                }
            },
            radius = (x: number, y: number, theta: number): number =>
                (x * y) / Math.sqrt((y * Math.cos(theta)) ** squareExp + (x * Math.sin(theta)) ** squareExp),
            [a, b] = [size.width * half, size.height * half],
            randomTheta = generateTheta(a, b),
            maxRadius = radius(a, b, randomTheta),
            randomRadius = fill ? maxRadius * Math.sqrt(getRandom()) : maxRadius;

        return Promise.resolve({
            position: {
                x: position.x + randomRadius * Math.cos(randomTheta),
                y: position.y + randomRadius * Math.sin(randomTheta),
            },
        });
    }
}
