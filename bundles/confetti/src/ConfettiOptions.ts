import {
    type ICoordinates,
    type IOptionLoader,
    type IShapeValues,
    type RecursivePartial,
    type ShapeData,
    type SingleOrMultiple,
    deepExtend,
    isArray,
    isNull,
    percentDenominator,
} from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";

/**
 *
 */
export class ConfettiOptions implements IConfettiOptions, IOptionLoader<IConfettiOptions> {
    /**
     *
     */
    angle: number;

    /**
     *
     */
    colors: SingleOrMultiple<string>;

    /**
     *
     */
    count: number;

    /**
     *
     */
    decay: number;

    /**
     *
     */
    disableForReducedMotion: boolean;

    /**
     *
     */
    drift: number;

    /**
     *
     */
    flat: boolean;

    /**
     *
     */
    gravity: number;

    /**
     *
     */
    position: ICoordinates;

    /**
     *
     */
    scalar: number;

    /**
     *
     */
    shapeOptions: ShapeData;

    /**
     *
     */
    shapes: SingleOrMultiple<string>;

    /**
     *
     */
    spread: number;

    /**
     *
     */
    startVelocity: number;

    /**
     *
     */
    ticks: number;

    /**
     *
     */
    zIndex: number;

    /**
     *
     */
    constructor() {
        this.angle = 90;
        this.count = 50;
        this.spread = 45;
        this.startVelocity = 45;
        this.decay = 0.9;
        this.gravity = 1;
        this.drift = 0;
        this.ticks = 200;
        this.position = {
            x: 50,
            y: 50,
        };
        this.colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
        this.shapes = ["square", "circle"];
        this.scalar = 1;
        this.zIndex = 100;
        this.disableForReducedMotion = true;
        this.flat = false;
        this.shapeOptions = {};
    }

    /**
     * @deprecated use position instead
     * @returns the origin of the confetti
     */
    get origin(): ICoordinates {
        return {
            x: this.position.x / percentDenominator,
            y: this.position.y / percentDenominator,
        };
    }

    /**
     * @deprecated use position instead
     */
    set origin(value: ICoordinates) {
        this.position.x = value.x * percentDenominator;
        this.position.y = value.y * percentDenominator;
    }

    /**
     * @deprecated use count instead
     * @returns the number of particles
     */
    get particleCount(): number {
        return this.count;
    }

    /**
     * @deprecated use count instead
     */
    set particleCount(value: number) {
        this.count = value;
    }

    /**
     *
     * @param data -
     */
    load(data?: RecursivePartial<IConfettiOptions>): void {
        if (isNull(data)) {
            return;
        }

        if (data.angle !== undefined) {
            this.angle = data.angle;
        }

        // eslint-disable-next-line @typescript-eslint/no-deprecated
        const count = data.count ?? data.particleCount;

        if (count !== undefined) {
            this.count = count;
        }

        if (data.spread !== undefined) {
            this.spread = data.spread;
        }

        if (data.startVelocity !== undefined) {
            this.startVelocity = data.startVelocity;
        }

        if (data.decay !== undefined) {
            this.decay = data.decay;
        }

        if (data.flat !== undefined) {
            this.flat = data.flat;
        }

        if (data.gravity !== undefined) {
            this.gravity = data.gravity;
        }

        if (data.drift !== undefined) {
            this.drift = data.drift;
        }

        if (data.ticks !== undefined) {
            this.ticks = data.ticks;
        }

        // eslint-disable-next-line @typescript-eslint/no-deprecated
        const origin = data.origin;

        if (origin && !data.position) {
            data.position = {
                x: origin.x !== undefined ? origin.x * percentDenominator : undefined,
                y: origin.y !== undefined ? origin.y * percentDenominator : undefined,
            };
        }

        const position = data.position;

        if (position) {
            if (position.x !== undefined) {
                this.position.x = position.x;
            }

            if (position.y !== undefined) {
                this.position.y = position.y;
            }
        }

        if (data.colors !== undefined) {
            if (isArray(data.colors)) {
                this.colors = [...data.colors];
            } else {
                this.colors = data.colors;
            }
        }

        const options = data.shapeOptions;

        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];

                if (item) {
                    this.shapeOptions[shape] = deepExtend(this.shapeOptions[shape] ?? {}, item) as IShapeValues[];
                }
            }
        }

        if (data.shapes !== undefined) {
            if (isArray(data.shapes)) {
                this.shapes = [...data.shapes];
            } else {
                this.shapes = data.shapes;
            }
        }

        if (data.scalar !== undefined) {
            this.scalar = data.scalar;
        }

        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }

        if (data.disableForReducedMotion !== undefined) {
            this.disableForReducedMotion = data.disableForReducedMotion;
        }
    }
}
