import { EditorItem } from "./EditorItem";

export class EditorButton extends EditorItem {
    constructor(private readonly name: string, private readonly label: string) {
        super();

        this.element.id = `button_${name}`;
        this.element.innerText = label;
    }

    createElement(): HTMLElement {
        return document.createElement("button");
    }
}
