import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";
import { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";

export class ModesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IModes) {
        this.container = parent.addContainer("modes", "Modes", true);
        this.particles = this.container.particles;

        this.addModes();
    }

    private addModes(): void {
        const particles = this.container.particles;
        const options = this.options;
    }
}
