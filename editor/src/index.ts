import { ParticlesEditor } from "./ParticlesEditor";
import type { Container } from "tsparticles-engine";

export function showEditor(container: Container): ParticlesEditor {
    return new ParticlesEditor(container);
}
