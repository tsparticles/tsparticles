import type { IThemeDefault } from "../../Interfaces/Theme/IThemeDefault";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { ThemeMode } from "../../../Enums/Modes";
import type { RecursivePartial } from "../../../Types";

export class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
    mode: ThemeMode | keyof ThemeMode;
    value;

    constructor() {
        this.mode = ThemeMode.any;
        this.value = false;
    }

    load(data?: RecursivePartial<IThemeDefault>): void {
        if (data === undefined) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
