import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IPreload } from "../Interfaces/IPreload.js";

export class Preload implements IPreload, IOptionLoader<IPreload> {
  gif: boolean;
  height?: number;
  name?: string;
  replaceColor?: boolean;
  src: string;
  width?: number;

  constructor() {
    this.src = "";
    this.gif = false;
  }

  load(data?: RecursivePartial<IPreload>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "gif", data.gif);
    loadProperty(this, "height", data.height);
    loadProperty(this, "name", data.name);
    loadProperty(this, "replaceColor", data.replaceColor);
    loadProperty(this, "src", data.src);
    loadProperty(this, "width", data.width);
  }
}
