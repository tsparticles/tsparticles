import {
  type ICoordinates,
  type IDimension,
  type IOptionLoader,
  type IShapeValues,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  isArray,
  isNull,
  percentDenominator,
} from "@tsparticles/engine";
import type { IRibbonsOptions } from "./IRibbonsOptions.js";

/** Ribbons options class */
export class RibbonsOptions implements IRibbonsOptions, IOptionLoader<IRibbonsOptions> {
  /** Ribbons angle */
  angle: number;

  /** Ribbon colors */
  colors: SingleOrMultiple<string>;

  /** Number of ribbon particles to emit */
  count: number;

  /** Disables ribbons for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Ribbons drift offset */
  drift: number;

  /** Emitter size for particle spawn area */
  emitterSize: IDimension;

  /** Ribbons position, in percent values */
  position: ICoordinates;

  /** Ribbon shape options */
  ribbonOptions: SingleOrMultiple<IShapeValues>;

  /** Ribbons size scalar */
  scalar: number;

  /** Ribbons spread angle */
  spread: number;

  /** Ribbons animation ticks */
  ticks: number;

  /** Ribbons z-index */
  zIndex: number;

  /** Creates a new RibbonsOptions instance with default values */
  constructor() {
    this.angle = 90;
    this.count = 5;
    this.spread = 0;
    this.drift = 0;
    this.emitterSize = {
      width: 100,
      height: 0,
    };
    this.ticks = 200;
    this.position = {
      x: 50,
      y: 0,
    };
    this.colors = ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"];
    this.ribbonOptions = {
      angle: 45,
      darken: {
        enable: true,
        value: 30,
      },
      count: 60,
      drag: 0.02,
      mass: 1,
      oscillationDistance: {
        min: 100,
        max: 140,
      },
      oscillationSpeed: {
        min: 3,
        max: 5,
      },
      particleDist: 8,
      velocityInherit: {
        min: 4,
        max: 6,
      },
    };
    this.scalar = 1;
    this.zIndex = 100;
    this.disableForReducedMotion = true;
  }

  /**
   * @deprecated use position instead
   * @returns the origin of the ribbons
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
   * Loads ribbons options from the provided data
   * @param data -
   */
  load(data?: RecursivePartial<IRibbonsOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = data.angle;
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const count = data.count ?? data.particleCount;

    if (count !== undefined) {
      this.count = count;
    }

    if (data.spread !== undefined) {
      this.spread = data.spread;
    }

    if (data.drift !== undefined) {
      this.drift = data.drift;
    }

    if (data.ticks !== undefined) {
      this.ticks = data.ticks;
    }

    if (data.emitterSize) {
      if (data.emitterSize.width !== undefined) {
        this.emitterSize.width = data.emitterSize.width;
      }

      if (data.emitterSize.height !== undefined) {
        this.emitterSize.height = data.emitterSize.height;
      }
    }

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

    if (data.ribbonOptions !== undefined) {
      this.ribbonOptions = deepExtend({}, data.ribbonOptions) as SingleOrMultiple<IShapeValues>;
    }

    if (data.scalar !== undefined) {
      this.scalar = data.scalar;
    }

    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }

    if (data.disableForReducedMotion !== undefined) {
      this.disableForReducedMotion = data.disableForReducedMotion;
    }
  }
}
