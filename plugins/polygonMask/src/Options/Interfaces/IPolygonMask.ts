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
  data?: string | IPolygonMaskLocalSvg;
  draw: IPolygonMaskDraw;
  enable: boolean;
  inline: IPolygonMaskInline;
  move: IPolygonMaskMove;
  position?: ICoordinates;
  scale: number;
  type: PolygonMaskType;
  url?: string;
}
