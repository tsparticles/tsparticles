import type { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection.js";
import type { IDistance } from "../../../../Core/Interfaces/IDistance.js";
import type { IMoveAngle } from "./IMoveAngle.js";
import type { IMoveAttract } from "./IMoveAttract.js";
import type { IMoveCenter } from "./IMoveCenter.js";
import type { IMoveGravity } from "./IMoveGravity.js";
import type { IMovePath } from "./Path/IMovePath.js";
import type { IOutModes } from "./IOutModes.js";
import type { ISpin } from "./ISpin.js";
import type { OutMode } from "../../../../Enums/Modes/OutMode.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

/**
 * [[include:Options/Particles/Move.md]]
 */
export interface IMove {
  /**
   * The angle value of the particles moving direction, in degrees.
   */
  angle: number | IMoveAngle;

  /**
   * The attract options for the particles.
   */
  attract: IMoveAttract;

  /**
   * The center of the particles moving direction. Used when the direction is {@link MoveDirection.inside} or {@link MoveDirection.outside}, or when {@link spin} is enabled.
   */
  center: IMoveCenter;

  /**
   * The particles movement decay speed.
   */
  decay: RangeValue;

  /**
   * The particles movement direction, if using a number, it refers to the angle, in degrees.
   */
  direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;

  /**
   * The particles movement distance.
   */
  distance: number | Partial<IDistance>;

  /**
   * The particles movement drift value.
   */
  drift: RangeValue;

  /**
   * The particles movement enable status.
   */
  enable: boolean;

  /**
   * The particles movement gravity options.
   */
  gravity: IMoveGravity;

  /**
   * The particles out modes when leaving canvas bounds.
   */
  outModes: IOutModes | OutMode | keyof typeof OutMode;

  /**
   * The particles path options.
   */
  path: IMovePath;

  /**
   * Sets if the {@link speed} will be randomized or not, maximum value is {@link speed}.
   */
  random: boolean;

  /**
   * Sets if the particle speed will change based on the particle size, so bigger particles will move faster.
   */
  size: boolean;

  /**
   * The particles movement speed.
   */
  speed: RangeValue;

  /**
   * The particles movement spin options.
   */
  spin: ISpin;

  /**
   * Sets if the particles direction will be randomized or not, if `true` the value won't be randomized.
   */
  straight: boolean;

  /**
   * Sets if the particles will vibrate or not.
   */
  vibrate: boolean;

  /**
   * Sets if the particle will respawn in the same coordinates on the other side of the canvas, or it will be randomized.
   */
  warp: boolean;
}
