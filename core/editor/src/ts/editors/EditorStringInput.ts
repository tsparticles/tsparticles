import { EditorItem } from "./EditorItem";
import type { Container } from "tsparticles/dist/Core/Container";

export class EditorStringInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly change: (value: string) => void
    ) {
        super(container);

        this.element.id = `input_${this.name}`;
        this.element.addEventListener("change", () => this.change((this.element as HTMLInputElement).value));
    }

    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }
}
