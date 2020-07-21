import { Container } from "tsparticles/dist/Core/Container";
import { EditorItem } from "./EditorItem";

export class EditorColorInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly value: string,
        private readonly change: (value: string) => void
    ) {
        super(container);
        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = this.value;

        this.element.style.backgroundColor = input.value;

        input.addEventListener("change", () => {
            const currentValue = (this.element as HTMLInputElement).value;

            this.change(currentValue);

            this.element.style.backgroundColor = currentValue;
        });
    }

    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }
}
