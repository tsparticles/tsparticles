import type { Container, IParticlesOptions } from "tsparticles-engine";
import { BounceOptionsEditor } from "./Bounce/BounceOptionsEditor";
import { CollisionsOptionsEditor } from "./Collisions/CollisionsOptionsEditor";
import { ColorOptionsEditor } from "./Color/ColorOptionsEditor";
import { DestroyOptionsEditor } from "./Destroy/DestroyOptionsEditor";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import { LifeOptionsEditor } from "./Life/LifeOptionsEditor";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";
import { MoveOptionsEditor } from "./Move/MoveOptionsEditor";
import { NumberOptionsEditor } from "./Number/NumberOptionsEditor";
import { OpacityOptionsEditor } from "./Opacity/OpacityOptionsEditor";
import { RollOptionsEditor } from "./Roll/RollOptionsEditor";
import { RotateOptionsEditor } from "./Rotate/RotateOptionsEditor";
import { ShadowOptionsEditor } from "./Shadow/ShadowOptionsEditor";
import { ShapeOptionsEditor } from "./Shape/ShapeOptionsEditor";
import { SizeOptionsEditor } from "./Size/SizeOptionsEditor";
import { StrokeOptionsEditor } from "./Stroke/StrokeOptionsEditor";
import { TiltOptionsEditor } from "./Tilt/TiltOptionsEditor";
import { TwinkleOptionsEditor } from "./Twinkle/TwinkleOptionsEditor";
import { WobbleOptionsEditor } from "./Wobble/WobbleOptionsEditor";

export class ParticlesOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IParticlesOptions;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, customName?: string, parentData?: unknown): void {
        this.group = parent.addGroup(customName ?? "particles", "Particles", true, parentData);
        this.options = this.group.data as IParticlesOptions;

        this.addBounce();
        this.addCollisions();
        this.addColor();
        this.addDestroy();
        this.addLife();
        this.addLinks();
        this.addMove();
        this.addNumber();
        this.addOpacity();
        this.addRoll();
        this.addRotate();
        this.addShadow();
        this.addShape();
        this.addSize();
        this.addStroke();
        this.addTilt();
        this.addTwinkle();
        this.addWobble();
        this.addProperties();
    }

    private addBounce(): void {
        const options = new BounceOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addCollisions(): void {
        const options = new CollisionsOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addDestroy(): void {
        const options = new DestroyOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addLife(): void {
        const options = new LifeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addMove(): void {
        const options = new MoveOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addNumber(): void {
        const options = new NumberOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addOpacity(): void {
        const options = new OpacityOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addRoll(): void {
        const options = new RollOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addRotate(): void {
        const options = new RotateOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addShadow(): void {
        const options = new ShadowOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addShape(): void {
        const options = new ShapeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addSize(): void {
        const options = new SizeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addStroke(): void {
        const options = new StrokeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addTilt(): void {
        const options = new TiltOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addTwinkle(): void {
        const options = new TwinkleOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addWobble(): void {
        const options = new WobbleOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("reduceDuplicates", "Reduce Duplicates", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
