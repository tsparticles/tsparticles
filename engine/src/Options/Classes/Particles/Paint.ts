import { Fill } from "./Fill.js";
import type { IFill } from "../../Interfaces/Particles/IFill.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Stroke } from "./Stroke.js";
import { isNull } from "../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles/Paint.md]]
 */
export class Paint implements IPaint, IOptionLoader<IPaint> {
  fill?: Fill;
  stroke?: Stroke;

  load(data?: RecursivePartial<IPaint>): void {
    if (isNull(data)) {
      return;
    }

    if (data.fill !== undefined) {
      this.fill ??= new Fill();
      this.fill.load(data.fill as RecursivePartial<IFill>);
    }

    if (data.stroke !== undefined) {
      this.stroke ??= new Stroke();
      this.stroke.load(data.stroke as RecursivePartial<IStroke>);
    }
  }
}
