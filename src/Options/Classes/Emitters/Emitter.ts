import type { IEmitter } from "../../Interfaces/Emitters/IEmitter";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../../Interfaces/Particles/IParticles";
import { EmitterRate } from "./EmitterRate";
import { EmitterLife } from "./EmitterLife";
import { Utils } from "../../../Utils/Utils";
import { EmitterSize } from "./EmitterSize";

export class Emitter implements IEmitter {
    public size?: EmitterSize;
    public direction: MoveDirection;
    public life: EmitterLife;
    public particles?: RecursivePartial<IParticles>;
    public position?: ICoordinates;
    public rate: EmitterRate;

    constructor() {
        this.direction = MoveDirection.none;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
    }

    public load(data?: RecursivePartial<IEmitter>): void {
        if (data !== undefined) {
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

            if (data.particles !== undefined) {
                this.particles = Utils.deepExtend({}, data.particles);
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
}
