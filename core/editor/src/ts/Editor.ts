import { EditorContainer } from "./editors/EditorContainer";
import { OptionsEditor } from "./sections/options";
import { Container } from "tsparticles/dist/Core/Container";

export class Editor {
    public readonly root: EditorContainer;

    constructor(private readonly container: Container) {
        this.root = new EditorContainer("root", "tsParticles", document.body);

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.root);
    }

    private addButtons() {
        this.root.addButton("play", "Play");
        this.root.addButton("pause", "Pause");
        this.root.addButton("refresh", "Refresh");
        this.root.addButton("start", "Start");
        this.root.addButton("stop", "Stop");
    }
}
