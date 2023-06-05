import type { ICoordinates, ICoordinatesWithMode } from "../Core/Interfaces/ICoordinates";
import type { IDimension, IDimensionWithMode } from "../Core/Interfaces/IDimension";
import {
    collisionVelocity,
    getDistances,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getValue,
    randomInRange
} from "./NumberUtils";
import { AnimationMode } from "../Enums/Modes/AnimationMode";
import { AnimationStatus } from "../Enums/AnimationStatus";
import type { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import type { DivMode } from "../Enums/Modes/DivMode";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { ICircleBouncer } from "../Core/Interfaces/ICircleBouncer";
import type { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IParticleNumericValueAnimation } from "../Core/Interfaces/IParticleValueAnimation";
import type { IRangeValue } from "../Core/Interfaces/IRangeValue";
import type { IRectSideResult } from "../Core/Interfaces/IRectSideResult";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection";
import { PixelMode } from "../Enums/Modes/PixelMode";
import type { RangedAnimationValueWithRandom } from "../Options/Classes/ValueWithRandom";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
import { StartValueType } from "../Enums/Types/StartValueType";
import { Vector } from "../Core/Utils/Vector";

type RectSideBounceData = {
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
};

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
        (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
        (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)
    ) {
        res.velocity = velocity * -factor;
        res.bounced = true;
    }

    return res;
}

/**
 * Checks if the given selectors matches the element
 * @param element - element to check
 * @param selectors - selectors to check
 * @returns true or false, if the selector has found something
 */
function checkSelector(element: HTMLElement, selectors: SingleOrMultiple<string>): boolean {
    const res = executeOnSingleOrMultiple(selectors, (selector) => {
        return element.matches(selector);
    });

    return res instanceof Array ? res.some((t) => t) : res;
}

/**
 * Checks if the script is executed server side
 * @returns true if the environment is server side
 */
export function isSsr(): boolean {
    return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}

/**
 * @returns true if the environment supports matchMedia feature
 */
export function hasMatchMedia(): boolean {
    return !isSsr() && typeof matchMedia !== "undefined";
}

/**
 * @param query -
 * @returns the media query list, if supported
 */
export function safeMatchMedia(query: string): MediaQueryList | undefined {
    if (!hasMatchMedia()) {
        return;
    }

    return matchMedia(query);
}

/**
 * Calls the requestAnimationFrame function or a polyfill
 * @returns the animation callback id, so it can be canceled
 */
export function animate(): (callback: FrameRequestCallback) => number {
    return isSsr()
        ? (callback: FrameRequestCallback): number => setTimeout(callback)
        : (callback: FrameRequestCallback): number => (requestAnimationFrame || setTimeout)(callback);
}

/**
 * Cancels the requestAnimationFrame function or a polyfill
 * @returns the animation cancelling function
 */
export function cancelAnimation(): (handle: number) => void {
    return isSsr()
        ? (handle: number): void => clearTimeout(handle)
        : (handle: number): void => (cancelAnimationFrame || clearTimeout)(handle);
}

/**
 * Checks if a value is equal to the destination, if same type, or is in the provided array
 * @param value - the value to check
 * @param array - the data array or single value
 * @returns true if the value is equal to the destination, if same type, or is in the provided array
 */
export function isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}

/**
 * Loads a font for the canvas
 * @param font - font name
 * @param weight - font weight
 */
export async function loadFont(font?: string, weight?: string): Promise<void> {
    try {
        await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
    } catch {
        // ignores any error
    }
}

/**
 * Returns a random array index
 * @param array - the array to get the index from
 * @returns a random array index
 */
export function arrayRandomIndex<T>(array: T[]): number {
    return Math.floor(getRandom() * array.length);
}

/**
 * Returns a random object from the given array
 * @param array - the array to get the object from
 * @param index - the index to get the object from
 * @param useIndex - if true, the index will be used instead of a random index
 * @returns the item found
 */
export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T {
    return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}

/**
 * Checks if the given point is inside the given rectangle
 * @param point - the point to check
 * @param size - the rectangle size
 * @param offset - position offset
 * @param radius - the point radius
 * @param direction - the point direction
 * @returns true if the point is inside the rectangle
 */
export function isPointInside(
    point: ICoordinates,
    size: IDimension,
    offset: ICoordinates,
    radius?: number,
    direction?: OutModeDirection
): boolean {
    return areBoundsInside(calculateBounds(point, radius ?? 0), size, offset, direction);
}

/**
 * Checks if the given shape bounds are inside the given rectangle
 * @param bounds - the shape bounds to check
 * @param size - the rectangle size
 * @param offset - position offset
 * @param direction - the shape direction
 * @returns true if the given bounds are inside the given area, false if not
 */
