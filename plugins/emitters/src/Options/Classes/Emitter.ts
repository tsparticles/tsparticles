import {
  AnimatableColor,
  type IOptionLoader,
  type IParticlesOptions,
  type IRangedCoordinates,
  type MoveDirection,
  type MoveDirectionAlt,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  executeOnSingleOrMultiple,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import { EmitterLife } from "./EmitterLife.js";
import { EmitterRate } from "./EmitterRate.js";
import { EmitterShape } from "./EmitterShape.js";
import { EmitterSize } from "./EmitterSize.js";
import { EmitterSpawn } from "./EmitterSpawn.js";
import type { IEmitter } from "../Interfaces/IEmitter.js";

/**
 * [[include:Options/Plugins/Emitters.md]]
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
  shape;
  size?: EmitterSize;
  spawn;
  spawnFillColor?: AnimatableColor;
  spawnStrokeColor?: AnimatableColor;
  startCount;

  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = new EmitterShape();
    this.spawn = new EmitterSpawn();
    this.startCount = 0;
  }

  load(data?: RecursivePartial<IEmitter>): void {
    if (isNull(data)) {
      return;
    }

    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }

    if (data.size !== undefined) {
      this.size ??= new EmitterSize();

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

    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
    });

    this.rate.load(data.rate);
    this.shape.load(data.shape);
    this.spawn.load(data.spawn);

    if (data.position !== undefined) {
      this.position = {};

      if (data.position.x !== undefined) {
        this.position.x = setRangeValue(data.position.x);
      }

      if (data.position.y !== undefined) {
        this.position.y = setRangeValue(data.position.y);
      }
    }

    if (data.spawnFillColor !== undefined) {
      this.spawnFillColor ??= new AnimatableColor();

      this.spawnFillColor.load(data.spawnFillColor);
    }

    if (data.spawnStrokeColor !== undefined) {
      this.spawnStrokeColor ??= new AnimatableColor();

      this.spawnStrokeColor.load(data.spawnStrokeColor);
    }

    if (data.startCount !== undefined) {
      this.startCount = data.startCount;
    }
  }
}
