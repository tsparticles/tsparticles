import { EditorItem } from "./EditorItem";

export class EditorButton extends EditorItem {
    constructor(private readonly name: string) {
        super();

        this.element.id = `button_${name}`;
    }

    createElement(): HTMLElement {
        return document.createElement("button");
    }
}
