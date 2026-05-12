import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import {
  PolygonMaskInlineArrangement,
  type PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement.js";
import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline.js";

/** The polygon mask inline options */
export class PolygonMaskInline implements IPolygonMaskInline, IOptionLoader<IPolygonMaskInline> {
  /** The polygon mask inline arrangement */
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
