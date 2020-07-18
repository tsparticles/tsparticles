import { EditorItem } from "./EditorItem";
import type { Container } from "tsparticles/dist/Core/Container";

export class EditorCheckboxInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly value: boolean,
        private readonly change: (value: boolean) => void
    ) {
        super(container);
        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.checked = this.value;

        input.addEventListener("change", () => {
            this.change((this.element as HTMLInputElement).checked);
        });
    }

    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "checkbox");

        return element;
    }
}
