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
        this.container.addButton("exportConfig", "Export configuration", () => {
            this.particles.exportConfiguration();
        });
    }
}
