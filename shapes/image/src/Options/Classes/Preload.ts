import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IPreload } from "../Interfaces/IPreload.js";

export class Preload implements IPreload, IOptionLoader<IPreload> {
  gif = false;
  height?: number;
  name?: string;
  replaceColor?: boolean;
  src = "";
  width?: number;

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
