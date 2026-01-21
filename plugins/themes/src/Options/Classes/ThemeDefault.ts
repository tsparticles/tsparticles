import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IThemeDefault } from "../Interfaces/IThemeDefault.js";
import { ThemeMode } from "../../ThemeMode.js";

export class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
    auto;
    mode: ThemeMode | keyof typeof ThemeMode;
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

        if (data.auto !== undefined) {
            this.auto = data.auto;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
