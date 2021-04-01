import type { Container } from "tsparticles";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";
import { Editor, EditorType } from "object-gui";
import { EditorInputBase } from "object-gui/dist/js/Editors/EditorInputBase";

export class ParticlesEditor extends Editor {
    constructor(public readonly particles: Container) {
        super(particles.id, "tsParticles", particles);
    }

    private _presets?: EditorInputBase;

    protected customize(): void {
        super.customize();

        this.addOptions();
        this.addButtons();

        this.addPresets();
    }

    public addPreset(text: string, file: string) {
        if (!this._presets) {
            return;
        }

        this._presets.addItem(file, text);
    }

    private addOptions(): void {
        const options = new OptionsEditor(this.data as Container);

        options.addToGroup(this);
    }

    private addButtons(): void {
        this.addButton("play", "Play");
        this.addButton("pause", "Pause");
        this.addButton("refresh", "Refresh");
        this.addButton("start", "Start");
        this.addButton("stop", "Stop");
        this.addButton("exportConfig", "Export", false).click(() => {
            const json = this.particles.exportConfiguration();
            const contentType = "application/json";
            const blob = new Blob([json], { type: contentType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.download = "particles.json";
            a.href = url;
            a.dataset.downloadUrl = [contentType, a.download, a.href].join(":");

            const e = document.createEvent("MouseEvents");

            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        });
    }

    private addPresets(): void {
        this._presets = this.addProperty("preset", "Preset", EditorType.select, "", false);

        this.addPreset("", "");

        this._presets.change(async (value) => {
            try {
                const res = await fetch(value as string);

                if (!res.ok) {
                    return;
                }

                await this.particles.reset();

                this.particles.options.load(await res.json());

                await this.particles.refresh();
            } catch {
                // ignore
            }
        });
    }
}
