import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { DivMode } from "../Enums";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IImage } from "../Core/Interfaces/IImage";
import type { SingleOrMultiple } from "../Types";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import type { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection";

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

/* ---------- global functions - vendors ------------ */
export class Utils {
    public static isSsr(): boolean {
        return typeof window === "undefined" || !window;
    }

    public static get animate(): (callback: FrameRequestCallback) => number {
        return Utils.isSsr()
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

    public static get cancelAnimation(): (handle: number) => void {
        return Utils.isSsr()
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
    public static isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
        return value === array || (array instanceof Array && array.indexOf(value) > -1);
    }

    public static async loadFont(character: ICharacterShape): Promise<void> {
        try {
            await document.fonts.load(`${character.weight} 36px '${character.font}'`);
        } catch {
            // ignores any error
        }
    }

    public static arrayRandomIndex<T>(array: T[]): number {
        return Math.floor(Math.random() * array.length);
    }

    public static itemFromArray<T>(array: T[], index?: number, useIndex = true): T {
        const fixedIndex = index !== undefined && useIndex ? index % array.length : Utils.arrayRandomIndex(array);

        return array[fixedIndex];
    }

    public static isPointInside(
        point: ICoordinates,
        size: IDimension,
        radius?: number,
        direction?: OutModeDirection
    ): boolean {
        return Utils.areBoundsInside(Utils.calculateBounds(point, radius ?? 0), size, direction);
    }

    public static areBoundsInside(bounds: IBounds, size: IDimension, direction?: OutModeDirection): boolean {
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

    public static calculateBounds(point: ICoordinates, radius: number): IBounds {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }

    public static loadImage(source: string): Promise<IImage> {
        return new Promise(
            (
                resolve: (value?: IImage | PromiseLike<IImage> | undefined) => void,
                reject: (reason?: string) => void
            ) => {
                if (!source) {
                    reject("Error tsParticles - No image.src");
                    return;
                }

                const image: IImage = {
                    source: source,
                    type: source.substr(source.length - 3),
                };

                const img = new Image();

                img.addEventListener("load", () => {
                    image.element = img;

                    resolve(image);
                });

                img.addEventListener("error", () => {
                    reject(`Error tsParticles - loading image: ${source}`);
                });

                img.src = source;
            }
        );
    }

    public static async downloadSvgImage(source: string): Promise<IImage> {
        if (!source) {
            throw new Error("Error tsParticles - No image.src");
        }

        const image: IImage = {
            source: source,
            type: source.substr(source.length - 3),
        };

        if (image.type !== "svg") {
            return Utils.loadImage(source);
        }

        const response = await fetch(image.source);

        if (!response.ok) {
            throw new Error("Error tsParticles - Image not found");
        }

        image.svgData = await response.text();

        return image;
    }

    public static deepExtend(destination: unknown, ...sources: unknown[]): unknown {
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
            } else if (
                !sourceIsArray &&
                (typeof destination !== "object" || !destination || Array.isArray(destination))
            ) {
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
                        ? value.map((v) => Utils.deepExtend(destDict[key], v))
                        : Utils.deepExtend(destDict[key], value);
            }
        }
        return destination;
    }

    public static isDivModeEnabled(mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean {
        return divs instanceof Array
            ? !!divs.find((t) => t.enable && Utils.isInArray(mode, t.mode))
            : Utils.isInArray(mode, divs.mode);
    }

    public static divModeExecute(
        mode: DivMode,
        divs: SingleOrMultiple<DivEvent>,
        callback: (id: string, div: DivEvent) => void
    ): void {
        if (divs instanceof Array) {
            for (const div of divs) {
                const divMode = div.mode;
                const divEnabled = div.enable;

                if (divEnabled && Utils.isInArray(mode, divMode)) {
                    Utils.singleDivModeExecute(div, callback);
                }
            }
        } else {
            const divMode = divs.mode;
            const divEnabled = divs.enable;

            if (divEnabled && Utils.isInArray(mode, divMode)) {
                Utils.singleDivModeExecute(divs, callback);
            }
        }
    }

    public static singleDivModeExecute(div: DivEvent, callback: (selector: string, div: DivEvent) => void): void {
        const selectors = div.selectors;

        if (selectors instanceof Array) {
            for (const selector of selectors) {
                callback(selector, div);
            }
        } else {
            callback(selectors, div);
        }
    }

    public static divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined {
        if (!element || !divs) {
            return;
        }

        if (divs instanceof Array) {
            return divs.find((d) => Utils.checkSelector(element, d.selectors));
        } else if (Utils.checkSelector(element, divs.selectors)) {
            return divs;
        }
    }

    private static checkSelector(element: HTMLElement, selectors: SingleOrMultiple<string>): boolean {
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
}
