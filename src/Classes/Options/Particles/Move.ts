import type { IMove } from "../../../Interfaces/Options/Particles/IMove";
import { Attract } from "./Attract";
import { MoveDirection } from "../../../Enums/MoveDirection";
import { OutMode } from "../../../Enums/OutMode";
import { Trail } from "./Trail";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class Move implements IMove {
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
    public get out_mode(): OutMode {
        return this.outMode;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    public set out_mode(value: OutMode) {
        this.outMode = value;
    }

    public attract: Attract;
    public direction: MoveDirection;
    public enable: boolean;
    public outMode: OutMode;
    public random: boolean;
    public speed: number;
    public straight: boolean;
    public trail: Trail;

    constructor() {
        this.attract = new Attract();
        this.direction = MoveDirection.none;
        this.enable = false;
        this.outMode = OutMode.out;
        this.random = false;
        this.speed = 2;
        this.straight = false;
        this.trail = new Trail();
    }

    public load(data?: RecursivePartial<IMove>): void {
        if (data !== undefined) {
            this.attract.load(data.attract);

            if (data.direction !== undefined) {
                this.direction = data.direction;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            const outMode = data.outMode ?? data.out_mode;

            if (outMode !== undefined) {
                this.outMode = outMode;
            }

            if (data.random !== undefined) {
                this.random = data.random;
            }

            if (data.speed !== undefined) {
                this.speed = data.speed;
            }

            if (data.straight !== undefined) {
                this.straight = data.straight;
            }

            this.trail.load(data.trail);
        }
    }
}
