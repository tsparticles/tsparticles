import type { IEmitterShape } from "../../IEmitterShape";
import type { ICoordinates } from "../../../../Core";

export class CircleShape implements IEmitterShape {
    randomPosition(position: ICoordinates, offset: ICoordinates, fill: boolean): ICoordinates {
        const generateTheta = (x: number, y: number): number => {
            const u = Math.random() / 4.0;
            const theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u));

            const v = Math.random();

            if (v < 0.25) {
                return theta;
            } else if (v < 0.5) {
                return Math.PI - theta;
            } else if (v < 0.75) {
                return Math.PI + theta;
            } else {
                return -theta;
            }
        };

        const radius = (x: number, y: number, theta: number): number =>
            (x * y) / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2);

        const [a, b] = [offset.x / 2, offset.y / 2];

        const randomTheta = generateTheta(a, b),
            maxRadius = radius(a, b, randomTheta),
            randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;

        return {
            x: position.x + randomRadius * Math.cos(randomTheta),
            y: position.y + randomRadius * Math.sin(randomTheta),
        };
    }
}
