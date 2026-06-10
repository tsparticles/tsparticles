import { type IOptionLoader, type RecursivePartial, isNull, isObject, loadProperty } from "@tsparticles/engine";
import type { ISoundsAudio } from "../Interfaces/ISoundsAudio.js";

export class SoundsAudio implements ISoundsAudio, IOptionLoader<ISoundsAudio> {
  loop: boolean;
  source: string;

  constructor() {
    this.loop = false;
    this.source = "";
  }

  load(data?: RecursivePartial<ISoundsAudio | string>): void {
    if (isNull(data)) {
      return;
    }

    if (isObject(data)) {
      loadProperty(this, "loop", data.loop);

      if (data.source !== undefined) {
        this.source = data.source;
      }
    } else {
      this.source = data;
    }
  }
}
