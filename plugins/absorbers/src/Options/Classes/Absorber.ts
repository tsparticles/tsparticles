import {
  type IOptionLoader,
  type IRangedCoordinates,
  OptionsColor,
  type RecursivePartial,
  isNull,
  loadProperty,
  setRangeValue,
} from "@tsparticles/engine";
import { AbsorberLife } from "./AbsorberLife.js";
import { AbsorberSize } from "./AbsorberSize.js";
import type { IAbsorber } from "../Interfaces/IAbsorber.js";

/**
 * [[include:Options/Plugins/Absorbers.md]]
 */
export class Absorber implements IAbsorber, IOptionLoader<IAbsorber> {
  /**
   * The absorber color
   */
  color;
  /**
   * Enables particle destruction, if disabled the particle will randomly respawn
   */
  destroy;
  /**
   * Enables dragging on absorbers
   */
  draggable;
  /**
   * The absorber life options
   */
  life;
  /**
   * The absorber name
   */
  name?: string;
  /**
   * The absorber opacity
   */
  opacity;
  /**
   * Enables particles orbiting while being attracted by the absorber
   */
  orbits;
  /**
   * The absorber position, percent values calculated on canvas size
   */
  position?: RecursivePartial<IRangedCoordinates>;
  /**
   * The absorber size options
   */
  size;

  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.life = new AbsorberLife();
    this.size = new AbsorberSize();
  }

  /**
   * Loads the absorber options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IAbsorber>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "draggable", data.draggable);

    if (data.life !== undefined) {
      this.life.load(data.life);
    }

    this.name = data.name;

    loadProperty(this, "opacity", data.opacity);

    if (data.position !== undefined) {
      this.position = {};

      if (data.position.x !== undefined) {
        this.position.x = setRangeValue(data.position.x);
      }

      if (data.position.y !== undefined) {
        this.position.y = setRangeValue(data.position.y);
      }
    }

    if (data.size !== undefined) {
      this.size.load(data.size);
    }

    loadProperty(this, "destroy", data.destroy);
    loadProperty(this, "orbits", data.orbits);
  }
}
