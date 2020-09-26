import { ParticlesEditor } from "./ParticlesEditor";
import type { Container } from "tsparticles/dist/Core/Container";

export function showEditor(container: Container): ParticlesEditor {
    return new ParticlesEditor(container);
}
