import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import {
  PolygonMaskInlineArrangement,
  type PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement.js";
import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline.js";

/**
 */
export class PolygonMaskInline implements IPolygonMaskInline, IOptionLoader<IPolygonMaskInline> {
  arrangement:
    | PolygonMaskInlineArrangement
    | keyof typeof PolygonMaskInlineArrangement
    | PolygonMaskInlineArrangementAlt;

  constructor() {
    this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
  }

  load(data?: RecursivePartial<IPolygonMaskInline>): void {
    if (isNull(data)) {
      return;
    }

    if (data.arrangement !== undefined) {
      this.arrangement = data.arrangement;
    }
  }
}
