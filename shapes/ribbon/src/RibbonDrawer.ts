import type { Container, IDelta, IShapeDrawer } from "@tsparticles/engine";
import {
    Vector,
    getDistance,
    getHslFromAnimation,
    getRandom,
    getRangeValue,
    getStyleFromHsl,
} from "@tsparticles/engine";
import { EulerMass } from "./EulerMass";
import type { IRibbonShapeData } from "./IRibbonShapeData";
import type { RibbonParticle } from "./RibbonParticle";

/**
 * @category Shape Drawers
 */
export class RibbonDrawer implements IShapeDrawer {
    draw(
        context: CanvasRenderingContext2D,
        particle: RibbonParticle,
        radius: number,
        opacity: number,
        delta: IDelta,
        ratio: number
    ): void {
        //this._update(particle, delta);

        if (!particle.ribbonLength || !particle.ribbonSteps || !particle.ribbonOffset) {
            console.log("missing data");

            return;
        }

        for (let i = 0; i < particle.ribbonLength - 1; i++) {
            const step0 = particle.ribbonSteps[i],
                step1 = particle.ribbonSteps[i + 1],
                p0 = Vector.create(
                    step0.position.x + particle.ribbonOffset.x,
                    step0.position.y + particle.ribbonOffset.y
                ),
                p1 = Vector.create(
                    step1.position.x + particle.ribbonOffset.x,
                    step1.position.y + particle.ribbonOffset.y
                );

            if (this._side(step0.position.x, step0.position.y, step1.position.x, step1.position.y, p1.x, p1.y) < 0) {
                const hsl = getHslFromAnimation(particle.color);

                if (!hsl) {
                    return;
                }

                const style = getStyleFromHsl(hsl);

                context.fillStyle = style;
                context.strokeStyle = style;
            } else {
                const hsl = particle.backColor;

                if (!hsl) {
                    return;
                }

                const style = getStyleFromHsl(hsl);

                context.fillStyle = style;
                context.strokeStyle = style;
            }

            if (i == 0) {
                context.beginPath();

                context.moveTo(step0.position.x * ratio, step0.position.y * ratio);

                context.lineTo(step1.position.x * ratio, step1.position.y * ratio);
                context.lineTo((step1.position.x + p1.x) * 0.5 * ratio, (step1.position.y + p1.y) * 0.5 * ratio);

                context.closePath();

                context.stroke();
                context.fill();

                context.beginPath();

                context.moveTo(p1.x * ratio, p1.y * ratio);

                context.lineTo(p0.x * ratio, p0.y * ratio);
                context.lineTo((step1.position.x + p1.x) * 0.5 * ratio, (step1.position.y + p1.y) * 0.5 * ratio);

                context.closePath();

                context.stroke();
                context.fill();
            } else if (i == particle.ribbonLength - 2) {
                context.beginPath();

                context.moveTo(step0.position.x * ratio, step0.position.y * ratio);

                context.lineTo(step1.position.x * ratio, step1.position.y * ratio);
                context.lineTo((step0.position.x + p0.x) * 0.5 * ratio, (step0.position.y + p0.y) * 0.5 * ratio);

                context.closePath();

                context.stroke();
                context.fill();

                context.beginPath();

                context.moveTo(p1.x * ratio, p1.y * ratio);

                context.lineTo(p0.x * ratio, p0.y * ratio);
                context.lineTo((step0.position.x + p0.x) * 0.5 * ratio, (step0.position.y + p0.y) * 0.5 * ratio);

                context.closePath();

                context.stroke();
                context.fill();
            } else {
                context.beginPath();

                context.moveTo(step0.position.x * ratio, step0.position.y * ratio);

                context.lineTo(step1.position.x * ratio, step1.position.y * ratio);
                context.lineTo(p1.x * ratio, p1.y * ratio);
                context.lineTo(p0.x * ratio, p0.y * ratio);

                context.closePath();

                context.stroke();
                context.fill();
            }
        }
    }

    getSidesCount(): number {
        return 12;
    }

    particleInit(container: Container, particle: RibbonParticle): void {
        const shapeData = particle.shapeData as IRibbonShapeData,
            length = shapeData?.length ?? 30,
            distance = shapeData?.distance ?? 4;

        const angle = (Math.PI / 180) * 45;

        particle.ribbonStepDistance = getRangeValue(distance);
        particle.ribbonLength = getRangeValue(length);

        const thickness = particle.getRadius();

        particle.ribbonOffset = {
            x: Math.cos(angle) * thickness,
            y: Math.sin(angle) * thickness,
        };

        particle.ribbonDrag = 0.05;
        particle.ribbonSteps = [];

        for (let i = 0; i < particle.ribbonLength; i++) {
            particle.ribbonSteps[i] = new EulerMass(
                0,
                0 - i * (particle.ribbonStepDistance ?? 0),
                particle.size.value,
                particle.ribbonDrag ?? 0
            );
        }
    }

    /*private _reset(particle: RibbonParticle): void {
        particle.position.y = -getRandom() * particle.container.canvas.size.height
        particle.position.x = getRandom() * particle.container.canvas.size.width

        particle.prevPosition = Vector.create(particle.position.x, particle.position.y)

        particle.velocityInherit = getRandom() * 2 + 4
        particle.time = getRandom() * 100
        particle.oscillationSpeed = getRandom() * 2.0 + 1.5
        particle.oscillationDistance = getRandom() * 40 + 40
        particle.ySpeed = getRandom() * 40 + 80

        particle.ribbonSteps = []

        if (!particle.ribbonLength) {
            return;
        }

        for (let i = 0; i < particle.ribbonLength; i++) {
            particle.ribbonSteps[i] = new EulerMass(
                particle.position.x,
                particle.position.y - i * (particle.ribbonStepDistance ?? 0),
                particle.size.value,
                (particle.ribbonDrag ?? 0),
            )
        }
    }*/

    private _side(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
        return (x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2);
    }

    /*private _update(particle: RibbonParticle, delta: IDelta): void {
        if (!particle.ribbonSteps || !particle.ribbonLength || !particle.ribbonStepDistance) {
            return;
        }

        let i = 0

        const dt = delta.value;

        particle.time += dt * particle.oscillationSpeed
        particle.position.y += particle.ySpeed * dt
        particle.position.x += Math.cos(particle.time) * particle.oscillationDistance * dt
        particle.ribbonSteps[0].position = particle.position

        const distance = getDistance(particle.prevPosition, particle.position);

        particle.prevPosition = Vector.create(particle.position.x, particle.position.y)

        for (i = 1; i < particle.ribbonLength; i++) {
            const dirP = particle.ribbonSteps[i - 1].position.sub(particle.ribbonSteps[i].position)

            dirP.normalize()
            dirP.multTo((distance / dt) * particle.velocityInherit)

            particle.ribbonSteps[i].addForce(dirP)
        }

        for (i = 1; i < particle.ribbonLength; i++) {
            particle.ribbonSteps[i].integrate(dt)
        }

        for (i = 1; i < particle.ribbonLength; i++) {
            const rp2 = Vector.create(
                particle.ribbonSteps[i].position.x,
                particle.ribbonSteps[i].position.y,
            )

            rp2.subFrom(particle.ribbonSteps[i - 1].position)
            rp2.normalize()
            rp2.multTo(particle.ribbonStepDistance)
            rp2.addTo(particle.ribbonSteps[i - 1].position)

            particle.ribbonSteps[i].position = rp2
        }

        if (
            particle.position.y >
            particle.container.canvas.size.height + particle.ribbonStepDistance * particle.ribbonLength
        ) {
            this._reset(particle)
        }
    }*/
}
