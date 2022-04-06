import type { ICoordinates, IDimension } from "tsparticles-engine";
import type { IEmitterShape } from "../../IEmitterShape";

export class CircleShape implements IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates {
        const generateTheta = (x: number, y: number): number => {
                const u = Math.random() / 4.0,
                    theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u)),
                    v = Math.random();

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
            randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;

        return {
            x: position.x + randomRadius * Math.cos(randomTheta),
            y: position.y + randomRadius * Math.sin(randomTheta),
        };
    }
}
