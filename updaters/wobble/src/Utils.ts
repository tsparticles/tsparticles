import type { IDelta } from "tsparticles-engine";
import type { WobbleParticle } from "./Types";

/**
 * Updates particle wobbling values
 * @param particle - the particle to update
 * @param delta - this variable contains the delta between the current frame and the previous frame
 */
export function updateWobble(particle: WobbleParticle, delta: IDelta): void {
    const { wobble: wobbleOptions } = particle.options,
        { wobble } = particle;

    if (!wobbleOptions?.enable || !wobble) {
        return;
    }

    const angleSpeed = wobble.angleSpeed * delta.factor,
        moveSpeed = wobble.moveSpeed * delta.factor,
        distance = (moveSpeed * ((particle.retina.wobbleDistance ?? 0) * delta.factor)) / (1000 / 60),
        max = 2 * Math.PI,
        { position } = particle;

    wobble.angle += angleSpeed;

    if (wobble.angle > max) {
        wobble.angle -= max;
    }

    position.x += distance * Math.cos(wobble.angle);
    position.y += distance * Math.abs(Math.sin(wobble.angle));
}
