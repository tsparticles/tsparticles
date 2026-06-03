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
  /** Ribbon colors */
  colors: SingleOrMultiple<string>;

  /** Number of ribbon particles to emit */
  count: number;

  /** Disables ribbons for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Emitter size for particle spawn area */
  emitterSize: IDimension;

  /** Ribbons horizontal spawn position (percent) */
  positionX: number;

  /** Ribbon shape options */
  ribbonOptions: SingleOrMultiple<IShapeValues>;

  /** Ribbons size scalar */
  scalar: number;

  /** Ribbons animation ticks */
  ticks: number;

  /** Ribbons z-index */
  zIndex: number;

  /** Creates a new RibbonsOptions instance with default values */
  constructor() {
    this.count = 5;
    this.emitterSize = {
      width: 100,
      height: 0,
    };
    this.positionX = 50;
    this.ticks = 200;
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
   * @deprecated use positionX instead
   * @returns the origin of the ribbons
   */
  get origin(): ICoordinates {
    return {
      x: this.positionX / percentDenominator,
      y: 0,
    };
  }

  /**
   * @deprecated use positionX instead
   */
  set origin(value: ICoordinates) {
    this.positionX = value.x * percentDenominator;
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
   * @deprecated use positionX instead
   * @returns the ribbons horizontal position
   */
  get position(): ICoordinates {
    return {
      x: this.positionX,
      y: 0,
    };
  }

  /**
   * @deprecated use positionX instead
   */
  set position(value: ICoordinates) {
    this.positionX = value.x;
  }

  /**
   * Loads ribbons options from the provided data
   * @param data -
   */
  load(data?: RecursivePartial<IRibbonsOptions>): void {
    if (isNull(data)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const count = data.count ?? data.particleCount;

    if (count !== undefined) {
      this.count = count;
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

    if (data.positionX !== undefined) {
      this.positionX = data.positionX;
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const origin = data.origin;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (origin && data.positionX === undefined && !data.position) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      data.position = {
        x: origin.x === undefined ? undefined : origin.x * percentDenominator,
        y: 0,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const position = data.position;

    if (position && data.positionX === undefined) {
      if (position.x !== undefined) {
        this.positionX = position.x;
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
