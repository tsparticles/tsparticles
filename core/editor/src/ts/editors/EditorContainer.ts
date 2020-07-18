import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";
import { EditorStringInput } from "./EditorStringInput";
import { EditorNumberInput } from "./EditorNumberInput";
import { Container } from "tsparticles/dist/Core/Container";
import { EditorCheckboxInput } from "./EditorCheckboxInput";

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

        const b = document.createElement("b");

        b.textContent = title;

        this.element.append(b);

        parent.append(this.element);
    }

    public createElement(): HTMLElement {
        return document.createElement("div");
    }

    public addContainer(name: string, title: string): EditorContainer {
        return new EditorContainer(this.particles, name, title, this.element);
    }

    public addProperty(
        name: string,
        label: string,
        value: number | string | boolean,
        type: string,
        change: (value: number | string | boolean) => void
    ): void {
        const divContainer = document.createElement("div");
        const htmlLabel = document.createElement("label");

        console.log({ name, value });

        htmlLabel.textContent = label;

        divContainer.append(htmlLabel);

        let item: EditorItem;

        switch (type) {
            case "number":
                item = new EditorNumberInput(this.particles, name, label, value as number, change);
                break;
            case "boolean":
                item = new EditorCheckboxInput(this.particles, name, label, value as boolean, change);
                break;
            // case "color":
            //    break;
            // case "range":
            //    break;
            default:
                item = new EditorStringInput(this.particles, name, label, value as string, change);
        }

        divContainer.append(item.element);

        this.element.append(divContainer);
    }

    public addButton(name: string, label: string, click: () => void): void {
        const button = new EditorButton(this.particles, name, label, click);

        this.element.append(button.element);
    }
}
