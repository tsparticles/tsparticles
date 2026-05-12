import type { ICoordinates } from "@tsparticles/engine";
import type { IPolygonMaskDraw } from "./IPolygonMaskDraw.js";
import type { IPolygonMaskInline } from "./IPolygonMaskInline.js";
import type { IPolygonMaskLocalSvg } from "./IPolygonMaskLocalSvg.js";
import type { IPolygonMaskMove } from "./IPolygonMaskMove.js";
import type { PolygonMaskType } from "../../Enums/PolygonMaskType.js";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 */
export interface IPolygonMask {
  /** The polygon mask SVG data */
  data?: string | IPolygonMaskLocalSvg;
  /** The polygon mask draw options */
  draw: IPolygonMaskDraw;
  /** Enables the polygon mask */
  enable: boolean;
  /** The polygon mask inline options */
  inline: IPolygonMaskInline;
  /** The polygon mask move options */
  move: IPolygonMaskMove;
  /** The polygon mask position */
  position?: ICoordinates;
  /** The polygon mask scale */
  scale: number;
  /** The polygon mask type */
  type: PolygonMaskType;
  /** The polygon mask SVG url */
  url?: string;
}
