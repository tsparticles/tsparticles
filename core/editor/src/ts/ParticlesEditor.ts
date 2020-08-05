import type { Container } from "tsparticles/dist/Core/Container";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";
import { Editor } from "object-gui";

export class ParticlesEditor extends Editor {
    constructor(public readonly particles: Container) {
        super(particles.id, "tsParticles", particles);
    }

    protected customize() {
        super.customize();

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.root);
    }

    private addButtons() {
        this.root.addButton("play", "Play", () => {
            this.particles.play();
        });
        this.root.addButton("pause", "Pause", () => {
            this.particles.pause();
        });
        this.root.addButton("refresh", "Refresh", async () => {
            await this.particles.refresh();
        });
        this.root.addButton("start", "Start", async () => {
            await this.particles.start();
        });
        this.root.addButton("stop", "Stop", () => {
            this.particles.stop();
        });
        this.root.addButton("exportConfig", "Export", () => {
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
