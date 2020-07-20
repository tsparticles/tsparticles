import type { EditorContainer } from "../../../Editors/EditorContainer";
import type { IParticles } from "tsparticles/dist/Options/Interfaces/Particles/IParticles";
import type { Container } from "tsparticles/dist/Core/Container";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";
import { OpacityOptionsEditor } from "./Opacity/OpacityOptionsEditor";
import { ColorOptionsEditor } from "./Color/ColorOptionsEditor";

export class ParticlesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticles) {
        this.container = parent.addContainer("particles", "Particles", true);
        this.particles = this.container.particles;

        this.addColor();
        this.addLinks();
        this.addOpacity();
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.container, this.options.color);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.container, this.options.links);
    }

    private addOpacity(): void {
        const options = new OpacityOptionsEditor(this.container, this.options.opacity);
    }
}