export function areBoundsInside(
    bounds: IBounds,
    size: IDimension,
    offset: ICoordinates,
    direction?: OutModeDirection
): boolean {
    let inside = true;

    if (!direction || direction === OutModeDirection.bottom) {
        inside = bounds.top < size.height + offset.x;
    }

    if (inside && (!direction || direction === OutModeDirection.left)) {
        inside = bounds.right > offset.x;
    }

    if (inside && (!direction || direction === OutModeDirection.right)) {
        inside = bounds.left < size.width + offset.y;
    }

    if (inside && (!direction || direction === OutModeDirection.top)) {
        inside = bounds.bottom > offset.y;
    }

    return inside;
}

/**
 * Calculates the bounds of the given point
 * @param point - the point to calculate the bounds from
 * @param radius - the point radius
 * @returns the bounds of the given point
 */
export function calculateBounds(point: ICoordinates, radius: number): IBounds {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius
    };
}

/**
 * Merges the whole source objects into the destination object
 * @param destination - the destination object
 * @param sources - the source objects
 * @returns the merged destination object
 */
export function deepExtend(destination: unknown, ...sources: unknown[]): unknown {
    for (const source of sources) {
        if (source === undefined || source === null) {
            continue;
        }

        if (typeof source !== "object") {
            destination = source;

            continue;
        }

        const sourceIsArray = Array.isArray(source);

        if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
            destination = [];
        } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
            destination = {};
        }

        for (const key in source) {
            if (key === "__proto__") {
                continue;
            }

            const sourceDict = source as Record<string, unknown>,
                value = sourceDict[key],
                isObject = typeof value === "object",
                destDict = destination as Record<string, unknown>;

            destDict[key] =
                isObject && Array.isArray(value)
                    ? value.map((v) => deepExtend(destDict[key], v))
                    : deepExtend(destDict[key], value);
        }
    }

    return destination;
}

/**
 * Checks if the given div mode is enabled in the given div elements
 * @param mode - the div mode to check
 * @param divs - the div elements to check
 * @returns true if the div mode is enabled
 */
export function isDivModeEnabled(mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean {
    return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}

/**
 * Execute the given callback if div mode in the given div elements is enabled
 * @param mode - the div mode to check
 * @param divs - the div elements to check
 * @param callback - the callback to execute
 */
export function divModeExecute(
    mode: DivMode,
    divs: SingleOrMultiple<DivEvent>,
    callback: (id: string, div: DivEvent) => void
): void {
    executeOnSingleOrMultiple(divs, (div) => {
        const divMode = div.mode,
            divEnabled = div.enable;

        if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(div, callback);
        }
    });
}

/**
 * Execute the given callback for the given div event
 * @param div - the div event to execute the callback for
 * @param callback - the callback to execute
 */
export function singleDivModeExecute(div: DivEvent, callback: (selector: string, div: DivEvent) => void): void {
    const selectors = div.selectors;

    executeOnSingleOrMultiple(selectors, (selector) => {
        callback(selector, div);
    });
}

/**
 * Checks if the given element targets any of the div modes
 * @param divs - the div elements to check
 * @param element - the element to check
 * @returns true if the element targets any of the div modes
 */
export function divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined {
    if (!element || !divs) {
        return;
    }

    return findItemFromSingleOrMultiple(divs, (div) => {
        return checkSelector(element, div.selectors);
    });
}

/**
 * Returns circle bounce data for the given particle
 * @param p - the particle to get the circle bounds data for
 * @returns the circle bounce data for the given particle
 */
export function circleBounceDataFromParticle(p: IParticle): ICircleBouncer {
    return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
    };
}

/**
 * Executes the circle bounce between two particles
 * @param p1 - the first particle
 * @param p2 - the second particle
 */
export function circleBounce(p1: ICircleBouncer, p2: ICircleBouncer): void {
    const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity),
        [pos1, pos2] = [p1.position, p2.position],
        { dx: xDist, dy: yDist } = getDistances(pos2, pos1);

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
    }

    const angle = -Math.atan2(yDist, xDist),
        m1 = p1.mass,
        m2 = p2.mass,
        u1 = p1.velocity.rotate(angle),
        u2 = p2.velocity.rotate(angle),
        v1 = collisionVelocity(u1, u2, m1, m2),
        v2 = collisionVelocity(u2, u1, m1, m2),
        vFinal1 = v1.rotate(-angle),
        vFinal2 = v2.rotate(-angle);

    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
}

/**
 * Executes the bounce between a particle and div bounds
 * @param particle - the particle to bounce
 * @param divBounds - the div bounds to bounce
 */
