import { collisionVelocity, getDistances, getValue } from "./NumberUtils";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import { DivMode } from "../Enums/Modes/DivMode";
import type { Engine } from "../engine";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { ICircleBouncer } from "../Core/Interfaces/ICircleBouncer";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import type { IRangeValue } from "../Core/Interfaces/IRangeValue";
import type { IRectSideResult } from "../Core/Interfaces/IRectSideResult";
import { Options } from "../Options/Classes/Options";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
import { Vector } from "../Core/Utils/Vector";

declare global {
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
    }
}

/**
 * Calculates the bounce on a rectangle side
 * @hidden
 * @param pSide particle bounce side
 * @param pOtherSide particle bounce other side
 * @param rectSide rectangle bounce side
 * @param rectOtherSide rectangle bounce other side
 * @param velocity particle velocity
 * @param factor bounce factor
 */
function rectSideBounce(
    pSide: IRangeValue,
    pOtherSide: IRangeValue,
    rectSide: IRangeValue,
    rectOtherSide: IRangeValue,
    velocity: number,
    factor: number
): IRectSideResult {
    const res: IRectSideResult = { bounced: false };

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
 * @hidden
 * @param element element to check
 * @param selectors selectors to check
 */
function checkSelector(element: HTMLElement, selectors: SingleOrMultiple<string>): boolean {
    if (!(selectors instanceof Array)) {
        return element.matches(selectors);
    }

    for (const selector of selectors) {
        if (element.matches(selector)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks if the script is executed server side
 */
export function isSsr(): boolean {
    return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}

/**
 * Calls the requestAnimationFrame function or a polyfill
 */
export function animate(): (callback: FrameRequestCallback) => number {
    return isSsr()
        ? (callback: FrameRequestCallback): number => setTimeout(callback)
        : (callback: FrameRequestCallback): number =>
              (
                  window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  window.setTimeout
              )(callback);
}

/**
 * Cancels the requestAnimationFrame function or a polyfill
 */
export function cancelAnimation(): (handle: number) => void {
    return isSsr()
        ? (handle: number): void => clearTimeout(handle)
        : (handle: number): void =>
              (
                  window.cancelAnimationFrame ||
                  window.webkitCancelRequestAnimationFrame ||
                  window.mozCancelRequestAnimationFrame ||
                  window.oCancelRequestAnimationFrame ||
                  window.msCancelRequestAnimationFrame ||
                  window.clearTimeout
              )(handle);
}

/**
 * Checks if a value is equal to the destination, if same type, or is in the provided array
 * @param value the value to check
 * @param array the data array or single value
 * @returns true if the value is equal to the destination, if same type, or is in the provided array
 */
export function isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}

/**
 * Loads a font for the canvas
 * @param font font name
 * @param weight font weight
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
 * @param array the array to get the index from
 * @returns a random array index
 */
export function arrayRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
}

/**
 * Returns a random object from the given array
 * @param array the array to get the object from
 * @param index the index to get the object from
 * @param useIndex if true, the index will be used instead of a random index
 */
export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T {
    const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);

    return array[fixedIndex];
}

/**
 * Checks if the given point is inside the given rectangle
 * @param point the point to check
 * @param size the rectangle size
 * @param offset position offset
 * @param radius the point radius
 * @param direction the point direction
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
 * @param bounds the shape bounds to check
 * @param size the rectangle size
 * @param offset position offset
 * @param direction the shape direction
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
 * @param point the point to calculate the bounds from
 * @param radius the point radius
 * @returns the bounds of the given point
 */
export function calculateBounds(point: ICoordinates, radius: number): IBounds {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius,
    };
}

/**
 * Merges the whole source objects into the destination object
 * @param destination the destination object
 * @param sources the source objects
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
 * @param mode the div mode to check
 * @param divs the div elements to check
 * @returns true if the div mode is enabled
 */
