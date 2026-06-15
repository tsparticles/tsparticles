import {
  type ICoordinates,
  type IOptionLoader,
  type IShapeValues,
  type RecursivePartial,
  type ShapeData,
  type SingleOrMultiple,
  deepExtend,
  isArray,
  isNull,
  loadProperty,
  percentDenominator,
} from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";

/** Confetti options class */
export class ConfettiOptions implements IConfettiOptions, IOptionLoader<IConfettiOptions> {
  /** Confetti angle */
  angle: number;

  /** Confetti colors */
  colors: SingleOrMultiple<string>;

  /** Number of confetti particles to emit */
  count: number;

  /** Confetti decay rate */
  decay: number;

  /** Disables confetti for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Confetti drift offset */
  drift: number;

  /** Enables flat confetti */
  flat: boolean;

  /** Confetti gravity */
  gravity: number;

  /** Confetti position, in percent values */
  position: ICoordinates;

  /** Confetti size scalar */
  scalar: number;

  /** Per-shape options */
  shapeOptions: ShapeData;

  /** Confetti shape types */
  shapes: SingleOrMultiple<string>;

  /** Confetti spread angle */
  spread: number;

  /** Confetti initial velocity */
  startVelocity: number;

  /** Confetti animation ticks */
  ticks: number;

  /** Confetti z-index */
  zIndex: number;

  /** Creates a new ConfettiOptions instance with default values */
  constructor() {
    this.angle = 90;
    this.count = 50;
    this.spread = 45;
    this.startVelocity = 45;
    this.decay = 0.9;
    this.gravity = 1;
    this.drift = 0;
    this.ticks = 200;
    this.position = {
      x: 50,
      y: 50,
    };
    this.colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
    this.shapes = ["square", "circle"];
    this.scalar = 1;
    this.zIndex = 100;
    this.disableForReducedMotion = true;
    this.flat = false;
    this.shapeOptions = {};
  }

  /**
   * @deprecated use position instead
   * @returns the origin of the confetti
   */
  get origin(): ICoordinates {
    return {
      x: this.position.x / percentDenominator,
      y: this.position.y / percentDenominator,
    };
  }

  /**
   * @deprecated use position instead
   */
  set origin(value: ICoordinates) {
    this.position.x = value.x * percentDenominator;
    this.position.y = value.y * percentDenominator;
  }

  /**
   * @deprecated use count instead
   * @returns the number of particles
   */
  get particleCount(): number {
    return this.count;
  }

  /**
   * @deprecated use count instead
   */
  set particleCount(value: number) {
    this.count = value;
  }

  /**
   * Loads confetti options from the provided data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IConfettiOptions>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "angle", data.angle);

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const count = data.count ?? data.particleCount;

    if (count !== undefined) {
      this.count = count;
    }

    loadProperty(this, "spread", data.spread);
    loadProperty(this, "startVelocity", data.startVelocity);
    loadProperty(this, "decay", data.decay);
    loadProperty(this, "flat", data.flat);
    loadProperty(this, "gravity", data.gravity);
    loadProperty(this, "drift", data.drift);
    loadProperty(this, "ticks", data.ticks);

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const origin = data.origin;

    if (origin && !data.position) {
      data.position = {
        x: origin.x === undefined ? undefined : origin.x * percentDenominator,
        y: origin.y === undefined ? undefined : origin.y * percentDenominator,
      };
    }

    const position = data.position;

    if (position) {
      if (position.x !== undefined) {
        this.position.x = position.x;
      }

      if (position.y !== undefined) {
        this.position.y = position.y;
      }
    }

    if (data.colors !== undefined) {
      if (isArray(data.colors)) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }

    const options = data.shapeOptions;

    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];

        if (item) {
          this.shapeOptions[shape] = deepExtend(this.shapeOptions[shape] ?? {}, item) as IShapeValues[];
        }
      }
    }

    if (data.shapes !== undefined) {
      if (isArray(data.shapes)) {
        this.shapes = [...data.shapes];
      } else {
        this.shapes = data.shapes;
      }
    }

    loadProperty(this, "scalar", data.scalar);
    loadProperty(this, "zIndex", data.zIndex);
    loadProperty(this, "disableForReducedMotion", data.disableForReducedMotion);
  }
}
