import type { IMove } from "../../../Interfaces/Options/Particles/IMove";
import { Attract } from "./Attract";
import { MoveDirection } from "../../../Enums/MoveDirection";
import { OutMode } from "../../../Enums/OutMode";
import type { IAttract } from "../../../Interfaces/Options/Particles/IAttract";
import { Trail } from "./Trail";
import type { ITrail } from "../../../Interfaces/Options/Particles/ITrail";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class Move implements IMove {
    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    get bounce(): boolean {
        return this.collisions;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
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

    public attract: IAttract;
    public collisions: boolean;
    public direction: MoveDirection;
    public enable: boolean;
    public outMode: OutMode;
    public random: boolean;
    public speed: number;
    public straight: boolean;
    public trail: ITrail;

    constructor() {
        this.attract = new Attract();
        this.collisions = false;
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

            if (data.collisions !== undefined) {
                this.collisions = data.collisions;
            } else if (data.bounce !== undefined) {
                this.bounce = data.bounce;
            }

            if (data.direction !== undefined) {
                this.direction = data.direction;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.outMode !== undefined) {
                this.outMode = data.outMode;
            } else if (data.out_mode !== undefined) {
                this.out_mode = data.out_mode;
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
