import type { IOptionLoader, IThemeDefault } from "../../Interfaces";
import type { RecursivePartial } from "../../../Types";
import { ThemeMode } from "../../../Enums";

export class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
    auto;
    mode: ThemeMode | keyof ThemeMode;
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
