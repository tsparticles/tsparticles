import {
  type Engine,
  type IOptionLoader,
  OptionsColor,
  type RecursivePartial,
  isNull,
  isString,
  stringToAlpha,
} from "@tsparticles/engine";
import type { IPolygonMaskDrawStroke } from "../Interfaces/IPolygonMaskDrawStroke.js";

/**
 */
export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke, IOptionLoader<IPolygonMaskDrawStroke> {
  color;
  opacity;
  width;

  private readonly _engine;

  constructor(engine: Engine) {
    this._engine = engine;
    this.color = new OptionsColor();
    this.width = 0.5;
    this.opacity = 1;
  }

  load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
    if (isNull(data)) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (isString(this.color.value)) {
      this.opacity = stringToAlpha(this._engine, this.color.value) ?? this.opacity;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
