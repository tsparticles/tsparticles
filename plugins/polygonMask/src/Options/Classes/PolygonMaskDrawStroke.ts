import {
  type IOptionLoader,
  OptionsColor,
  type PluginManager,
  type RecursivePartial,
  isNull,
  isString,
  loadProperty,
  stringToAlpha,
} from "@tsparticles/engine";
import type { IPolygonMaskDrawStroke } from "../Interfaces/IPolygonMaskDrawStroke.js";

/** The polygon mask draw stroke options */
export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke, IOptionLoader<IPolygonMaskDrawStroke> {
  /** The polygon mask draw stroke color */
  color = new OptionsColor();
  /** The polygon mask draw stroke opacity */
  opacity = 1;
  /** The polygon mask draw stroke width */
  width = 0.5;

  /** The plugin manager */
  readonly #pluginManager;

  constructor(pluginManager: PluginManager) {
    this.#pluginManager = pluginManager;
  }

  load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
    if (isNull(data)) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (isString(this.color.value)) {
      this.opacity = stringToAlpha(this.#pluginManager, this.color.value) ?? this.opacity;
    }

    loadProperty(this, "opacity", data.opacity);
    loadProperty(this, "width", data.width);
  }
}
