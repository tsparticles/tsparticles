import { EditorItem } from "./EditorItem";
import type { Container } from "tsparticles/dist/Core/Container";

export class EditorStringInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private value: string,
        private readonly change: (value: string) => void
    ) {
        super(container);
        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = this.value;

        input.addEventListener("change", () => {
            this.value = (this.element as HTMLInputElement).value;

            this.change(this.value);
        });
    }

    protected createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }
}
