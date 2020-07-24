import { EditorContainer } from "./Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";

export class Editor {
    public readonly container: EditorContainer;

    constructor(public readonly particles: Container) {
        this.container = new EditorContainer(particles, `${particles.id}_editor`, "tsParticles", false, document.body);

        this.container.element.classList.add("editor-root");

        this.addOptions();
        this.addButtons();
    }

    public top(): Editor {
        this.container.element.classList.add("top");

        return this;
    }

    public bottom(): Editor {
        this.container.element.classList.add("bottom");

        return this;
    }

    public left(): Editor {
        this.container.element.classList.add("left");

        return this;
    }

    public right(): Editor {
        this.container.element.classList.add("right");

        return this;
    }

    public theme(theme: string) {
        this.container.element.classList.add(`editor-${theme}`);
    }

    private addOptions() {
        const options = new OptionsEditor(this.container);
    }

    private addButtons() {
        this.container.addButton("play", "Play", () => {
            this.particles.play();
        });
        this.container.addButton("pause", "Pause", () => {
            this.particles.pause();
        });
        this.container.addButton("refresh", "Refresh", async () => {
            await this.particles.refresh();
        });
        this.container.addButton("start", "Start", async () => {
            await this.particles.start();
        });
        this.container.addButton("stop", "Stop", () => {
            this.particles.stop();
        });
        this.container.addButton("exportConfig", "Export", () => {
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
