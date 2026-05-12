import {
  type IOptionLoader,
  OptionsColor,
  type PluginManager,
  type RecursivePartial,
  isNull,
  isString,
  stringToAlpha,
} from "@tsparticles/engine";
import type { IPolygonMaskDrawStroke } from "../Interfaces/IPolygonMaskDrawStroke.js";

/** The polygon mask draw stroke options */
export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke, IOptionLoader<IPolygonMaskDrawStroke> {
  /** The polygon mask draw stroke color */
  color;
  /** The polygon mask draw stroke opacity */
  opacity;
  /** The polygon mask draw stroke width */
  width;

  /** The plugin manager */
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
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
      this.opacity = stringToAlpha(this._pluginManager, this.color.value) ?? this.opacity;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
