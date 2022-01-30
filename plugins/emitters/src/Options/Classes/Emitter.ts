import { AnimatableColor, MoveDirection, MoveDirectionAlt, deepExtend } from "tsparticles-engine";
import type { ICoordinates, IOptionLoader, IParticlesOptions, RecursivePartial } from "tsparticles-engine";
import { EmitterLife } from "./EmitterLife";
import { EmitterRate } from "./EmitterRate";
import { EmitterShapeType } from "../../Enums";
import { EmitterSize } from "./EmitterSize";
import type { IEmitter } from "../Interfaces/IEmitter";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay;
    size?: EmitterSize;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    fill;
    life;
    name?: string;
    particles?: RecursivePartial<IParticlesOptions>;
    position?: RecursivePartial<ICoordinates>;
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

        if (data.fill !== undefined) {
            this.fill = data.fill;
        }

        this.life.load(data.life);

        this.name = data.name;

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticlesOptions>;
        }

        this.rate.load(data.rate);

        if (data.shape !== undefined) {
            this.shape = data.shape;
        }

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
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
