import { Editor } from "./Editor";
import type { Container } from "tsparticles/dist/Core/Container";

export function createEditor(container: Container): Editor {
    return new Editor(container);
}
