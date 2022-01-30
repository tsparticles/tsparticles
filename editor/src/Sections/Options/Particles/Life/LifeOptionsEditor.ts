import type { Container, ILife } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class LifeOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: ILife;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("life", "Life", true, options);
        this.options = this.group.data as ILife;

        this.options.count;

        this.addDelay();
        this.addDuration();
        this.addProperties();
    }

    private addDelay() {
        const particles = this.particles;
        const group = this.group.addGroup("delay", "Delay");
        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomGroup.addProperty("minimumValue", "MinimumValue", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addDuration() {
        const particles = this.particles;
        const group = this.group.addGroup("duration", "Duration");
        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomGroup.addProperty("minimumValue", "MinimumValue", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties() {
        const particles = this.particles;

        this.group.addProperty("count", "Count", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
