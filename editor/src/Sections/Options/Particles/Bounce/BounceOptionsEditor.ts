import type { Container, IParticlesBounce } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class BounceOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IParticlesBounce;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("bounce", "Bounce");
        this.options = this.group.data as () => IParticlesBounce;

        this.addFactors();
    }

    private addFactor(name: string, title: string): void {
        const group = this.group.addGroup(name, title),
            randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addFactors(): void {
        this.addFactor("horizontal", "Horizontal");
        this.addFactor("vertical", "Vertical");
    }
}
