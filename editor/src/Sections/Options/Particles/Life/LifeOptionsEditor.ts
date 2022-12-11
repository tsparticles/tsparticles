import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class LifeOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: () => unknown): void {
        this.group = parent.addGroup("life", "Life", true, options);
        this.options = this.group.data;

        this.addDelay();
        this.addDuration();
        this.addProperties();
    }

    private addDelay(): void {
        const group = this.group.addGroup("delay", "Delay");
        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        randomGroup.addProperty("minimumValue", "MinimumValue", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addDuration(): void {
        const group = this.group.addGroup("duration", "Duration");
        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        randomGroup.addProperty("minimumValue", "MinimumValue", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("count", "Count", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
