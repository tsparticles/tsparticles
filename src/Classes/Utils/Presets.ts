import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Interfaces/Options/IOptions";

export class Presets {
    private static presets: { [preset: string]: RecursivePartial<IOptions> } = {};

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets[preset];
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!this.presets[presetKey]) {
            this.presets[presetKey] = options;
        }
    }
}
