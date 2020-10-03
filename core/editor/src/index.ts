import { ParticlesEditor } from "./ParticlesEditor";
import type { Container } from "tsparticles";

export function showEditor(container: Container): ParticlesEditor {
    return new ParticlesEditor(container);
}
