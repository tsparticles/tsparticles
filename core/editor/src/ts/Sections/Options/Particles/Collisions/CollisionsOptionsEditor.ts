import { EditorGroup, EditorSelectInput, EditorType } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { ICollisions } from "tsparticles/dist/Options/Interfaces/Particles/ICollisions";
import { CollisionMode } from "tsparticles";
import { EditorBase } from "../../../../EditorBase";

export class CollisionsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: ICollisions;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("collisions", "Collisions");
        this.options = this.group.data as ICollisions;

        this.addProperties();
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