export function isDivModeEnabled(mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean {
    return divs instanceof Array ? !!divs.find((t) => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}

/**
 * Execute the given callback if div mode in the given div elements is enabled
 * @param mode the div mode to check
 * @param divs the div elements to check
 * @param callback the callback to execute
 */
export function divModeExecute(
    mode: DivMode,
    divs: SingleOrMultiple<DivEvent>,
    callback: (id: string, div: DivEvent) => void
): void {
    if (divs instanceof Array) {
        for (const div of divs) {
            const divMode = div.mode,
                divEnabled = div.enable;

            if (divEnabled && isInArray(mode, divMode)) {
                singleDivModeExecute(div, callback);
            }
        }
    } else {
        const divMode = divs.mode,
            divEnabled = divs.enable;

        if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(divs, callback);
        }
    }
}

/**
 * Execute the given callback for the given div event
 * @param div the div event to execute the callback for
 * @param callback the callback to execute
 */
export function singleDivModeExecute(div: DivEvent, callback: (selector: string, div: DivEvent) => void): void {
    const selectors = div.selectors;

    if (selectors instanceof Array) {
        for (const selector of selectors) {
            callback(selector, div);
        }
    } else {
        callback(selectors, div);
    }
}

/**
 * Checks if the given element targets any of the div modes
 * @param divs the div elements to check
 * @param element the element to check
 * @returns true if the element targets any of the div modes
 */
export function divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined {
    if (!element || !divs) {
        return;
    }

    if (divs instanceof Array) {
        return divs.find((d) => checkSelector(element, d.selectors));
    } else if (checkSelector(element, divs.selectors)) {
        return divs;
    }
}

/**
 * Returns circle bounce data for the given particle
 * @param p the particle to get the circle bounds data for
 * @returns the circle bounce data for the given particle
 */
export function circleBounceDataFromParticle(p: IParticle): ICircleBouncer {
    return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical)),
    };
}

/**
 * Executes the circle bounce between two particles
 * @param p1 the first particle
 * @param p2 the second particle
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
 * @param particle the particle to bounce
 * @param divBounds the div bounds to bounce
 */
export function rectBounce(particle: IParticle, divBounds: IBounds): void {
    const pPos = particle.getPosition(),
        size = particle.getRadius(),
        bounds = calculateBounds(pPos, size);

    const resH = rectSideBounce(
        {
            min: bounds.left,
            max: bounds.right,
        },
        {
            min: bounds.top,
            max: bounds.bottom,
        },
        {
            min: divBounds.left,
            max: divBounds.right,
        },
        {
            min: divBounds.top,
            max: divBounds.bottom,
        },
        particle.velocity.x,
        getValue(particle.options.bounce.horizontal)
    );

    if (resH.bounced) {
        if (resH.velocity !== undefined) {
            particle.velocity.x = resH.velocity;
        }

        if (resH.position !== undefined) {
            particle.position.x = resH.position;
        }
    }

    const resV = rectSideBounce(
        {
            min: bounds.top,
            max: bounds.bottom,
        },
        {
            min: bounds.left,
            max: bounds.right,
        },
        {
            min: divBounds.top,
            max: divBounds.bottom,
        },
        {
            min: divBounds.left,
            max: divBounds.right,
        },
        particle.velocity.y,
        getValue(particle.options.bounce.vertical)
    );

    if (resV.bounced) {
        if (resV.velocity !== undefined) {
            particle.velocity.y = resV.velocity;
        }

        if (resV.position !== undefined) {
            particle.position.y = resV.position;
        }
    }
}

function loadOptions<T>(options: IOptionLoader<T>, ...sourceOptionsArr: RecursivePartial<T | undefined>[]): void {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}

export function loadContainerOptions(
    engine: Engine,
    ...sourceOptionsArr: RecursivePartial<IOptions | undefined>[]
): Options {
    const options = new Options(engine);

    loadOptions(options, ...sourceOptionsArr);

    return options;
}

export function loadParticlesOptions(
    ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
    const options = new ParticlesOptions();

    loadOptions(options, ...sourceOptionsArr);

    return options;
}
