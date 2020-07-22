import { Editor } from "./Editor";
import type { Container } from "tsparticles/dist/Core/Container";

export function showEditor(container: Container): Editor {
    return new Editor(container);
}
