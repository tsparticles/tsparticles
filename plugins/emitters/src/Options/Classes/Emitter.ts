import { AnimatableColor, deepExtend, executeOnSingleOrMultiple, setRangeValue } from "tsparticles-engine";
import type {
    IOptionLoader,
    IParticlesOptions,
    IRangedCoordinates,
    MoveDirection,
    MoveDirectionAlt,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import { EmitterLife } from "./EmitterLife";
import { EmitterRate } from "./EmitterRate";
import { EmitterShapeType } from "../../Enums/EmitterShapeType";
import { EmitterSize } from "./EmitterSize";
import type { IEmitter } from "../Interfaces/IEmitter";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill;
    life;
    name?: string;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate;
    shape: EmitterShapeType | keyof typeof EmitterShapeType;
    size?: EmitterSize;
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
        if (!data) {
            return;
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        if (data.size !== undefined) {
            if (!this.size) {
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

        this.particles = executeOnSingleOrMultiple(data.particles, (particles) => {
            return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
        });

        this.rate.load(data.rate);

        if (data.shape !== undefined) {
            this.shape = data.shape;
        }

        if (data.position !== undefined) {
            this.position = {};

            if (data.position.x !== undefined) {
                this.position.x = setRangeValue(data.position.x);
            }

            if (data.position.y !== undefined) {
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
