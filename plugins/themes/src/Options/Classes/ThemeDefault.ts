import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IThemeDefault } from "../Interfaces/IThemeDefault.js";
import { ThemeMode } from "../../ThemeMode.js";

export class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
  /** If set to true, this theme will be switched when the mode matches the user OS theme */
  auto;
  /** Default theme mode */
  mode: ThemeMode | keyof typeof ThemeMode;
  /** Sets or unsets the default flag to this theme and mode */
  value;

  constructor() {
    this.auto = false;
    this.mode = ThemeMode.any;
    this.value = false;
  }

  load(data?: RecursivePartial<IThemeDefault>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "auto", data.auto);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "value", data.value);
  }
}
