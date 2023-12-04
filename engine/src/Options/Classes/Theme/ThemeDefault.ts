import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IThemeDefault } from "../../Interfaces/Theme/IThemeDefault.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { ThemeMode } from "../../../Enums/Modes/ThemeMode.js";

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
        if (!data) {
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
