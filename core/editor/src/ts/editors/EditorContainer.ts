import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";
import { EditorStringInput } from "./EditorStringInput";
import { EditorNumberInput } from "./EditorNumberInput";
import { Container } from "tsparticles/dist/Core/Container";

export class EditorContainer extends EditorItem {
    public readonly children: EditorItem[];

    constructor(
        container: Container,
        public readonly name: string,
        private readonly title: string,
        parent: HTMLElement
    ) {
        super(container);

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
        return new EditorContainer(this.container, name, title, this.element);
    }

    public addProperty(
        name: string,
        label: string,
        type: string,
        change: (value: number | string | boolean) => void
    ): void {
        let item: EditorItem;

        switch (type) {
            case "number":
                item = new EditorNumberInput(this.container, name, label, change);
                break;
            // case "boolean":
            //    break;
            // case "color":
            //    break;
            // case "range":
            //    break;
            default:
                item = new EditorStringInput(this.container, name, label, change);
        }

        this.element.append(item.element);
    }

    public addButton(name: string, label: string, click: () => void): void {
        const button = new EditorButton(this.container, name, label, click);

        this.element.append(button.element);
    }
}
