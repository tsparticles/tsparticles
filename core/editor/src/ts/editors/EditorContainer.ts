import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";

export class EditorContainer extends EditorItem {
    public readonly children: EditorItem[];

    constructor(public readonly name: string, private readonly title: string, parent: HTMLElement) {
        super();

        this.children = [];

        this.element.id = `editor_${name}`;

        this.element.classList.add("editor", "container");

        const h6 = document.createElement("h6");

        h6.innerText = title;

        this.element.append(h6);

        parent.append(this.element);
    }

    public createElement(): HTMLElement {
        return document.createElement("div");
    }

    public addContainer(name: string, title: string): EditorContainer {
        return new EditorContainer(name, title, this.element);
    }

    public addProperty(name: string, label: string): void {}

    public addButton(name: string, label: string): void {
        const button = new EditorButton(name, label);

        this.element.append(button.element);
    }
}
