import { EditorItem } from "./EditorItem";
import { Container } from "tsparticles/dist/Core/Container";

export class EditorButton extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        click: () => void
    ) {
        super(container);

        this.element.id = `button_${name}`;
        this.element.innerText = label;
        this.element.addEventListener("click", () => click());
    }

    createElement(): HTMLElement {
        return document.createElement("button");
    }
}
