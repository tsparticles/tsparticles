import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";

export class EditorContainer extends EditorItem {
    public readonly children: EditorItem[];

    constructor(public readonly name: string, parent: HTMLElement) {
        super();

        this.children = [];

        this.element.id = `editor_${name}`;

        this.element.classList.add("editor", "container");

        parent.append(this.element);
    }

    public createElement(): HTMLElement {
        return document.createElement("div");
    }

    public addContainer(name: string): EditorContainer {
        return new EditorContainer(name, this.element);
    }

    public addProperty(name: string): void {}

    public addButton(name: string): void {
        const button = new EditorButton(name);

        this.element.append(button.element);
    }
}
