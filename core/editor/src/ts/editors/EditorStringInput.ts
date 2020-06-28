import { EditorItem } from "./EditorItem";

export class EditorStringInput extends EditorItem {
    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }
}
