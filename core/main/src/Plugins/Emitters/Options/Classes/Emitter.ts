import type { IEmitter } from "../Interfaces/IEmitter";
import type { RecursivePartial } from "../../../../Types";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { MoveDirection, MoveDirectionAlt } from "../../../../Enums";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import { EmitterRate } from "./EmitterRate";
import { EmitterLife } from "./EmitterLife";
import { Utils } from "../../../../Utils";
import { EmitterSize } from "./EmitterSize";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    public size?: EmitterSize;
    public direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public life;
    public name?: string;
    public particles?: RecursivePartial<IParticles>;
    public position?: RecursivePartial<ICoordinates>;
    public rate;

    constructor() {
        this.direction = MoveDirection.none;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
    }

    public load(data?: RecursivePartial<IEmitter>): void {
        if (data === undefined) {
            return;
        }

        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new EmitterSize();
            }

            this.size.load(data.size);
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        this.life.load(data.life);

        this.name = data.name;

        if (data.particles !== undefined) {
            this.particles = Utils.deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        this.rate.load(data.rate);

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }
    }
}
