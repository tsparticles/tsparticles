import type { EditorGroup } from "object-gui";
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
    public readonly group: EditorGroup;
    private readonly options: IParticles;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("particles", "Particles");
        this.options = this.group.data as IParticles;

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
        const options = new CollisionsOptionsEditor(this.group, this.particles);
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.group, this.particles);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.group, this.particles);
    }

    private addMove(): void {
        const options = new MoveOptionsEditor(this.group, this.particles);
    }

    private addNumber(): void {
        const options = new NumberOptionsEditor(this.group, this.particles);
    }

    private addOpacity(): void {
        const options = new OpacityOptionsEditor(this.group, this.particles);
    }

    private addRotate(): void {
        const options = new RotateOptionsEditor(this.group, this.particles);
    }

    private addShadow(): void {
        const options = new ShadowOptionsEditor(this.group, this.particles);
    }

    private addShape(): void {
        const options = new ShapeOptionsEditor(this.group, this.particles);
    }

    private addSize(): void {
        const options = new SizeOptionsEditor(this.group, this.particles);
    }

    private addStroke(): void {
        const options = new StrokeOptionsEditor(this.group, this.particles);
    }

    private addTwinkle(): void {
        const options = new TwinkleOptionsEditor(this.group, this.particles);
    }
}
