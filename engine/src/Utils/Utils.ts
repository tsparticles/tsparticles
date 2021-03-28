import type {
    IBounds,
    ICircleBouncer,
    ICoordinates,
    IDimension,
    IParticle,
    IRangeValue,
    IRectSideResult,
} from "../Core/Interfaces";
import { DestroyType, DivMode } from "../Enums";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import type { SingleOrMultiple } from "../Types";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import type { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
import { OutModeDirection } from "../Enums";
import { collisionVelocity, getRangeValue } from "./NumberUtils";
import { Particle } from "../Core/Particle";
import { Vector } from "../Core/Particle/Vector";

type CSSOMString = string;
type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
type FontFaceSetStatus = "loading" | "loaded";

interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;

    load(): Promise<FontFace>;
}

interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;

    check(font: string, text?: string): boolean;

    load(font: string, text?: string): Promise<FontFace[]>;
}

declare global {
    interface Document {
        fonts: FontFaceSet;
    }

    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
        Path2D?: Path2D;
    }
}

export function rectSideBounce(
    pSide: IRangeValue,
    pOtherSide: IRangeValue,
    rectSide: IRangeValue,
    rectOtherSide: IRangeValue,
    velocity: number,
    factor: number
): IRectSideResult {
    const res: IRectSideResult = { bounced: false };

    if (
        pOtherSide.min >= rectOtherSide.min &&
        pOtherSide.min <= rectOtherSide.max &&
        pOtherSide.max >= rectOtherSide.min &&
        pOtherSide.max <= rectOtherSide.max
    ) {
        if (
            (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
            (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)
        ) {
            res.velocity = velocity * -factor;

            res.bounced = true;
        }
    }

    return res;
}

export function checkSelector(element: HTMLElement, selectors: SingleOrMultiple<string>): boolean {
    if (selectors instanceof Array) {
        for (const selector of selectors) {
            if (element.matches(selector)) {
                return true;
            }
        }

        return false;
    } else {
        return element.matches(selectors);
    }
}

export function isSsr(): boolean {
    return typeof window === "undefined" || !window;
}

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
 * Check if a value is equal to the destination, if same type, or is in the provided array
 * @param value the value to check
 * @param array the data array or single value
 */
export function isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}

export async function loadFont(character: ICharacterShape): Promise<void> {
    try {
        await document.fonts.load(`${character.weight} 36px '${character.font}'`);
    } catch {
        // ignores any error
    }
}

export function arrayRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
}

export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T {
    const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);

    return array[fixedIndex];
}

export function isPointInside(
    point: ICoordinates,
    size: IDimension,
    radius?: number,
    direction?: OutModeDirection
): boolean {
    return areBoundsInside(calculateBounds(point, radius ?? 0), size, direction);
}

export function areBoundsInside(bounds: IBounds, size: IDimension, direction?: OutModeDirection): boolean {
    let inside = true;

    if (!direction || direction === OutModeDirection.bottom) {
        inside = bounds.top < size.height;
    }

    if (inside && (!direction || direction === OutModeDirection.left)) {
        inside = bounds.right > 0;
    }

    if (inside && (!direction || direction === OutModeDirection.right)) {
        inside = bounds.left < size.width;
    }

    if (inside && (!direction || direction === OutModeDirection.top)) {
        inside = bounds.bottom > 0;
    }

    return inside;
}

export function calculateBounds(point: ICoordinates, radius: number): IBounds {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius,
    };
}

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

            const sourceDict = source as Record<string, unknown>;
            const value = sourceDict[key];
            const isObject = typeof value === "object";
            const destDict = destination as Record<string, unknown>;

            destDict[key] =
                isObject && Array.isArray(value)
                    ? value.map((v) => deepExtend(destDict[key], v))
                    : deepExtend(destDict[key], value);
        }
    }
    return destination;
}

export const isDivModeEnabled = (mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean =>
    divs instanceof Array ? !!divs.find((t) => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);

export function divModeExecute(
    mode: DivMode,
    divs: SingleOrMultiple<DivEvent>,
    callback: (id: string, div: DivEvent) => void
): void {
    if (divs instanceof Array) {
        for (const div of divs) {
            const divsMode = div.mode;
            const divsEnabled = div.enable;

            if (divsEnabled && isInArray(mode, divsMode)) {
                singleDivModeExecute(div, callback);
            }
        }
    } else {
        const divsMode = divs.mode;
        const divsEnabled = divs.enable;

        if (divsEnabled && isInArray(mode, divsMode)) {
            singleDivModeExecute(divs, callback);
        }
    }
}

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

export function divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined {
    if (!element || !divs) {
        return;
    }

    if (divs instanceof Array) {
        return divs.find((d) => checkSelector(element, d.selectors));
    }

    if (checkSelector(element, divs.selectors)) {
        return divs;
    }
}

export const circleBounceDataFromParticle = (p: IParticle): ICircleBouncer => ({
    factor: Vector.create(
        getRangeValue(p.options.bounce.horizontal.value),
        getRangeValue(p.options.bounce.vertical.value)
    ),
    mass: p.getMass(),
    position: p.getPosition(),
    radius: p.getRadius(),
    velocity: p.velocity,
});

export function circleBounce(p1: ICircleBouncer, p2: ICircleBouncer): void {
    const xVelocityDiff = p1.velocity.x;
    const yVelocityDiff = p1.velocity.y;

    const pos1 = p1.position;
    const pos2 = p2.position;

    const xDist = pos2.x - pos1.x;
    const yDist = pos2.y - pos1.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
    }

    const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    const m1 = p1.radius;
    const m2 = p2.radius;
    const u1 = p1.velocity.rotate(angle);
    const u2 = p2.velocity.rotate(angle);
    const v1 = collisionVelocity(u1, u2, m1, m2);
    const v2 = collisionVelocity(u2, u1, m1, m2);
    const vFinal1 = v1.rotate(-angle);
    const vFinal2 = v2.rotate(-angle);

    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
}

export function rectBounce(particle: IParticle, divBounds: IBounds): void {
    const pPos = particle.getPosition();
    const size = particle.getRadius();
    const bounds = calculateBounds(pPos, size);

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
        getRangeValue(particle.options.bounce.horizontal.value)
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
        getRangeValue(particle.options.bounce.vertical.value)
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

export function checkDestroy(
    particle: Particle,
    destroy: DestroyType | keyof typeof DestroyType,
    value: number,
    minValue: number,
    maxValue: number
): void {
    switch (destroy) {
        case DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
