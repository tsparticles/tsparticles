import {
    type BaseRange,
    Circle,
    type DivEvent,
    DivType,
    type ICoordinates,
    type Particle,
    Rectangle,
    type SingleOrMultiple,
    Vector,
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    divModeExecute,
    rectBounce,
} from "@tsparticles/engine";
import type { BounceContainer } from "./Types.js";

const squareExp = 2,
    half = 0.5,
    halfPI = Math.PI * half,
    double = 2,
    toleranceFactor = 10,
    minRadius = 0;

/**
 *
 * @param container -
 * @param position -
 * @param radius -
 * @param area -
 * @param enabledCb -
 */
function processBounce(
    container: BounceContainer,
    position: ICoordinates,
    radius: number,
    area: BaseRange,
    enabledCb: (p: Particle) => boolean,
): void {
    const query = container.particles.quadTree.query(area, enabledCb);

    for (const particle of query) {
        if (area instanceof Circle) {
            circleBounce(circleBounceDataFromParticle(particle), {
                position,
                radius,
                mass: radius ** squareExp * halfPI,
                velocity: Vector.origin,
                factor: Vector.origin,
            });
        } else if (area instanceof Rectangle) {
            rectBounce(particle, calculateBounds(position, radius));
        }
    }
}

/**
 *
 * @param container -
 * @param selector -
 * @param div -
 * @param bounceCb -
 */
function singleSelectorBounce(
    container: BounceContainer,
    selector: string,
    div: DivEvent,
    bounceCb: (position: ICoordinates, radius: number, range: BaseRange) => void,
): void {
    const query = document.querySelectorAll(selector);

    if (!query.length) {
        return;
    }

    query.forEach(item => {
        const elem = item as HTMLElement,
            pxRatio = container.retina.pixelRatio,
            pos = {
                x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
            },
            radius = elem.offsetWidth * half * pxRatio,
            tolerance = toleranceFactor * pxRatio,
            area =
                div.type === DivType.circle
                    ? new Circle(pos.x, pos.y, radius + tolerance)
                    : new Rectangle(
                          elem.offsetLeft * pxRatio - tolerance,
                          elem.offsetTop * pxRatio - tolerance,
                          elem.offsetWidth * pxRatio + tolerance * double,
                          elem.offsetHeight * pxRatio + tolerance * double,
                      );

        bounceCb(pos, radius, area);
    });
}

/**
 *
 * @param container -
 * @param divs -
 * @param bounceMode -
 * @param enabledCb -
 */
export function divBounce(
    container: BounceContainer,
    divs: SingleOrMultiple<DivEvent>,
    bounceMode: string,
    enabledCb: (p: Particle) => boolean,
): void {
    divModeExecute(bounceMode, divs, (selector, div): void =>
        singleSelectorBounce(container, selector, div, (pos, radius, area): void =>
            processBounce(container, pos, radius, area, enabledCb),
        ),
    );
}

/**
 *
 * @param container -
 * @param enabledCb -
 */
export function mouseBounce(container: BounceContainer, enabledCb: (p: Particle) => boolean): void {
    const pxRatio = container.retina.pixelRatio,
        tolerance = toleranceFactor * pxRatio,
        mousePos = container.interactivity.mouse.position,
        radius = container.retina.bounceModeDistance;

    if (!radius || radius < minRadius || !mousePos) {
        return;
    }

    processBounce(container, mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
}
