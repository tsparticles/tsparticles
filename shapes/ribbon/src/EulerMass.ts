import { Vector } from "@tsparticles/engine";

export class EulerMass {
    drag;
    force;
    mass;
    position;
    velocity;

    constructor(x: number, y: number, mass: number, drag: number) {
        this.mass = mass;
        this.drag = drag;

        this.position = Vector.create(x, y);
        this.force = Vector.origin;
        this.velocity = Vector.origin;
    }

    addForce(force: Vector): void {
        this.force.addTo(force);
    }

    currentForce(): Vector {
        const speed = this.velocity.length;
        const totalForce = Vector.create(this.force.x, this.force.y);
        const dragVel = Vector.create(this.velocity.x, this.velocity.y);

        dragVel.multTo(this.drag * this.mass * speed);

        totalForce.subFrom(dragVel);

        return totalForce;
    }

    integrate(_dt: number): void {
        const acc = this.currentForce();

        acc.divTo(this.mass);

        const posDelta = Vector.create(this.velocity.x, this.velocity.y);

        posDelta.multTo(_dt);

        this.position.addTo(posDelta);

        acc.multTo(_dt);

        this.velocity.addTo(acc);

        this.force = Vector.origin;
    }
}
