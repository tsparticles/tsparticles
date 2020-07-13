import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { DivMode, MoveDirection } from "../Enums";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IImage } from "../Core/Interfaces/IImage";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";

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
}

declare global {
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
        return this.isSsr()
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
        return this.isSsr()
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
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    public static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    /**
     * Check if a value is equal to the destination, if same type, or is in the provided array
     * @param value the value to check
     * @param array the data array or single value
     */
    public static isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
        return value === array || (array instanceof Array && array.indexOf(value) > -1);
    }

    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    public static mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }

    /**
     * Get Particle base velocity
     * @param particle the particle to use for calculating the velocity
     */
    public static getParticleBaseVelocity(particle: IParticle): ICoordinates {
        let velocityBase: ICoordinates;

        switch (particle.direction) {
            case MoveDirection.top:
                velocityBase = { x: 0, y: -1 };
                break;
            case MoveDirection.topRight:
                velocityBase = { x: 0.5, y: -0.5 };
                break;
            case MoveDirection.right:
                velocityBase = { x: 1, y: -0 };
                break;
            case MoveDirection.bottomRight:
                velocityBase = { x: 0.5, y: 0.5 };
                break;
            case MoveDirection.bottom:
                velocityBase = { x: 0, y: 1 };
                break;
            case MoveDirection.bottomLeft:
                velocityBase = { x: -0.5, y: 1 };
                break;
            case MoveDirection.left:
                velocityBase = { x: -1, y: 0 };
                break;
            case MoveDirection.topLeft:
                velocityBase = { x: -0.5, y: -0.5 };
                break;
            default:
                velocityBase = { x: 0, y: 0 };
                break;
        }

        return velocityBase;
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistances(
        pointA: ICoordinates,
        pointB: ICoordinates
    ): { dx: number; dy: number; distance: number } {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
        return this.getDistances(pointA, pointB).distance;
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

    public static itemFromArray<T>(array: T[], index?: number): T {
        return array[index ?? this.arrayRandomIndex(array)];
    }

    public static randomInRange(r1: number, r2: number): number {
        const max = Math.max(r1, r2),
            min = Math.min(r1, r2);

        return Math.random() * (max - min) + min;
    }

    public static isPointInside(point: ICoordinates, size: IDimension, radius?: number): boolean {
        return this.areBoundsInside(this.calculateBounds(point, radius ?? 0), size);
    }

    public static areBoundsInside(bounds: IBounds, size: IDimension): boolean {
        return bounds.left < size.width && bounds.right > 0 && bounds.top < size.height && bounds.bottom > 0;
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
            return this.loadImage(source);
        }

        const response = await fetch(image.source);

        if (!response.ok) {
            throw new Error("Error tsParticles - Image not found");
        }

        image.svgData = await response.text();

        return image;
    }

    public static deepExtend(destination: any, ...sources: any[]): any {
        for (const source of sources.filter((s) => s !== undefined && s !== null)) {
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

                const value = source[key];
                const isObject = typeof value === "object";

                destination[key] =
                    isObject && Array.isArray(value)
                        ? value.map((v) => this.deepExtend(destination[key], v))
                        : this.deepExtend(destination[key], value);
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
                    this.singleDivModeExecute(div, callback);
                }
            }
        } else {
            const divMode = divs.mode;
            const divEnabled = divs.enable;

            if (divEnabled && Utils.isInArray(mode, divMode)) {
                this.singleDivModeExecute(divs, callback);
            }
        }
    }

    public static singleDivModeExecute(div: DivEvent, callback: (id: string, div: DivEvent) => void): void {
        const ids = div.ids;

        if (ids instanceof Array) {
            for (const id of ids) {
                callback(id, div);
            }
        } else {
            callback(ids, div);
        }
    }

    public static divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, divId?: string): T | undefined {
        if (!divId || !divs) {
            return;
        }

        if (divs instanceof Array) {
            return divs.find((d) => Utils.isInArray(divId, d.ids));
        } else if (Utils.isInArray(divId, divs.ids)) {
            return divs;
        }
    }
}
