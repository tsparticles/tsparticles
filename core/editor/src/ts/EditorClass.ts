import { EditorContainer } from "./editors/EditorContainer";
import { OptionsEditor } from "./sections/options";
import { Container } from "tsparticles/dist/Core/Container";

export class EditorClass {
    public readonly root: EditorContainer;

    constructor(private readonly container: Container) {
        this.root = new EditorContainer("root", document.body);

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.root);
    }

    private addButtons() {
        this.root.addButton("play");
        this.root.addButton("pause");
        this.root.addButton("refresh");
        this.root.addButton("start");
        this.root.addButton("stop");
    }
}
