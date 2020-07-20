import type { EditorContainer } from "../../../Editors/EditorContainer";
import type { IParticles } from "tsparticles/dist/Options/Interfaces/Particles/IParticles";
import type { Container } from "tsparticles/dist/Core/Container";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";
import { OpacityOptionsEditor } from "./Opacity/OpacityOptionsEditor";
import { ColorOptionsEditor } from "./Color/ColorOptionsEditor";
import { NumberOptionsEditor } from "./Number/NumberOptionsEditor";
import { SizeOptionsEditor } from "./Size/SizeOptionsEditor";
import { RotateOptionsEditor } from "./Rotate/RotateOptionsEditor";

export class ParticlesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticles) {
        this.container = parent.addContainer("particles", "Particles", true);
        this.particles = this.container.particles;

        this.addColor();
        this.addLinks();
        this.addNumber();
        this.addOpacity();
        this.addRotate();
        this.addSize();
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.container, this.options.color);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.container, this.options.links);
    }

    private addNumber(): void {
        const options = new NumberOptionsEditor(this.container, this.options.number);
    }

    private addOpacity(): void {
        const options = new OpacityOptionsEditor(this.container, this.options.opacity);
    }

    private addRotate(): void {
        const options = new RotateOptionsEditor(this.container, this.options.rotate);
    }

    private addSize(): void {
        const options = new SizeOptionsEditor(this.container, this.options.size);
    }
}
