import { EditorGroup, EditorSelectInput } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { ICollisions } from "tsparticles/dist/Options/Interfaces/Particles/ICollisions";
import { CollisionMode } from "tsparticles";

export class CollisionsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: ICollisions) {
        this.group = parent.addGroup("collisions", "Collisions");
        this.particles = this.group.data as Container;

        this.addCollisions();
    }

    private addCollisions(): void {
        const options = this.options;
        const particles = this.particles;

        this.group.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const selectType = this.group.addProperty(
            "mode",
            "Mode",
            options.mode,
            "select",
            async (value: string | number | boolean) => {
                if (
                    value === CollisionMode.absorb ||
                    value === CollisionMode.bounce ||
                    value === CollisionMode.destroy
                ) {
                    options.mode = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        selectType.addItem(CollisionMode.absorb);
        selectType.addItem(CollisionMode.bounce);
        selectType.addItem(CollisionMode.destroy);
    }
}
