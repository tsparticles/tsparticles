import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";
import { EditorStringInput } from "./EditorStringInput";
import { EditorNumberInput } from "./EditorNumberInput";
import { Container } from "tsparticles/dist/Core/Container";
import { EditorCheckboxInput } from "./EditorCheckboxInput";
import { SingleOrMultiple } from "tsparticles";
import { EditorSelectInput } from "./EditorSelectInput";

export class EditorContainer extends EditorItem {
    public readonly children: EditorItem[];
    private readonly childrenContainer: HTMLElement;
    private readonly collapseButton: HTMLButtonElement;

    constructor(
        container: Container,
        public readonly name: string,
        private readonly title: string,
        private collapsed: boolean,
        parent: HTMLElement
    ) {
        super(container);

        this.children = [];

        this.element.id = `editor_${name}`;

        this.element.classList.add("editor", "container");

        const b = document.createElement("b");

        b.textContent = title;

        this.element.append(b);

        this.collapseButton = document.createElement("button");

        this.collapseButton.type = "button";

        this.collapseButton.addEventListener("click", () => {
            this.toggleCollapse();
        });

        this.element.append(this.collapseButton);

        this.childrenContainer = document.createElement("div");

        this.element.append(this.childrenContainer);

        parent.append(this.element);

        this.setCollapse();
    }

    public createElement(): HTMLElement {
        return document.createElement("div");
    }

    public addContainer(name: string, title: string, collapsed: boolean): EditorContainer {
        return new EditorContainer(this.particles, name, title, collapsed, this.childrenContainer);
    }

    public addProperty(
        name: string,
        label: string,
        value: SingleOrMultiple<number | string | boolean | undefined | null>,
        type: string,
        change: (value: number | string | boolean) => void
    ): EditorItem {
        const divContainer = document.createElement("div");
        const htmlLabel = document.createElement("label");

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
            case "select":
                item = new EditorSelectInput(this.particles, name, label, value as string, change);
                break;
            default:
                item = new EditorStringInput(this.particles, name, label, value as string, change);
        }

        divContainer.append(item.element);

        this.childrenContainer.append(divContainer);

        return item;
    }

    public addButton(name: string, label: string, click: () => void): void {
        const button = new EditorButton(this.particles, name, label, click);

        this.childrenContainer.append(button.element);
    }

    private setCollapse(): void {
        if (this.collapsed) {
            this.childrenContainer.style.display = "none";
        } else {
            this.childrenContainer.style.display = "block";
        }

        if (this.collapsed) {
            this.collapseButton.textContent = "Expand";
        } else {
            this.collapseButton.textContent = "Collapse";
        }
    }

    public toggleCollapse(): void {
        this.collapsed = !this.collapsed;

        this.setCollapse();
    }
}
