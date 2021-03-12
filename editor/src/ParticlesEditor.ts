import type { Container } from "tsparticles-engine";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";
import { Editor } from "object-gui";

export class ParticlesEditor extends Editor {
    constructor(public readonly particles: Container) {
        super(particles.id, "tsParticles", particles);
    }

    protected customize(): void {
        super.customize();

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.data as Container);

        options.addToGroup(this);
    }

    private addButtons() {
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
}
