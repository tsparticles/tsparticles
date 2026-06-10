import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  type SingleOrMultiple,
  isArray,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IFireworkOptions } from "./IFireworkOptions.js";

/** Firework options class */
export class FireworkOptions implements IFireworkOptions, IOptionLoader<IFireworkOptions> {
  /** Background color */
  background: string;
  /** Brightness offset for stroke colors */
  brightness: RangeValue;
  /** Firework colors */
  colors: SingleOrMultiple<string>;
  /** Gravity acceleration */
  gravity: RangeValue;
  /** Minimum height before splitting */
  minHeight: RangeValue;
  /** Firework launch rate */
  rate: RangeValue;
  /** Saturation offset for stroke colors */
  saturation: RangeValue;
  /** Enables explosion sounds */
  sounds;
  /** Rocket speed */
  speed: RangeValue;
  /** Number of split particles per explosion */
  splitCount: RangeValue;

  /** Creates a new FireworkOptions instance with default values */
  constructor() {
    this.background = "none";
    this.brightness = {
      min: -30,
      max: 30,
    };
    this.colors = [
      "#FF0000",
      "#FF2A00",
      "#FF5500",
      "#FF8000",
      "#FFAA00",
      "#FFD400",
      "#FFFF00",
      "#D4FF00",
      "#AAFF00",
      "#80FF00",
      "#55FF00",
      "#2AFF00",
      "#00FF00",
      "#00FF2A",
      "#00FF55",
      "#00FF80",
      "#00FFAA",
      "#00FFD4",
      "#00FFFF",
      "#00D4FF",
      "#00AAFF",
      "#0080FF",
      "#0055FF",
      "#002AFF",
      "#0000FF",
      "#2A00FF",
      "#5500FF",
      "#8000FF",
      "#AA00FF",
      "#D400FF",
      "#FF00FF",
      "#FF00D4",
      "#FF00AA",
      "#FF0080",
      "#FF0055",
      "#FF002A",
    ];
    this.gravity = 30;
    this.minHeight = {
      min: 10,
      max: 30,
    };
    this.rate = 10;
    this.saturation = {
      min: -30,
      max: 30,
    };
    this.sounds = true;
    this.speed = { min: 20, max: 40 };
    this.splitCount = 100;
  }

  /**
   * Loads firework options from the provided data
   * @param data
   */
  load(data?: RecursivePartial<IFireworkOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.colors !== undefined) {
      if (isArray(data.colors)) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }

    loadProperty(this, "background", data.background);
    loadRangeProperty(this, "brightness", data.brightness);
    loadRangeProperty(this, "gravity", data.gravity);
    loadRangeProperty(this, "minHeight", data.minHeight);
    loadRangeProperty(this, "rate", data.rate);
    loadRangeProperty(this, "saturation", data.saturation);
    loadProperty(this, "sounds", data.sounds);
    loadRangeProperty(this, "speed", data.speed);
    loadRangeProperty(this, "splitCount", data.splitCount);
  }
}
