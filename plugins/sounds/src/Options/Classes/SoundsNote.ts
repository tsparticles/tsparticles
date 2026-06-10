import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { ISoundsNote } from "../Interfaces/ISoundsNote.js";

export class SoundsNote implements ISoundsNote, IOptionLoader<ISoundsNote> {
  duration: number;
  value: SingleOrMultiple<string>;

  constructor() {
    this.duration = 500;
    this.value = [];
  }

  load(data?: RecursivePartial<ISoundsNote>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "duration", data.duration);
    loadProperty(this, "value", data.value);
  }
}
