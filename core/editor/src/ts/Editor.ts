import { EditorContainer } from "./editors/EditorContainer";
import { OptionsEditor } from "./sections/options";
import { Container } from "tsparticles/dist/Core/Container";

export class Editor {
    public readonly particles: EditorContainer;

    constructor(public readonly container: Container) {
        this.particles = new EditorContainer(container, "root", "tsParticles", document.body);

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.particles);
    }

    private addButtons() {
        this.particles.addButton("play", "Play", () => {
            this.container.play();
        });
        this.particles.addButton("pause", "Pause", () => {
            this.container.pause();
        });
        this.particles.addButton("refresh", "Refresh", async () => {
            await this.container.refresh();
        });
        this.particles.addButton("start", "Start", async () => {
            await this.container.start();
        });
        this.particles.addButton("stop", "Stop", () => {
            this.container.stop();
        });
    }
}
