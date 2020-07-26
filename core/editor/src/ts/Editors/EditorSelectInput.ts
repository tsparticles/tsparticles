import { EditorItem } from "./EditorItem";
import type { Container } from "tsparticles/dist/Core/Container";

export class EditorSelectInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly value: string,
        private readonly change: (value: string) => void
    ) {
        super(container);

        const select = this.element as HTMLSelectElement;

        select.id = `input_${this.name}`;
        select.value = this.value;

        select.addEventListener("change", () => {
            this.change((this.element as HTMLInputElement).value);
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("select");
    }

    public addItem(value: string, text?: string, group?: string): void {
        const select = this.element as HTMLSelectElement;
        const item = document.createElement("option");
        const groupElement = select.querySelector(`[label=${group}]`);

        item.value = value;
        item.text = text ?? value;

        (groupElement ?? select).append(item);
    }

    public addItemGroup(name: string): void {
        const select = this.element as HTMLSelectElement;
        const group = document.createElement("optgroup");

        group.label = name;

        select.append(group);
    }
}