export function rectBounce(particle: IParticle, divBounds: IBounds): void {
    const pPos = particle.getPosition(),
        size = particle.getRadius(),
        bounds = calculateBounds(pPos, size),
        resH = rectSideBounce({
            pSide: {
                min: bounds.left,
                max: bounds.right
            },
            pOtherSide: {
                min: bounds.top,
                max: bounds.bottom
            },
            rectSide: {
                min: divBounds.left,
                max: divBounds.right
            },
            rectOtherSide: {
                min: divBounds.top,
                max: divBounds.bottom
            },
            velocity: particle.velocity.x,
            factor: getValue(particle.options.bounce.horizontal)
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
            max: bounds.bottom
        },
        pOtherSide: {
            min: bounds.left,
            max: bounds.right
        },
        rectSide: {
            min: divBounds.top,
            max: divBounds.bottom
        },
        rectOtherSide: {
            min: divBounds.left,
            max: divBounds.right
        },
        velocity: particle.velocity.y,
        factor: getValue(particle.options.bounce.vertical)
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

/**
 * @param obj -
 * @param callback -
 * @returns the transformed SingleOrMultiple data
 */
export function executeOnSingleOrMultiple<T, U = void>(
    obj: SingleOrMultiple<T>,
    callback: (obj: T, index: number) => U
): SingleOrMultiple<U> {
    return obj instanceof Array ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
}

/**
 * @param obj -
 * @param index -
 * @param useIndex -
 * @returns the selected item
 */
export function itemFromSingleOrMultiple<T>(obj: SingleOrMultiple<T>, index?: number, useIndex?: boolean): T {
    return obj instanceof Array ? itemFromArray(obj, index, useIndex) : obj;
}

/**
 * @param obj -
 * @param callback -
 * @returns the item found, if present
 */
export function findItemFromSingleOrMultiple<T>(
    obj: SingleOrMultiple<T>,
    callback: (obj: T, index: number) => boolean
): T | undefined {
    return obj instanceof Array ? obj.find((t, index) => callback(t, index)) : callback(obj, 0) ? obj : undefined;
}

/**
 * @param options -
 * @param pxRatio -
 * @returns the animation init object
 */
export function initParticleNumericAnimationValue(
    options: RangedAnimationValueWithRandom,
    pxRatio: number
): IParticleNumericValueAnimation {
    const valueRange = options.value,
        animationOptions = options.animation,
        res: IParticleNumericValueAnimation = {
            delayTime: getRangeValue(animationOptions.delay) * 1000,
            enable: animationOptions.enable,
            value: getRangeValue(options.value) * pxRatio,
            max: getRangeMax(valueRange) * pxRatio,
            min: getRangeMin(valueRange) * pxRatio,
            loops: 0,
            maxLoops: getRangeValue(animationOptions.count),
            time: 0
        };

    if (animationOptions.enable) {
        res.decay = 1 - getRangeValue(animationOptions.decay);

        switch (animationOptions.mode) {
            case AnimationMode.increase:
                res.status = AnimationStatus.increasing;

                break;
            case AnimationMode.decrease:
                res.status = AnimationStatus.decreasing;

                break;

            case AnimationMode.random:
                res.status = getRandom() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                break;
        }

        const autoStatus = animationOptions.mode === AnimationMode.auto;

        switch (animationOptions.startValue) {
            case StartValueType.min:
                res.value = res.min;

                if (autoStatus) {
                    res.status = AnimationStatus.increasing;
                }

                break;

            case StartValueType.max:
                res.value = res.max;

                if (autoStatus) {
                    res.status = AnimationStatus.decreasing;
                }

                break;

            case StartValueType.random:
            default:
                res.value = randomInRange(res);

                if (autoStatus) {
                    res.status = getRandom() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;
                }

                break;
        }
    }

    res.initialValue = res.value;

    return res;
}

/**
 * @param positionOrSize -
 * @param canvasSize -
 * @returns the calculated position or size
 */
function getPositionOrSize(
    positionOrSize: ICoordinatesWithMode | IDimensionWithMode,
    canvasSize: IDimension
): ICoordinates | IDimension {
    const isPercent = positionOrSize.mode === PixelMode.percent;

    if (isPercent) {
        const { mode: _, ...rest } = positionOrSize;

        return rest;
    }

    const isPosition = "x" in positionOrSize;

    return {
        x: isPosition ? positionOrSize.x : (positionOrSize.width / 100) * canvasSize.width,
        y: isPosition ? positionOrSize.y : (positionOrSize.height / 100) * canvasSize.height
    };
}

/**
 * @param position -
 * @param canvasSize -
 * @returns the calculated position
 */
export function getPosition(position: ICoordinatesWithMode, canvasSize: IDimension): ICoordinates {
    return getPositionOrSize(position, canvasSize) as ICoordinates;
}

/**
 * @param size -
 * @param canvasSize -
 * @returns the calculated size
 */
export function getSize(size: IDimensionWithMode, canvasSize: IDimension): IDimension {
    return getPositionOrSize(size, canvasSize) as IDimension;
}
