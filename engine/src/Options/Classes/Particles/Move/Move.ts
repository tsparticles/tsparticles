import { MoveDirection, type MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection.js";
import { isNumber, isObject } from "../../../../Utils/TypeUtils.js";
import { loadProperty, loadRangeProperty } from "../../../../Utils/OptionsUtils.js";
import type { IDistance } from "../../../../Core/Interfaces/IDistance.js";
import type { IMove } from "../../../Interfaces/Particles/Move/IMove.js";
import { MoveAngle } from "./MoveAngle.js";
import { MoveCenter } from "./MoveCenter.js";
import { MoveGravity } from "./MoveGravity.js";
import { MovePath } from "./Path/MovePath.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import { OutModes } from "./OutModes.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { Spin } from "./Spin.js";

/**
 * [[include:Options/Particles/Move.md]]
 */
export class Move extends OptionLoader<IMove> implements IMove {
  readonly angle = new MoveAngle();
  readonly center = new MoveCenter();
  decay: RangeValue = 0;
  direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number = MoveDirection.none;
  distance: Partial<IDistance> = {};
  drift: RangeValue = 0;
  enable = false;
  readonly gravity = new MoveGravity();
  readonly outModes = new OutModes();
  readonly path = new MovePath();
  random = false;
  size = false;
  speed: RangeValue = 2;
  readonly spin = new Spin();
  straight = false;
  vibrate = false;
  warp = false;

  protected doLoad(data: RecursivePartial<IMove>): void {
    this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);

    this.center.load(data.center);

    loadRangeProperty(this, "decay", data.decay);
    loadProperty(this, "direction", data.direction);

    if (data.distance !== undefined) {
      this.distance = isNumber(data.distance)
        ? {
            horizontal: data.distance,
            vertical: data.distance,
          }
        : { ...data.distance };
    }

    loadRangeProperty(this, "drift", data.drift);
    loadProperty(this, "enable", data.enable);

    this.gravity.load(data.gravity);

    const outModes = data.outModes;

    if (outModes !== undefined) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes,
        });
      }
    }

    this.path.load(data.path);

    loadProperty(this, "random", data.random);
    loadProperty(this, "size", data.size);
    loadRangeProperty(this, "speed", data.speed);

    this.spin.load(data.spin);

    loadProperty(this, "straight", data.straight);
    loadProperty(this, "vibrate", data.vibrate);
    loadProperty(this, "warp", data.warp);
  }
}
