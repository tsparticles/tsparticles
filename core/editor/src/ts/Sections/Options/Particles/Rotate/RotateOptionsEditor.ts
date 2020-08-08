import type { Container } from "tsparticles/dist/Core/Container";
import type { IRotate } from "tsparticles/dist/Options/Interfaces/Particles/Rotate/IRotate";
import { EditorSelectInput, EditorGroup } from "object-gui";

export class RotateOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IRotate;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("rotate", "Rotate");
        this.options = this.group.data as IRotate;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");
        const particles = this.particles;
        const options = this.options.animation;

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", options.sync, typeof options.sync, async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        const directionSelectInput = this.group.addProperty(
            "direction",
            "Direction",
            options.direction,
            "select",
            async () => {
                await particles.refresh();
            }
        ) as EditorSelectInput;

        directionSelectInput.addItem("clockwise");
        directionSelectInput.addItem("counter-clockwise");

        this.group.addProperty("path", "Path", options.path, typeof options.path, async () => {
            await particles.refresh();
        });

        this.group.addProperty("random", "Random", options.random, typeof options.random, async () => {
            await particles.refresh();
        });

        this.group.addProperty("value", "Value", options.value, typeof options.value, async () => {
            await particles.refresh();
        });
    }
}
