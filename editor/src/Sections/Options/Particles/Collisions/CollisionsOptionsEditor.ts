import type { Container, ICollisions } from "tsparticles-engine";
import { CollisionMode } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class CollisionsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => ICollisions;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("collisions", "Collisions");
        this.options = this.group.data as () => ICollisions;

        this.addBounce();
        this.addOverlap();
        this.addProperties();
    }

    private addBounce(): void {
        const group = this.group.addGroup("bounce", "Bounce");

        this.addBounceFactor(group, "horizontal", "Horizontal");
        this.addBounceFactor(group, "vertical", "Vertical");
    }

    private addBounceFactor(parentGroup: EditorGroup, name: string, title: string): void {
        const group = parentGroup.addGroup(name, title);
        const randomGroup = group.addGroup("random", "Random");

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

    private addOverlap(): void {
        const group = this.group.addGroup("overlap", "Overlap");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("retries", "Retries", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
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
