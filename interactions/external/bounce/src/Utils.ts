import {
    type BaseRange,
    Circle,
    type IBounds,
    type ICoordinates,
    type IRangeValue,
    type Particle,
    Rectangle,
    type SingleOrMultiple,
    Vector,
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    double,
    getRangeValue,
    half,
    safeDocument,
} from "@tsparticles/engine";
import { type DivEvent, DivType, type IInteractivityData, divModeExecute } from "@tsparticles/plugin-interactivity";
import type { BounceContainer } from "./Types.js";
import type { IRectSideResult } from "./IRectSideResult.js";

const squareExp = 2,
    halfPI = Math.PI * half,
    toleranceFactor = 10,
    minRadius = 0,
    minVelocity = 0;

interface RectSideBounceData {
    /**
     * bounce factor
     */
    factor: number;
    /**
     * particle bounce other side
     */
    pOtherSide: IRangeValue;
    /**
     * particle bounce side
     */
    pSide: IRangeValue;
    /**
     * rectangle bounce other side
     */
    rectOtherSide: IRangeValue;
    /**
     * rectangle bounce side
     */
    rectSide: IRangeValue;
    /**
     * particle velocity
     */
    velocity: number;
}

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
    const query = safeDocument().querySelectorAll(selector);

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
    divModeExecute(bounceMode, divs, (selector, div): void => {
        singleSelectorBounce(container, selector, div, (pos, radius, area): void => {
            processBounce(container, pos, radius, area, enabledCb);
        });
    });
}

/**
 *
 * @param container -
 * @param interactivityData -
 * @param enabledCb -
 */
export function mouseBounce(
    container: BounceContainer,
    interactivityData: IInteractivityData,
    enabledCb: (p: Particle) => boolean,
): void {
    const pxRatio = container.retina.pixelRatio,
        tolerance = toleranceFactor * pxRatio,
        mousePos = interactivityData.mouse.position,
        radius = container.retina.bounceModeDistance;

    if (!radius || radius < minRadius || !mousePos) {
        return;
    }

    processBounce(container, mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
}

/**
 * Calculates the bounce on a rectangle side
 * @param data - the rectangle side bounce values
 * @returns the rectangle side bounce values
 */
function rectSideBounce(data: RectSideBounceData): IRectSideResult {
    const res: IRectSideResult = { bounced: false },
        { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;

    if (
        pOtherSide.min < rectOtherSide.min ||
        pOtherSide.min > rectOtherSide.max ||
        pOtherSide.max < rectOtherSide.min ||
        pOtherSide.max > rectOtherSide.max
    ) {
        return res;
    }

    if (
        (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity) ||
        (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity)
    ) {
        res.velocity = velocity * -factor;
        res.bounced = true;
    }

    return res;
}

/**
 * Executes the bounce between a particle and div bounds
 * @param particle - the particle to bounce
 * @param divBounds - the div bounds to bounce
 */
export function rectBounce(particle: Particle, divBounds: IBounds): void {
    const pPos = particle.getPosition(),
        size = particle.getRadius(),
        bounds = calculateBounds(pPos, size),
        bounceOptions = particle.options.bounce,
        resH = rectSideBounce({
            pSide: {
                min: bounds.left,
                max: bounds.right,
            },
            pOtherSide: {
                min: bounds.top,
                max: bounds.bottom,
            },
            rectSide: {
                min: divBounds.left,
                max: divBounds.right,
            },
            rectOtherSide: {
                min: divBounds.top,
                max: divBounds.bottom,
            },
            velocity: particle.velocity.x,
            factor: getRangeValue(bounceOptions.horizontal.value),
        });

    if (resH.bounced) {
        if (resH.velocity !== undefined) {
            particle.velocity.x = resH.velocity;
        }

        if (resH.position !== undefined) {
            particle.position.x = resH.position;
        }
    }

    const resV = rectSideBounce({
        pSide: {
            min: bounds.top,
            max: bounds.bottom,
        },
        pOtherSide: {
            min: bounds.left,
            max: bounds.right,
        },
        rectSide: {
            min: divBounds.top,
            max: divBounds.bottom,
        },
        rectOtherSide: {
            min: divBounds.left,
            max: divBounds.right,
        },
        velocity: particle.velocity.y,
        factor: getRangeValue(bounceOptions.vertical.value),
    });

    if (resV.bounced) {
        if (resV.velocity !== undefined) {
            particle.velocity.y = resV.velocity;
        }

        if (resV.position !== undefined) {
            particle.position.y = resV.position;
        }
    }
}
