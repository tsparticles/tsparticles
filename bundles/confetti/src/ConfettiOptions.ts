import type { ICoordinates, IOptionLoader, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { IConfettiOptions } from "./IConfettiOptions";

export class ConfettiOptions implements IConfettiOptions, IOptionLoader<IConfettiOptions> {
    angle: number;
    colors: SingleOrMultiple<string>;
    count: number;
    decay: number;
    disableForReducedMotion: boolean;
    drift: number;
    gravity: number;
    position: ICoordinates;
    scalar: number;
    shapes: SingleOrMultiple<string>;
    spread: number;
    startVelocity: number;
    ticks: number;
    zIndex: number;

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
        this.colors = ["#ffffff", "#ff0000"];
        this.shapes = ["square", "circle"];
        this.scalar = 1;
        this.zIndex = 100;
        this.disableForReducedMotion = true;
    }

    /**
     * @deprecated use position instead
     */
    get origin(): ICoordinates {
        return {
            x: this.position.x / 100,
            y: this.position.y / 100,
        };
    }

    /**
     * @deprecated use position instead
     */
    set origin(value: ICoordinates) {
        this.position.x = value.x * 100;
        this.position.y = value.y * 100;
    }

    /**
     * @deprecated use count instead
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

    load(data?: RecursivePartial<IConfettiOptions>): void {
        if (!data) {
            return;
        }

        if (data.angle !== undefined) {
            this.angle = data.angle;
        }

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

        if (data.gravity !== undefined) {
            this.gravity = data.gravity;
        }

        if (data.drift !== undefined) {
            this.drift = data.drift;
        }

        if (data.ticks !== undefined) {
            this.ticks = data.ticks;
        }

        const position = data.position ?? this.position;

        if (position?.x !== undefined) {
            this.position.x = position.x;
        }

        if (position?.y !== undefined) {
            this.position.y = position.y;
        }

        if (data.colors !== undefined) {
            if (data.colors instanceof Array) {
                this.colors = [...data.colors];
            } else {
                this.colors = data.colors;
            }
        }

        if (data.shapes !== undefined) {
            if (data.shapes instanceof Array) {
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
