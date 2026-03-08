import { Fill, type IOptionLoader, type RecursivePartial, Stroke, isNull } from "@tsparticles/engine";
import type { IEmitterSpawn } from "../Interfaces/IEmitterSpawn.js";

export class EmitterSpawn implements IEmitterSpawn, IOptionLoader<IEmitterSpawn> {
  fill?: Fill;

  stroke?: Stroke;

  load(data?: RecursivePartial<IEmitterSpawn>): void {
    if (isNull(data)) {
      return;
    }

    if (data.fill) {
      this.fill ??= new Fill();

      this.fill.load(data.fill);
    }

    if (data.stroke) {
      this.stroke ??= new Stroke();

      this.stroke.load(data.stroke);
    }
  }
}
