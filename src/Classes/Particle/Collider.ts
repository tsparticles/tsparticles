import { Utils } from "../Utils/Utils";
import { Particle } from "../Particle";

export class Collider {
    public static collide(p1: Particle, p2: Particle): void {
        if (p1 === p2) {
            return;
        }

        const dist = Utils.getDistanceBetweenCoordinates(p1.position, p2.position);
        const distP = (p1.bubble.radius || p1.size.value) + (p2.bubble.radius || p2.size.value);

        if (dist <= distP) {
            p1.resetVelocity();
            p2.resetVelocity();
        }
    }
}
