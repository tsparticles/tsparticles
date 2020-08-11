import { EditorGroup, EditorSelectInput } from "object-gui";
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
        const options = this.options;
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        const selectType = this.group.addProperty("mode", "Mode", options.mode, "select", async () => {
            await particles.refresh();
        }) as EditorSelectInput;

        selectType.addItem(CollisionMode.absorb);
        selectType.addItem(CollisionMode.bounce);
        selectType.addItem(CollisionMode.destroy);
    }
}
