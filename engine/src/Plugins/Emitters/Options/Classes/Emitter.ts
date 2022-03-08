import { MoveDirection, MoveDirectionAlt } from "../../../../Enums";
import { deepExtend, setRangeValue } from "../../../../Utils";
import { AnimatableColor } from "../../../../Options/Classes/AnimatableColor";
import { EmitterLife } from "./EmitterLife";
import { EmitterRate } from "./EmitterRate";
import { EmitterShapeType } from "../../Enums";
import { EmitterSize } from "./EmitterSize";
import type { IEmitter } from "../Interfaces/IEmitter";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import type { IRangedCoordinates } from "../../../../Core";
import type { RecursivePartial } from "../../../../Types";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay;
    size?: EmitterSize;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill;
    life;
    name?: string;
    particles?: RecursivePartial<IParticles>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate;
    shape: EmitterShapeType | keyof typeof EmitterShapeType;
    spawnColor?: AnimatableColor;
    startCount;

    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.shape = EmitterShapeType.square;
        this.startCount = 0;
    }

    load(data?: RecursivePartial<IEmitter>): void {
        if (data === undefined) {
            return;
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
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

        this.domId = data.domId;

        if (data.fill !== undefined) {
            this.fill = data.fill;
        }

        this.life.load(data.life);

        this.name = data.name;

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        this.rate.load(data.rate);

        if (data.shape !== undefined) {
            this.shape = data.shape;
        }

        if (data.position !== undefined) {
            this.position = {};

            if (data.position.x) {
                this.position.x = setRangeValue(data.position.x);
            }

            if (data.position.y) {
                this.position.y = setRangeValue(data.position.y);
            }
        }

        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }

            this.spawnColor.load(data.spawnColor);
        }

        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}
