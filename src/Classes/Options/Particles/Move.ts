import {IMove} from "../../../Interfaces/Options/Particles/IMove";
import {Attract} from "./Attract";
import {MoveDirection} from "../../../Enums/MoveDirection";
import {OutMode} from "../../../Enums/OutMode";
import {IAttract} from "../../../Interfaces/Options/Particles/IAttract";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class Move implements IMove {
    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    get bounce(): boolean {
        Messages.deprecated("particles.move.bounce", "particles.move.collisions");

        return this.collisions;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    set bounce(value: boolean) {
        Messages.deprecated("particles.move.collisions", "particles.move.collisions");

        this.collisions = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    public get out_mode(): OutMode {
        Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

        return this.outMode;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    public set out_mode(value: OutMode) {
        Messages.deprecated("particles.move.out_mode", "particles.move.outMode");

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

    constructor() {
        this.attract = new Attract();
        this.collisions = false;
        this.direction = MoveDirection.none;
        this.enable = true;
        this.outMode = OutMode.out;
        this.random = false;
        this.speed = 2;
        this.straight = false;
    }

    public load(data: IMove): void {
        if (Utils.hasData(data)) {
            this.attract.load(data.attract);

            if (Utils.hasData(data.collisions)) {
                this.collisions = data.collisions;
            }

            if (Utils.hasData(data.bounce)) {
                this.bounce = data.bounce;
            }

            if (Utils.hasData(data.direction)) {
                this.direction = data.direction;
            }

            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.outMode)) {
                this.outMode = data.outMode;
            }

            if (Utils.hasData(data.out_mode)) {
                this.out_mode = data.out_mode;
            }

            if (Utils.hasData(data.random)) {
                this.random = data.random;
            }

            if (Utils.hasData(data.speed)) {
                this.speed = data.speed;
            }

            if (Utils.hasData(data.straight)) {
                this.straight = data.straight;
            }
        }
    }
}
