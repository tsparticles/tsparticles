import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISoundsMelody } from "../Interfaces/ISoundsMelody.js";
import { SoundsNote } from "./SoundsNote.js";

export class SoundsMelody implements ISoundsMelody, IOptionLoader<ISoundsMelody> {
  loop = false;
  melodies: SoundsMelody[] = [];
  notes: SoundsNote[] = [];

  load(data?: RecursivePartial<ISoundsMelody>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "loop", data.loop);

    if (data.melodies !== undefined) {
      this.melodies = data.melodies.map(s => {
        const tmp = new SoundsMelody();

        tmp.load(s);

        return tmp;
      });
    }

    if (data.notes !== undefined) {
      this.notes = data.notes.map(s => {
        const tmp = new SoundsNote();

        tmp.load(s);

        return tmp;
      });
    }
  }
}
