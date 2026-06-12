import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IPolygonMaskMove } from "../Interfaces/IPolygonMaskMove.js";
import { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType.js";

/** The polygon mask move options */
export class PolygonMaskMove implements IPolygonMaskMove, IOptionLoader<IPolygonMaskMove> {
  /** The polygon mask move radius */
  radius = 10;
  /** The polygon mask move type */
  type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType = PolygonMaskMoveType.path;

  load(data?: RecursivePartial<IPolygonMaskMove>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "radius", data.radius);
    loadProperty(this, "type", data.type);
  }
}
