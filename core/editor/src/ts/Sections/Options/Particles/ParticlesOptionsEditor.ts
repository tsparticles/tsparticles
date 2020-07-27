import type { EditorContainer } from "../../../Editors/EditorContainer";
import type { IParticles } from "tsparticles/dist/Options/Interfaces/Particles/IParticles";
import type { Container } from "tsparticles/dist/Core/Container";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";
import { OpacityOptionsEditor } from "./Opacity/OpacityOptionsEditor";
import { ColorOptionsEditor } from "./Color/ColorOptionsEditor";
import { NumberOptionsEditor } from "./Number/NumberOptionsEditor";
import { SizeOptionsEditor } from "./Size/SizeOptionsEditor";
import { RotateOptionsEditor } from "./Rotate/RotateOptionsEditor";
import { ShapeOptionsEditor } from "./Shape/ShapeOptionsEditor";
import { MoveOptionsEditor } from "./Move/MoveOptionsEditor";
import { CollisionsOptionsEditor } from "./Collisions/CollisionsOptionsEditor";
import { StrokeOptionsEditor } from "./Stroke/StrokeOptionsEditor";
import { ShadowOptionsEditor } from "./Shadow/ShadowOptionsEditor";
import { TwinkleOptionsEditor } from "./Twinkle/TwinkleOptionsEditor";

export class ParticlesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticles) {
        this.container = parent.addContainer("particles", "Particles");
        this.particles = this.container.particles;

        this.addCollisions();
        this.addColor();
        this.addLinks();
        this.addMove();
        this.addNumber();
        this.addOpacity();
        this.addRotate();
        this.addShadow();
        this.addShape();
        this.addSize();
        this.addStroke();
        this.addTwinkle();
    }

    private addCollisions(): void {
        const options = new CollisionsOptionsEditor(this.container, this.options.collisions);
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.container, this.options.color);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.container, this.options.links);
    }

    private addMove(): void {
        const options = new MoveOptionsEditor(this.container, this.options.move);
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

    private addShadow(): void {
        const options = new ShadowOptionsEditor(this.container, this.options.shadow);
    }

    private addShape(): void {
        const options = new ShapeOptionsEditor(this.container, this.options.shape);
    }

    private addSize(): void {
        const options = new SizeOptionsEditor(this.container, this.options.size);
    }

    private addStroke(): void {
        const options = new StrokeOptionsEditor(this.container, this.options.stroke);
    }

    private addTwinkle(): void {
        const options = new TwinkleOptionsEditor(this.container, this.options.twinkle);
    }
}
