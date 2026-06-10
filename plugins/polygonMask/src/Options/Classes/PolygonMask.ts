import {
  type ICoordinates,
  type IOptionLoader,
  type PluginManager,
  type RecursivePartial,
  deepExtend,
  isNull,
  isString,
  loadProperty,
} from "@tsparticles/engine";
import type { IPolygonMask } from "../Interfaces/IPolygonMask.js";
import { PolygonMaskDraw } from "./PolygonMaskDraw.js";
import { PolygonMaskInline } from "./PolygonMaskInline.js";
import { PolygonMaskLocalSvg } from "./PolygonMaskLocalSvg.js";
import { PolygonMaskMove } from "./PolygonMaskMove.js";
import { PolygonMaskType } from "../../Enums/PolygonMaskType.js";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 */
export class PolygonMask implements IPolygonMask, IOptionLoader<IPolygonMask> {
  /** The polygon mask SVG data */
  data?: string | PolygonMaskLocalSvg;
  /** The polygon mask draw options */
  draw;
  /** Enables the polygon mask */
  enable = false;
  /** The polygon mask inline options */
  inline = new PolygonMaskInline();
  /** The polygon mask move options */
  move = new PolygonMaskMove();
  /** The polygon mask position */
  position?: ICoordinates;
  /** The polygon mask scale */
  scale = 1;
  /** The polygon mask type */
  type = PolygonMaskType.none;
  /** The polygon mask SVG url */
  url?: string;

  constructor(pluginManager: PluginManager) {
    this.draw = new PolygonMaskDraw(pluginManager);
  }

  load(data?: RecursivePartial<IPolygonMask>): void {
    if (isNull(data)) {
      return;
    }

    this.draw.load(data.draw);
    this.inline.load(data.inline);
    this.move.load(data.move);

    loadProperty(this, "scale", data.scale);
    loadProperty(this, "type", data.type);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    } else {
      this.enable = this.type !== PolygonMaskType.none;
    }

    loadProperty(this, "url", data.url);

    if (data.data !== undefined) {
      if (isString(data.data)) {
        this.data = data.data;
      } else {
        this.data = new PolygonMaskLocalSvg();

        this.data.load(data.data);
      }
    }

    if (data.position !== undefined) {
      this.position = deepExtend({}, data.position) as ICoordinates;
    }
  }
}
