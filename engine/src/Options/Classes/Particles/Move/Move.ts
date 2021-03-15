import type { IMove } from "../../../Interfaces/Particles/Move/IMove";
import { Attract } from "./Attract";
import { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import { Trail } from "./Trail";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { MovePath } from "./Path/MovePath";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { MoveAngle } from "./MoveAngle";
import { MoveGravity } from "./MoveGravity";
import { OutModes } from "./OutModes";
import { Spin } from "./Spin";
import { deepExtend, setRangeValue } from "../../../../Utils";
import type { IDistance } from "../../../../Core/Interfaces";
import { IMovePath } from "../../../Interfaces/Particles/Move/IMovePath";

/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export class Move implements IMove, IOptionLoader<IMove> {
    get noise(): IMovePath {
        return this.path;
    }

    set noise(value: IMovePath) {
        this.path.load(value);
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get collisions(): boolean {
        return false;
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set collisions(value: boolean) {
        // deprecated
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get bounce(): boolean {
        return this.collisions;
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set bounce(value: boolean) {
        this.collisions = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    public get out_mode(): OutMode | keyof typeof OutMode | OutModeAlt {
        return this.outMode;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    public set out_mode(value: OutMode | keyof typeof OutMode | OutModeAlt) {
        this.outMode = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    public get outMode(): OutMode | keyof typeof OutMode | OutModeAlt {
        return this.outModes.default;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    public set outMode(value: OutMode | keyof typeof OutMode | OutModeAlt) {
        this.outModes.default = value;
    }

    public angle;
    public attract;
    public decay;
    public direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public distance: Partial<IDistance>;
    public enable;
    public gravity;
    public outModes: OutModes;
    public path;
    public random;
    public size;
    public speed: RangeValue;
    public spin;
    public straight;
    public trail;
    public vibrate;
    public warp;

    constructor() {
        this.angle = new MoveAngle();
        this.attract = new Attract();
        this.decay = 0;
        this.direction = MoveDirection.none;
        this.distance = {};
        this.enable = false;
        this.gravity = new MoveGravity();
        this.decay = 0;
        this.outModes = new OutModes();
        this.path = new MovePath();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin();
        this.straight = false;
        this.trail = new Trail();
        this.vibrate = false;
        this.warp = false;
    }

    public load(data?: RecursivePartial<IMove>): void {
        if (data === undefined) {
            return;
        }

        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            } else {
                this.angle.load(data.angle);
            }
        }

        this.attract.load(data.attract);

        if (data.decay !== undefined) {
            this.decay = data.decay;
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        if (data.distance !== undefined) {
            this.distance =
                typeof data.distance === "number"
                    ? {
                          horizontal: data.distance,
                          vertical: data.distance,
                      }
                    : (deepExtend({}, data.distance) as IDistance);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.gravity.load(data.gravity);

        this.path.load(data.path ?? data.noise);

        const outMode = data.outMode ?? data.out_mode;

        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                this.outModes.load({
                    default: data.outModes ?? outMode,
                });
            } else {
                this.outModes.load(data.outModes);
            }
        }

        if (data.random !== undefined) {
            this.random = data.random;
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        this.spin.load(data.spin);

        if (data.straight !== undefined) {
            this.straight = data.straight;
        }

        this.trail.load(data.trail);

        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }

        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
