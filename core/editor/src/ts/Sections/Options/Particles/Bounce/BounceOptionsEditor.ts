import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import { CollisionMode } from "tsparticles";
import { EditorBase } from "../../../../EditorBase";
import type { IBounce } from "tsparticles/dist/Options/Interfaces/Particles/Bounce/IBounce";

export class BounceOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IBounce;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("bounce", "Bounce");
        this.options = this.group.data as IBounce;

        this.addFactors();
    }

    private addFactors() {
        this.addFactor("horizontal", "Horizontal");
        this.addFactor("vertical", "Vertical");
    }

    private addFactor(name: string, title: string) {
        const particles = this.particles;
        const group = this.group.addGroup(name, title);

        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: CollisionMode.absorb,
                },
                {
                    value: CollisionMode.bounce,
                },
                {
                    value: CollisionMode.destroy,
                },
            ]);
    }
}
