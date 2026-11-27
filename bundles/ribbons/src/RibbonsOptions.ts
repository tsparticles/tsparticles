import {
  type IDimension,
  type IOptionLoader,
  type IShapeValues,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  isArray,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IRibbonsOptions } from "./IRibbonsOptions.js";

/** Ribbons options class */
export class RibbonsOptions
  implements IRibbonsOptions, IOptionLoader<IRibbonsOptions>
{
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
   * Loads ribbons options from the provided data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IRibbonsOptions>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "count", data.count);

    if (data.emitterSize) {
      if (data.emitterSize.width !== undefined) {
        this.emitterSize.width = data.emitterSize.width;
      }

      if (data.emitterSize.height !== undefined) {
        this.emitterSize.height = data.emitterSize.height;
      }
    }

    loadProperty(this, "positionX", data.positionX);

    if (data.colors !== undefined) {
      if (isArray(data.colors)) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }

    if (data.ribbonOptions !== undefined) {
      this.ribbonOptions = deepExtend(
        {},
        data.ribbonOptions,
      ) as SingleOrMultiple<IShapeValues>;
    }

    loadProperty(this, "scalar", data.scalar);
    loadProperty(this, "zIndex", data.zIndex);
    loadProperty(this, "disableForReducedMotion", data.disableForReducedMotion);
  }
}
