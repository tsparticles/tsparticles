import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { ICollisions } from "tsparticles/dist/Options/Interfaces/Particles/ICollisions";
import { EditorSelectInput } from "../../../../Editors/EditorSelectInput";
import { CollisionMode } from "tsparticles";

export class CollisionsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ICollisions) {
        this.container = parent.addContainer("collisions", "Collisions");
        this.particles = this.container.particles;

        this.addCollisions();
    }

    private addCollisions(): void {
        const options = this.options;
        const particles = this.particles;

        this.container.addProperty(
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

        const selectType = this.container.addProperty(
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
