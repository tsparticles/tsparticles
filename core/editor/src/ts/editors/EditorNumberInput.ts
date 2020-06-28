import { EditorItem } from "./EditorItem";

export class EditorNumberInput extends EditorItem {
    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "number");

        return element;
    }
}
