import { EditorItem } from "./EditorItem";
import type { Container } from "tsparticles/dist/Core/Container";

export class EditorNumberInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly value: number,
        private readonly change: (value: number) => void
    ) {
        super(container);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = value?.toString();
        input.addEventListener("change", () => {
            this.change(parseFloat((this.element as HTMLInputElement).value));
        });
    }

    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "number");

        return element;
    }
}
