import type { RecursivePartial } from "../Types/RecursivePartial";
import type { IOptions } from "../Options/Interfaces/IOptions";

export class Presets {
    private static presets: { [preset: string]: RecursivePartial<IOptions> } = {};

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets[preset];
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!this.getPreset(presetKey)) {
            this.presets[presetKey] = options;
        }
    }
}
