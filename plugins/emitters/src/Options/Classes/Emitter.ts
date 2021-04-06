import type { IEmitter } from "../Interfaces/IEmitter";
import type { RecursivePartial } from "tsparticles-engine/Types";
import type { ICoordinates } from "tsparticles-engine/Core/Interfaces/ICoordinates";
import { MoveDirection, MoveDirectionAlt } from "tsparticles-engine/Enums";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import { EmitterRate } from "./EmitterRate";
import { EmitterLife } from "./EmitterLife";
import { deepExtend } from "tsparticles-engine/Utils";
import { EmitterSize } from "./EmitterSize";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";
import { AnimatableColor } from "tsparticles-engine/Options/Classes/AnimatableColor";
import { EmitterSpin } from "./EmitterSpin";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    life;
    name?: string;
    particles?: RecursivePartial<IParticles>;
    position?: RecursivePartial<ICoordinates>;
    rate;
    size?: EmitterSize;
    spin;
    spawnColor?: AnimatableColor;

    constructor() {
        this.autoPlay = true;
        this.direction = MoveDirection.none;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.spin = new EmitterSpin();
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

        this.life.load(data.life);

        this.name = data.name;

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        this.rate.load(data.rate);

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }

        this.spin.load(data.spin);

        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }

            this.spawnColor.load(data.spawnColor);
        }
    }
}
