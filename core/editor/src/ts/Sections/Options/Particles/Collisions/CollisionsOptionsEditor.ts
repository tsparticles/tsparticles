import { EditorGroup, EditorSelectInput } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { ICollisions } from "tsparticles/dist/Options/Interfaces/Particles/ICollisions";
import { CollisionMode } from "tsparticles";

export class CollisionsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: ICollisions;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
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
