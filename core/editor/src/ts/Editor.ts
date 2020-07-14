import { EditorContainer } from "./editors/EditorContainer";
import { OptionsEditor } from "./sections/options";
import { Container } from "tsparticles/dist/Core/Container";

export class Editor {
    public readonly root: EditorContainer;

    constructor(public readonly container: Container) {
        this.root = new EditorContainer(container, "root", "tsParticles", document.body);

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.root);
    }

    private addButtons() {
        this.root.addButton("play", "Play", () => {
            this.container.play();
        });
        this.root.addButton("pause", "Pause", () => {
            this.container.pause();
        });
        this.root.addButton("refresh", "Refresh", async () => {
            await this.container.refresh();
        });
        this.root.addButton("start", "Start", async () => {
            await this.container.start();
        });
        this.root.addButton("stop", "Stop", () => {
            this.container.stop();
        });
    }
}
